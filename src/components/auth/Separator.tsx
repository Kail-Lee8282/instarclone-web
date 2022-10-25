import styled from "styled-components";


const Wapper = styled.div`
width: 100%;
display: flex;
justify-content: center;
align-items: center;
margin:10px 0px;
div{
    width: 100%;
    height:1px;
    background-color:${props => props.theme.borderColor};
}
span{
    font-weight:600;
    color:rgb(142,142,142);
    margin: 0px 10px;
}
`;

function Separator() {
    return <Wapper>
        <div />
        <span>OR</span>
        <div />
    </Wapper>
}

export default Separator;