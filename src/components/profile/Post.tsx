import {useState} from "react";
import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

interface IPost {
    file?: string;
    likes: number;
    comments: number;
}

const Wrapper = styled.div`
    position: relative;
    aspect-ratio: auto 1/1;
    border:1px solid ${props => props.theme.borderColor};
    border-radius:3px;
    overflow: hidden;
`;

const ImgWrapper = styled.div`

`;

const PostImg = styled.img`
    position: absolute;
    width: 100%;
    height:100%;
    object-fit:cover;
`;

const HoverContainer = styled.div`
    position: absolute;
    display: flex;
    justify-content:center;
    align-items:center;
    background-color: rgba(0,0,0,0.5);
    width: 100%;
    height:100%;
    opacity: 0;
    color:white;
    font-size: 20px;
    gap:10px;
    cursor:pointer;
    :hover{
        opacity: 1;
    }

    ul{
        list-style-type: none;
        li{
            float: left;
            margin: 10px;
        }
    }
`

function Post(props: IPost) {

    const [isShown, setIsShown] = useState(false);

    const MosueEnver = () =>{
        setIsShown(true);
    }

    const MouseLeave = () =>{
        setIsShown(false);
    }

    return (
        <Wrapper onMouseEnter={MosueEnver} onMouseLeave={MouseLeave}>
            <ImgWrapper>
                <PostImg src={props.file} />
            </ImgWrapper>
            {isShown &&
            <HoverContainer>
                <ul>
                    <li>
                        <FontAwesomeIcon icon={faHeart} />
                        <span> {props.likes}</span>
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faComment} />
                        <span> {props.comments}</span>
                    </li>
                </ul>
            </HoverContainer>
            }
        </Wrapper>
    )
}

export default Post;