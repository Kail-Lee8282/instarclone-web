import styled from "styled-components";

interface IInput {
    hasError?: boolean;
}

const Input = styled.input<IInput>`
width: 100%;
padding:9px 0px 7px 8px;
border:1px solid ${props => props.hasError ? "tomato" : props.theme.borderColor};
border-radius: 3px;
outline-color: rgb(168,168,168);
&::placeholder{
    color:rgb(168,168,168);
}
&:focus{
    border-color: ${props => props.hasError ? "tomato" : " rgb(142,142,142)"}
}
`;


export default Input;