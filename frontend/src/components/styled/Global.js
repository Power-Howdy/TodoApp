import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
    }

    body {
        font-family: 'Josefin Sans', sans-serif;
        height: 100vh;
        width: 100%;
        display: flex;
        justify-content: center;
        position: relative;

        background-color: ${({theme}) => theme.bgBody};
    }

`

export default GlobalStyles;