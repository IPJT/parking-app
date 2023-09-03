import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    * {
        font-family: ${(props) => props.theme.fontFamily};
        margin: 0px;
        
    }
    body {
        background-color: ${(props) => props.theme.colors.background};
        color: ${(props) => props.theme.colors.text};
    }

    button {
        background-color: ${(props) => props.theme.colors.secondary};
    }

    a {
        text-decoration: none;
        color: ${(props) => props.theme.colors.text};
    }

    a:hover {
        text-decoration: underline;
    }
`
