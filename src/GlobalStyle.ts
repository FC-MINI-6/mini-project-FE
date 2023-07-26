import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle` 
 :root {
  --color-primary: #0554F2;
  --color-white: #fff;
  --color-black: #000;
  --color-bg: #F2F2F2;
  --color-border: #eee;
  --color-blue-1: #010626;
  --color-blue-2: #395BBF;
  --color-blue-3:#1374F2;
 }
 
  
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
   
  }

  a {
    text-decoration: none;
  }

  button {
    cursor: pointer;
  }
`

export default GlobalStyle
