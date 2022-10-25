import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

interface IAvatar {
    url?: string|null;
    size?: "x1" | "lg" | "xl";
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const Container = styled.div<{ size?: string }>`
    width:  ${props => {
        if (props.size === "lg") {
            return "32px";
        } else if (props.size === "xl") {
            return "150px";
        } else {
            return "28px";
        }
    }};
    height: ${props => {
        if (props.size === "lg") {
            return "32px";
        } else if (props.size === "xl") {
            return "150px";
        } else {
            return "28px";
        }
    }};
    border-radius: 50%;
    border-color: #2e2e2e;
    overflow: hidden;
    svg{
        width:  ${props => {
        if (props.size === "lg") {
            return "32px";
        } else if (props.size === "xl") {
            return "150px";
        } else {
            return "28px";
        }
    }};
    height: ${props => {
        if (props.size === "lg") {
            return "32px";
        } else if (props.size === "xl") {
            return "150px";
        } else {
            return "28px";
        }
    }};
    }
`

const Img = styled.img`
    width: inherit;
    height: inherit;
`


function Avatar(props: IAvatar) {
    return (<Container size={props.size} onClick={props.onClick}>
        {props?.url ? <Img src={props.url} /> : <FontAwesomeIcon icon={faCircleUser} size="2x" />}
    </Container>)
}

export default Avatar;

