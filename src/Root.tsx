import { useReactiveVar } from "@apollo/client";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { isLoggedInVar } from "./apollo";
import Header from "./components/Header";
import Layout from "./components/Layout";

const Container = styled.div`
    padding:30px 20px;
    max-width: 935px;
    width: 100%;
    margin: 0 auto;
`

function Root(){
    const isLoggedIn = useReactiveVar(isLoggedInVar);
    return (
        <Layout>
            {isLoggedIn?<Header />:null}
            <Container>
                <Outlet context={{isLoggedIn}}/>          
            </Container>
        </Layout>
    );
}

export default Root;