import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    fontColor: string;
    subFontColor: string;
    bgColor: string;
    secondBgColor: string;
    privateColor: string;
    borderColor: string;
    facebookColor: string;
    boxBgColor: string;
    reversBgColor: string;
  }
}
