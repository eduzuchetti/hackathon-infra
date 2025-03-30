// Mock for styled-components
module.exports = {
  createGlobalStyle: () => () => null,
  ThemeProvider: ({ children }) => children,
  css: () => ({}),
}; 