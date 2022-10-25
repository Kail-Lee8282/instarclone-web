import styled from "styled-components";

interface ILayout {
    children: React.ReactNode;
}

const Content = styled.main`
    /* margin: 0 auto; */
    /* margin-top: 30px; */
    /* padding: 0px 20px; */
    /* width: 100%; */
    /* max-width: 935px; */
`

function Layout(props: ILayout) {
    return <>
        {/* <Header /> */}
        <Content>
            {props.children}
        </Content>
    </>
}
export default Layout;