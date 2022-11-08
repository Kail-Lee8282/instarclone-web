import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import Photo, { IPhoto } from "../components/feed/Photo";
import PageTitle from "../components/PageTitle";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";
// import { graphql } from "../gql";

interface IHome {
}

export const FEED_QUERY = gql`
  query SeeFeed($offset: Int!) {
    seeFeed(offset: $offset) {
      ...PhotoFragment
      user {
        userName
        avatar
      }
      caption
      commentCount
      createAt
      isMine
      comments {
        ...CommentFragment
      }
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;


function Home(props: IHome) {
  const { data } = useQuery(FEED_QUERY,{
    variables:{
      offset:0,
    }
  });
  
  console.log("Home",data);
  return (
    <Container>
      <PageTitle></PageTitle>
      {data?.seeFeed?.map((photo:IPhoto) => {
        return (<Photo key={photo?.id}
          // id={photo?.id!}
          // file={photo?.file!}
          // isLiked={photo?.isLiked!}
          // likes={photo?.likes!}
          // caption={photo?.caption}
          // commentCount={photo?.commentCount}
          // comments={{}}
          // user={{ avatar: photo?.user.avatar!, userName: photo?.user.userName! }}
          {...photo as IPhoto}
        />)
      }

      )}
    </Container>)


}

export default Home;