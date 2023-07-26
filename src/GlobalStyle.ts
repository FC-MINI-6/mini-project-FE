import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle` 
 :root {
  --color-primary: #0554F2;
  --color-white: #fff;
  --color-black: #000;
  --color-bg: #F2F2F2;
  --color-border: #ddd;
  --color-blue-1: #010626;
  --color-blue-2: #395BBF;
  --color-blue-3:#1374F2;
  --color-green-1: #29b475;
  --color-red-1: #dc3545;
  --color-yellow-1: #ffc107;
  --color-purple-1: #685efc;
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
