import styled from "styled-components";

export interface IUser {
  avatar: string;
  userName: string;
}

export interface IComment {
  id: number;
  payload?: string;
  isMine: boolean;
  createAt: string;
  user: IUser;
}

export const BaseBox = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 1px;
`;

export const BaseButton = styled.input`
  cursor: pointer;
  padding: 5px 19px;
  border-radius: 4px;
  border: 1px solid transparent;
  color: ${(props) => props.theme.fontColor};
  font-weight: 600;
  letter-spacing: 1px;
  font-size: 14px;
  background-color: ${(props) => props.theme.bgColor};
  border: 1px solid ${(props) => props.theme.borderColor};
`;

export const FatText = styled.span`
  font-weight: 600;
`;

export const FatLink = styled(FatText)`
  color: ${(props) => props.theme.subFontColor};
  line-height: 20px;
`;

export interface IAuthState {
  message: string;
  userName: string;
}
