import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const TOKEN = "token";
const DARK_MODE = "dark_mode";
export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));

// Login
export const loginUserIn = (token: string) => {
  // save token in localstorage
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};

// Logout
export const loginUserOut = () => {
  // delete token in localstorage
  localStorage.removeItem(TOKEN);
  isLoggedInVar(false);
};

export const darkModeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE)));

export const enableDarkMode = () => {
  localStorage.setItem(DARK_MODE, "enabled");
  darkModeVar(true);
};

export const disableDarkMode = () => {
  localStorage.removeItem(DARK_MODE);
  darkModeVar(false);
};

// 통신 할떄 마다다 token 전송
const httpLink = createHttpLink({
  uri:
    process.env.NODE_ENV === "production"
      ? "https://km-instagram-backend.herokuapp.com/graphql"
      : "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(TOKEN);
  return {
    headers: {
      ...headers,
      token,
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      // user cache 기준 키 변경
      User: {
        keyFields: (obj) => `User:${obj.userName}`,
      },
    },
  }),
});
