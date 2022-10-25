import styled from "styled-components";
import { BaseBox } from "../Shared";

interface IFormBox {
    children?: React.ReactNode;
}

const Conatiner = styled(BaseBox)`
display  : flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin-bottom:10px;
padding:10px 40px;

form{
  display  : flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
  width: 100%;
}
`;


function FormBox(props: IFormBox) {
    return <Conatiner>
        {props.children}
    </Conatiner>
}

export default FormBox;