import React from "react";
import styled from "styled-components";
import { FatText, IUser } from "../Shared";
// import sanitizeHtml from "sanitize-html"
import { Link } from "react-router-dom";
import { graphql } from "../../gql";
import { useMutation } from "@apollo/client";


interface ICommentProps {
    id?: number;
    photoId?: number;
    author: IUser;
    payload: string;
    isMine?: boolean;
}

const Container = styled.div`
    display: flex;
    justify-content:space-between;
    margin:5px 0px;
`
const CommentCaption = styled.span`
    margin: 0px 5px;
    a{
        background-color: inherit;
        color:${props => props.theme.privateColor};
        cursor:pointer;
        &:hover{
            text-decoration-line: underline;
        }
    }
`;

const CommentAction = styled.div`
    cursor:pointer;
    span{
        color:${props => props.theme.subFontColor};
        
        letter-spacing:2px;
    }
    
`

const DELETE_COMMENT_MUTATION = graphql(
    `
    mutation deleteComment($deleteCommentId: Int!) {
        deleteComment(id: $deleteCommentId) {
          ok
          id
          error
        }
      }
    `
)

function Comment(props: ICommentProps) {

    const [deleteComment] = useMutation(DELETE_COMMENT_MUTATION, {
        variables: {
            deleteCommentId: props.id!,
        },
        update: (cache, result) => {
            const { ok } = result.data!.deleteComment!;

            if (ok) {
                // delete cache comment Id
                cache.evict({ id: `Comment:${props.id}` })
            }

            cache.modify({
                id: `Photo:${props.photoId!}`,
                fields: {
                    commentCount(prev) {
                        return prev - 1;
                    }
                }
            })
        }
    });


    const onDeleteComment = () => {
        deleteComment();
    };

    // allowed Tags의 값을 제외한 tag text 처리
    // const cleanedPayload = sanitizeHtml(props.payload.replace(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g, "<mark>$&</mark>"),{
    //     allowedTags:["mark"]
    // });
    return (
        <Container>
            <div>
                <Link to={`/users/${props.author.userName}`}>
                    <FatText>{props.author.userName}</FatText>
                </Link>
                {/* <CommentCaption>{props.payload.replace(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g, "<mark>$&<mark>")}</CommentCaption> */}
                {/* 텍스트를 inner Html 로 사용, 사용자가 text에 tag를 사용할때 위험함
            <CommentCaption dangerouslySetInnerHTML={{
                __html:cleanedPayload
            }}/> */}
                <CommentCaption>{props.payload.split(" ").map((word, index) =>
                    /#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g.test(word) ?
                        <><Link key={index} to={`/hashtags/${word}`}>{word}</Link>{" "}</>
                        : <React.Fragment key={index}>{word}{" "}</React.Fragment>)}</CommentCaption>
            </div>
            <CommentAction>
                {props.isMine ? <span onClick={onDeleteComment}>•••</span> : null}
            </CommentAction>
        </Container>
    );
}

export default Comment;