import styled from "styled-components";


const Button = styled.button`
width: 100%;
padding: 5px 9px;
background-color: ${props => props.theme.privateColor};
border: 1px solid rgba(0,0,0,0);
border-radius:4px;
color: white;
font-weight: 600;
font-size:14px;
cursor: pointer;
opacity: ${props=>props.disabled ? "0.5":"1"};
:disabled{
    cursor:default;
}
`;


export default Button;