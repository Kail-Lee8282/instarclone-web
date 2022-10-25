import { gql, useMutation } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { graphql } from "../../gql";
// import { Comment as GqlComment, User } from "../../gql/graphql";
import useUser from "../../hooks/useUser";
import { IComment, IUser } from "../Shared";
import Comment from "./Comment";


interface IComments {
    photoId: number;
    author: IUser;
    caption?: string | null;
    commentCount?: number;
    comments?: [IComment];
}

interface ICommentForm {
    payload: string;
}

const Container = styled.div`
margin:5px 0px;
`

const CommentCount = styled.div`
margin:5px 0px 15px 0px;
color:${props => props.theme.subFontColor};
`

const AddCommentWrapper = styled.div`
    border-top: 1px solid ${props => props.theme.borderColor};
    margin-top: 15px;
    form{
        width: 100%;
        display: flex;
        align-items: center;
        justify-items: center;
    }
`;

const CommentInput = styled.input`
    width: 100%;
    height:30px;
    margin-top: 5px;
    padding: 0px 10px;
`

const CREATE_COMMENT_MUTATION = graphql(`
mutation createComment($photoId: Int!, $payload: String!) {
  createComment(photoId: $photoId, payload: $payload) {
    ok
    error
    id
  }
}
`);


function Comments(props: IComments) {
    const { photoId } = props;

    // React Hook Form
    const { register, handleSubmit, setValue, getValues } = useForm<ICommentForm>();
    const onValid: SubmitHandler<ICommentForm> = (data) => {
        if (loading) {
            return;
        }

        createComment({
            variables: {
                photoId,
                payload: data.payload
            }
        });

    }

    // Query
    const {data:userData} = useUser();
    const [createComment, { loading }] = useMutation(CREATE_COMMENT_MUTATION, {
        update: (cache, result) => {
            const { ok, id } = result.data!.createComment;

            const {payload} = getValues();
            setValue("payload", "");
            if (ok && userData?.me) {
                
                const newComment = {
                    ___typename:"Comment",
                    id: id!,
                    isMine: true,
                    payload,
                    createAt: Date.now().toString(),
                    user:{
                        ...userData?.me
                    }
                };

                const newCacheCommentRef = cache.writeFragment({
                    id:`Comment:${id}`,
                    data:newComment,
                    fragment: gql`
                        fragment createComment on Comment {
                            id
                            payload
                            isMine
                            createAt
                            user{
                                userName
                                avatar
                            }
                        }
                    `,
                });

                cache.modify({
                    id:`Photo:${photoId}`,
                    fields:{
                        comments(prev){
                            return [...prev, newCacheCommentRef];
                        },
                        commentCount(prev){
                            return prev+1;
                        }
                    }
                })
            }
        }
    });

    return (
        <Container>
            <Comment author={props.author} payload={props.caption!} />
            <CommentCount>{props.commentCount} comment</CommentCount>
            {props.comments?.map(comment => (
                <Comment key={comment.id} 
                id={comment.id}
                photoId={photoId}
                author={comment.user} 
                payload={comment.payload!} 
                isMine={comment.isMine}/>
            ))}
            <AddCommentWrapper>
                <form onSubmit={handleSubmit(onValid)}>
                    <CommentInput type="text" placeholder="Add a comment..."
                        {...register("payload", {
                            required: true
                        })} />
                </form>
            </AddCommentWrapper>
        </Container>
    )
}


export default Comments;