import { useMutation } from "@apollo/client";
import { faBookmark, faComment, faHeart, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidFaHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { graphql } from "../../gql";
// import { Photo as gqlPhoto } from "../../gql/graphql";
// import { FEED_QUERY } from "../../screens/Home";
import Avatar from "../Avatar";
import { BaseBox, FatText, IComment, IUser } from "../Shared";
import Comments from "./Comments";



export interface IPhoto {
    id: number;
    user: IUser;
    file: string;
    isLiked: boolean;
    likes: number;
    commentCount?: number;
    caption?: string | null;
    comments?: [IComment];
}

const PhotoContainer = styled(BaseBox)`
    width: 100%;
    margin-bottom: 10px;
    border-radius: 8px;
    max-width: 470px;
    overflow:hidden;
`;

const PhotoHeader = styled.div`
    padding:8px 12px;
`;

const UserProfile = styled.div`
    display: flex;
    align-items: center;
    color:${props=>props.theme.fontColor};
`

const UserNmae = styled(FatText)`
    margin-left:10px;
`;

const PhotoBody = styled.div`
`;

const PhotoFile = styled.img`
    width:100%;
`;

const PhotoDatas = styled.div`
    padding: 10px 12px;
`;

const PhotoActions = styled.div`
    display: flex;
    justify-content:space-between;
`;

const IconWrapper = styled.div`
    display:flex;   
    gap:15px;
`;
const Icon = styled.div`
    cursor:pointer;
    svg{
        font-size: 20px;
    }
`;

const Likes = styled.div`
    margin: 10px 0px;
`;



const TOGGLE_LIKE_MUTATION = graphql(`
        mutation toggleLike($id: Int!) {
            toggleLike(id: $id) {
              ok
              error
            }
          }       
        `);

function Photo(photo: IPhoto) {
    const { id, file, isLiked, likes, caption, commentCount, comments, user: { avatar, userName } } = photo;


    const [toggleLike] = useMutation(TOGGLE_LIKE_MUTATION, {
        variables: {
            id
        },
        // refetchQueries : 실시간 처리 시 부적합 Feed 전체를 읽어옴, reading data from backend 
        // refetchQueries:[{query:FEED_QUERY}],
        update: (cache, result) => {
            const ok = result.data?.toggleLike?.ok;
            if (ok) {
                const fragmentId = `Photo:${id}`;
                // const fragment = gql`
                // fragment PhotoFragment on Photo{
                //     isLiked
                //     likes
                // }
                // `;

                // // read Cache data, not backend data
                // const result = cache.readFragment<gqlPhoto>({
                //     id: fragmentId,
                //     fragment,
                // });

                // if (result && "isLiked" in result && "likes" in result) {
                //     const { isLiked: cacheIsLiked, likes: cacheLikes } = result;
                //     //update cache data 
                //     cache.writeFragment({
                //         id: fragmentId,
                //         fragment,
                //         data: {
                //             isLiked: !cacheIsLiked,
                //             likes: cacheIsLiked ? cacheLikes - 1 : cacheLikes + 1
                //         }
                //     });
                // }

                //  using apollo version 3
                cache.modify({
                    id: fragmentId,
                    fields: {
                        isLiked(prev) {
                            return !prev;
                        },
                        likes(prev, { readField }) {
                            // reading isLiked value in cache
                            if (readField("isLiked")) {
                                return prev - 1;
                            } else {
                                return prev + 1;
                            }
                        }
                    }
                })

            }

        }
    });



    return (
        <PhotoContainer key={id.toString()}>
            <PhotoHeader>
                <Link to={`/users/${userName}`}>
                    <UserProfile>
                        <Avatar url={avatar} size="lg" />
                        <UserNmae>{userName}</UserNmae>
                    </UserProfile>
                </Link>

            </PhotoHeader>
            <PhotoBody>
                <PhotoFile src={file} />
            </PhotoBody>
            <PhotoDatas>
                <PhotoActions>
                    <IconWrapper>
                        <Icon onClick={() => { toggleLike() }}>
                            <FontAwesomeIcon
                                style={{ color: isLiked ? "rgb(237,73,68)" : "inherit" }}
                                icon={isLiked ? solidFaHeart : faHeart} />
                        </Icon>
                        <Icon>
                            <FontAwesomeIcon icon={faComment} />
                        </Icon>
                        <Icon>
                            <FontAwesomeIcon icon={faPaperPlane} />
                        </Icon>
                    </IconWrapper>
                    <IconWrapper>
                        <Icon>
                            <FontAwesomeIcon icon={faBookmark} />
                        </Icon>
                    </IconWrapper>
                </PhotoActions>
                <Likes>
                    <FatText>{`${likes} likes`}</FatText>
                </Likes>
                <Comments
                    photoId={id}
                    author={photo.user}
                    caption={caption}
                    commentCount={commentCount}
                    comments={comments} />

            </PhotoDatas>
        </PhotoContainer>)
}

export default Photo;