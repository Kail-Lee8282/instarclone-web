import { createGlobalStyle, DefaultTheme } from "styled-components";
import { reset } from "styled-reset";
export const lightTheme: DefaultTheme = {
  fontColor: "#2c2c2c",
  subFontColor: "#8e8e8e",
  bgColor: "#fff",
  secondBgColor: "rgb(250,250,250)",
  privateColor: "rgb(0,149,246)",
  facebookColor: "#385185",
  borderColor: "rgb(219,219,219)",
  boxBgColor: "white",
  reversBgColor: "#1a1a1a",
};

export const darkTheme: DefaultTheme = {
  fontColor: "white",
  subFontColor: "#8e8e8e",
  bgColor: "#1a1a1a",
  secondBgColor: "#101010",
  privateColor: "rgb(0,149,246)",
  facebookColor: "rgb(10,109,246)",
  borderColor: "rgb(250,250,250)",
  boxBgColor: "#3e3e3e",
  reversBgColor: "rgb(250,250,250)",
};

export const GlobalStyles = createGlobalStyle`
${reset}


input{
  all:unset;
    box-sizing: border-box;
}

*{
    box-sizing: border-box;
    font-family: 'Open Sans', sans-serif;
}
body{
  font-size: 14px;
  background-color: ${(props) => props.theme.secondBgColor};
  color:${(props) => props.theme.fontColor};
  user-select: none;
}
a{
  text-decoration: none;
  color:inherit;
}
`;
