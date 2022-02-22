import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
html {
  font-size: 0.267vw;
  color: #000;
  font-family: 'Noto Sans KR';
}
body{
  line-height: 1.3;
  margin: 0;
  padding : 0;
}

input{
  padding: 0;
  margin: 0;
  box-shadow: none;
  border: none;
}
a {
  color: black;
  text-decoration: none;
}
`;

export default GlobalStyle;
