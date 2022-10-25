import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { client, darkModeVar } from "./apollo";
import DarkModeBtn from "./components/DarkModeBtn";
import router from "./Router";
import { darkTheme, GlobalStyles, lightTheme } from "./styles";


function App() {
  //Listen isLoggedInVar prop
  // const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);

  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <GlobalStyles />
          <DarkModeBtn/>
          <RouterProvider router={router}/>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;


// <BrowserRouter>
// <Routes>
//   <Route path={routes.home} element={
//     isLoggedIn ?
//       <Layout>
//         <Home />
//       </Layout> : <Login />
//   } />
//   <Route path={routes.signUp} element={!isLoggedIn ? <SignUp /> : null} />
//   <Route path={`/users/:username`} element={<Profile/>} />
//   {/* Not found */}
//   <Route path="*" element={<NotFound />} />
//   {/* Redirect */}
//   {/* <Route path="*" element={<Navigate to="/"/>}/>   */}
// </Routes>
// </BrowserRouter>