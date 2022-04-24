import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  :root {
    --font-size-small: 18px;
    --font-size-medium: 25px;
    --font-size-big: 40px;
  }

  body {
    margin-right: 50px;
    margin-left: 50px;
    font-family: antique-olive, sans-serif;
    color: #347193;
    background: #F8F7F7;
  }
  
  h1{
    font-family: antique-olive, sans-serif;
    font-weight: 500;
    font-size: 185px;
    margin:0;
  }
  h2{
    font-family: antique-olive, sans-serif;
    font-weight: 400;
    font-size: 40px;
    margin:0;
  }

  h3{
    font-family: antique-olive, sans-serif;
    font-weight: 400;
    font-size: 30px;
    margin:0;
  }
  p, a, button {
    font-family: roc-grotesk, sans-serif;
    font-weight: 400;
    font-size: 18px;
    margin:0;
  }
`;
