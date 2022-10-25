import { useState } from "react";
import { ApolloCache, gql, MutationHookOptions, useApolloClient, useMutation, useQuery } from "@apollo/client";
import { faIdBadge } from "@fortawesome/free-regular-svg-icons";
import { faTableCells, faUserCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../components/Avatar";
import Layout from "../components/Layout";
import { BaseButton, FatText } from "../components/Shared";
import { PHOTO_FRAGMENT } from "../fragments";
import { FollowUserMutation, SeeProfileQuery, UnfollowUserMutation } from "../gql/graphql";
import { userRoutes } from "../routes";
import PageTitle from "../components/PageTitle";
import useUser, { ME_QUERY } from "../hooks/useUser";

const ProfileInfoContainer = styled.div`
    display: flex;
    margin-bottom: 50px;
`;

const ProfileAvatar = styled.div`
    flex-grow: 1;
    display: flex;
    justify-content:center;
    align-items:center;
`;

const ProfileInfo = styled.div`
    flex-grow: 2;
    display: flex;
    flex-direction:column;
`;

const Wrapper = styled.div`
    display: flex;
    margin: 10px 0px;
    font-size: 16px;
`;

const UserWrappere = styled(Wrapper)`
    display:flex;
    align-items: center;
`;

const FollwerWrapper = styled(Wrapper)`
    margin:20px 0px;
    ul{
        list-style-type: none;
        li{
            float: left;
            margin-right: 40px;
        }
    }
`;

const DescriptionWrapper = styled(Wrapper)`
    flex-direction:column;
    gap:5px;
`;

const UserName = styled.span`
    font-size: 28px;
`
const TabHeader = styled.div`
    display: flex;
    border-top: 1px solid ${props => props.theme.borderColor};
    justify-content:center;
    gap: 50px;
`;

interface ITab {
    isSelected?: boolean;
}

const Tab = styled.div<ITab>`
    padding:20px 10px;
    cursor:pointer;
    border-top:1px solid ${props => props.isSelected ? props.theme.fontColor : "transparent"};
    font-size: 12px;
    letter-spacing: 1px;
    font-weight : ${props => props.isSelected ? "600" : "400"};
`;

// 스타일 tag 변경
const EditButton = styled(BaseButton).attrs({
    as:"button"
})`
  margin-left: 20px;
`;

const FollowButton = styled(EditButton)`
    background-color: ${props => props.theme.privateColor};
    color:white;
`;

const FOLLOW_USER_MUTATION = gql`
    mutation followUser($userName: String!) {
        followUser(userName: $userName) {
            ok
            id
            error
        }
    }
`;

const UNFOLLOW_USER_MUTATION = gql`
    mutation unfollowUser($userName: String!) {
        unfollowUser(userName: $userName) {
            ok
            id
            error
        }
    }
`;

const SEE_PROFILE_QUERY = gql`
    query seeProfile($userName: String!) {
        seeProfile(userName: $userName) {
            
            firstName
            lastName
            userName
            bio
            avatar
            photos {
                ...PhotoFragment
            }
            totalFollowing
            totalFollowers
            totalPhotos
            isMe
            isFollowing
        }
    }
    
  ${PHOTO_FRAGMENT}
`

const TAGGED = "TAGGED";
const POSTS = "POSTS";

function Profile() {
    const { username } = useParams();
    const { pathname } = useLocation();
    const {data:userData}= useUser();
    const client = useApolloClient();

    const isTabSelected = pathname.replace("%20", " ") === `/users/${username}/tagged` ? TAGGED : POSTS;

    const [followUser] = useMutation<FollowUserMutation>(FOLLOW_USER_MUTATION,
        {
            variables: {
                userName: username
            },
            onCompleted(data) {
                const  ok= data?.followUser?.ok;
                if(!ok){
                    return;
                }
                const {cache} = client;
                // follower 대상 캐쉬 수정
                cache.modify({
                    id:`User:${username}`,
                    fields:{
                        isFollowing(prev){
                            return !prev;
                        },
                        totalFollowers(prev){
                            return prev+1;
                        }
                    }
                });

                const loggedUserName = userData?.me?.userName;
                cache.modify({
                    id:`User:${loggedUserName}`,
                    fields:{
                        totalFollowing(prev){
                            return prev+1;
                        }
                    }
                });
            },
            // refetchQueries:[
            //     {
            //         query:SEE_PROFILE_QUERY,
            //         variables:{userName: username}
            //     },
            //     // {
            //     //     query:ME_QUERY,
            //     // }
            //     // or
            //     // {
            //     //     query:SEE_PROFILE_QUERY,
            //     //     variables:{userName: userData?.me?.userName}
            //     // }
            // ]
        });
    const [unFollowUser] = useMutation<UnfollowUserMutation>(UNFOLLOW_USER_MUTATION,
        {
            variables: {
                userName: username
            },
            update(cache, result){
                const ok = result?.data?.unfollowUser?.ok;
                if(!ok){
                    return;
                }
        
                // follower 대상 캐쉬 수정
                cache.modify({
                    id:`User:${username}`,
                    fields:{
                        isFollowing(prev){
                            return !prev;
                        },
                        totalFollowers(prev){
                            return prev-1;
                        }
                    }
                });

                const loggedUserName = userData?.me?.userName;
                cache.modify({
                    id:`User:${loggedUserName}`,
                    fields:{
                        totalFollowing(prev){
                            return prev-1;
                        }
                    }
                });
            },
            // refetchQueries:[
            //     {
            //         query:SEE_PROFILE_QUERY,
            //         variables:{userName: username}
            //     },
            //     {
            //         query:ME_QUERY,
            //     }
            // ]
        });

    const { data, loading } = useQuery<SeeProfileQuery>(SEE_PROFILE_QUERY,
        {
            variables: {
                userName: username
            },
        });

        console.log(data);
    //const { totalFollowers, totalFollowing, firstName, lastName,bio,photos,totalPhotos,isMe,isFollowing } = data?.seeProfile!;
    const totalFollowers = data?.seeProfile?.totalFollowers;
    const totalFollowing = data?.seeProfile?.totalFollowing;
    const firstName = data?.seeProfile?.firstName;
    const lastName = data?.seeProfile?.lastName;
    const bio = data?.seeProfile?.bio;
    const photos = data?.seeProfile?.photos;
    const totalPhotos = data?.seeProfile?.totalPhotos;
    const isMe = data?.seeProfile?.isMe;
    const isFollowing = data?.seeProfile?.isFollowing;


    return (
        <Layout>
            <PageTitle title={loading ? "Loading..." : `${firstName} (@${username})`}></PageTitle>
            {loading ? "Loading..." : 
            <>
            <ProfileInfoContainer>
                <ProfileAvatar>
                    <Avatar url={data?.seeProfile?.avatar} size="xl" />
                </ProfileAvatar>
                <ProfileInfo>
                    <UserWrappere>
                        <UserName>{username}</UserName>
                        {
                            isMe ?
                                <EditButton>Edit Profile</EditButton>
                                : (isFollowing ?
                                    (<EditButton onClick={()=> unFollowUser()}>
                                        <FontAwesomeIcon icon={faUserCheck} />
                                    </EditButton>) :
                                    (<FollowButton onClick={()=>followUser()}>
                                        Follow
                                    </FollowButton>))
                        }

                    </UserWrappere>
                    <FollwerWrapper>
                        <ul>
                            <li>
                                <span><FatText>{totalPhotos}</FatText> posts</span>
                            </li>
                            <li>
                                <span><FatText>{totalFollowers}</FatText> followers</span>
                            </li>
                            <li>
                                <span><FatText>{totalFollowing}</FatText> following</span>
                            </li>
                        </ul>
                    </FollwerWrapper>
                    <DescriptionWrapper>
                        <FatText>{firstName} {lastName}</FatText>
                        {bio}
                    </DescriptionWrapper>

                </ProfileInfo>
            </ProfileInfoContainer>
            <TabHeader>
                <Link to={userRoutes.posts}>
                    <Tab isSelected={isTabSelected === POSTS}>
                        <FontAwesomeIcon icon={faTableCells}></FontAwesomeIcon> POSTS
                    </Tab>
                </Link>
                <Link to={userRoutes.tagged}>
                    <Tab isSelected={isTabSelected === TAGGED}>
                        <FontAwesomeIcon icon={faIdBadge}></FontAwesomeIcon> TAGGED
                    </Tab>
                </Link>
            </TabHeader>
            <div>
                <Outlet context={{ photos }} />
            </div>
            </>
            }
        </Layout>
        );
}

export default Profile;