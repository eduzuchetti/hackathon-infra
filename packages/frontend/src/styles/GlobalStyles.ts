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
    font-family: ${theme.typography.fontFamily};
    font-size: ${theme.typography.fontSizes.base};
    line-height: ${theme.typography.lineHeights.normal};
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
    transition: color ${theme.transitions.fast};

    &:hover {
      color: ${theme.colors.primaryLight};
    }
  }

  button {
    cursor: pointer;
    font-family: ${theme.typography.fontFamily};
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: ${theme.typography.fontWeights.bold};
    line-height: ${theme.typography.lineHeights.tight};
    margin-bottom: ${theme.spacing.md};
  }

  h1 {
    font-size: ${theme.typography.fontSizes.xxxl};
  }

  h2 {
    font-size: ${theme.typography.fontSizes.xxl};
  }

  h3 {
    font-size: ${theme.typography.fontSizes.xl};
  }

  h4 {
    font-size: ${theme.typography.fontSizes.large};
  }

  p {
    margin-bottom: ${theme.spacing.md};
  }

  input, select, textarea {
    font-family: ${theme.typography.fontFamily};
    font-size: ${theme.typography.fontSizes.base};
  }
`; 