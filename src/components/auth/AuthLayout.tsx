import styled from "styled-components";

interface IAuthLayout {
    children: React.ReactNode;
}

const Container = styled.div`
    display: flex;
    height:100vh;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
const Wapper = styled.div`
  width  : 100%;
  max-width: 350px;
  padding: 10px 0px;
`;


function AuthLayout({ children }: IAuthLayout) {
    return (
        <Container>
            <Wapper>
                {children}
            </Wapper>
           
        </Container>
    )
}

export default AuthLayout;