import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: 'Times New Roman', Times, serif;
    background-color: #f5f3e9;
    color: #333;
    line-height: 1.6;
  }

  /* Using a vintage-inspired font stack and colors to match 1940s aesthetic */
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Georgia', serif;
    color: #4a3c31;
    margin-bottom: 1rem;
  }
`;

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
