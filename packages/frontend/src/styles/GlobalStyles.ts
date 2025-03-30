import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
    font-family: ${theme.fonts.body};
    font-size: ${theme.fontSizes.md};
    line-height: 1.5;
    color: ${theme.colors.text};
    background-color: ${theme.colors.background};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  a {
    text-decoration: none;
    color: ${theme.colors.primary};
    transition: all 0.2s ease-in-out;

    &:hover {
      color: ${theme.colors.primaryLight};
    }
  }

  button {
    cursor: pointer;
    font-family: ${theme.fonts.body};
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.fonts.heading};
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: ${theme.space.md};
    color: ${theme.colors.text};
  }

  h1 {
    font-size: ${theme.fontSizes['5xl']};
  }

  h2 {
    font-size: ${theme.fontSizes['4xl']};
  }

  h3 {
    font-size: ${theme.fontSizes['3xl']};
  }

  h4 {
    font-size: ${theme.fontSizes['2xl']};
  }

  h5 {
    font-size: ${theme.fontSizes.xl};
  }

  h6 {
    font-size: ${theme.fontSizes.lg};
  }

  p {
    margin-bottom: ${theme.space.md};
  }

  input, select, textarea {
    font-family: ${theme.fonts.body};
    font-size: ${theme.fontSizes.md};
  }

  code, pre, kbd, samp {
    font-family: ${theme.fonts.monospace};
    font-size: ${theme.fontSizes.sm};
  }

  main {
    flex: 1;
    width: 100%;
    max-width: 100vw;
    overflow-x: hidden;
  }
`; 