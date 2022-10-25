import { Link } from "react-router-dom";
import styled from "styled-components";
import { BaseBox } from "../Shared";

interface IBottomBox{
    cta:string;
    link:string;
    linkText:string;
}


const Container = styled(BaseBox)`
    padding: 25px;
    text-align: center;
    a{
        font-size:15px;
        color: ${props => props.theme.privateColor};
        text-decoration-color: ${props => props.theme.privateColor};;
        font-weight: 600;
    }
`;

function BottomBox(props:IBottomBox){
    return <Container>
        <span>{props.cta}</span>
        <Link to={props.link}>{props.linkText}</Link>
    </Container>
}

export default BottomBox;