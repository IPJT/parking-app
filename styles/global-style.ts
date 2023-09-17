import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    * {
        font-family: ${(props) => props.theme.fontFamily};        
    }
    
    body {
        background-color: ${(props) => props.theme.colors.scheme.darkShades};
        color: ${(props) => props.theme.colors.scheme.lightShades};
        margin: 0px;
    }

    button {
        all: unset
    }

    a {
        text-decoration: none;
        color: ${(props) => props.theme.colors.scheme.lightShades};
    }

    a:hover {
        text-decoration: underline;
    }
`
