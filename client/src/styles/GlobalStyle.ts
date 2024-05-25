import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-size: 1.6rem;
    font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
    background: ${(props) => props.theme.colors.primaryWhite};
    color: ${(props) => props.theme.colors.primaryBlack}
  }

  ol, ul {
    list-style: none;
  }

  :lang(ko) {
    h1, h2, h3 {
      word-break: keep-all;
    }
  }
`;

export default GlobalStyle;
