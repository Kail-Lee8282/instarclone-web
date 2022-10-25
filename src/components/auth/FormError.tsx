import styled from "styled-components";

const Container = styled.div`
    color:tomato;
    font-weight: 600;
    font-size: 12px;
`;

interface IFormError{
    message?:string,
}

function FormError(props:IFormError){
    return <Container>
        {props.message}
    </Container>
}


export default FormError;
