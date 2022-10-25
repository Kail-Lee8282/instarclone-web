import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import Post from "../components/profile/Post";
import { PhotoFragmentFragment } from "../gql/graphql";

interface IPostContext {
    photos: [PhotoFragmentFragment];
}

const Container = styled.div`
    
`

const PostWarpper = styled.div`
    display:grid;
    grid-template-columns : repeat(3,1fr);
    align-content:center;
    gap:3px;
`;

function Posts() {
    const { photos } = useOutletContext<IPostContext>();
    return(
    <Container>
        <PostWarpper>
            {photos?.map((photo, index)=>
            <Post key={index} file={photo.file} likes={photo.likes} comments={photo.commentCount}/>)}
        </PostWarpper>
    </Container>
    );
}

export default Posts;