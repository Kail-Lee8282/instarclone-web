import { useReactiveVar } from "@apollo/client";
import { faMoon } from "@fortawesome/free-regular-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { darkModeVar, disableDarkMode, enableDarkMode } from "../apollo";

const ModeBtn = styled.footer`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items:center;
    height: 50px;
    width: 50px;
    bottom:20px;
    right:20px;
    background-color: ${props=>props.theme.reversBgColor};
    border-radius: 25px;
    box-shadow: 0px 0px 10px 1px ;
    cursor: pointer;
    svg{
        color:${props=>props.theme.bgColor}
    }
`;

function DarkModeBtn() {
    const darkMode = useReactiveVar(darkModeVar);
    return (
        <ModeBtn onClick={darkMode ? disableDarkMode : enableDarkMode}>
            <FontAwesomeIcon icon={darkMode ? faSun : faMoon} size="xl" />
        </ModeBtn>
    )
}

export default DarkModeBtn;