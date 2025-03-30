import { createTheme } from '@mui/material/styles';

// Colors
const colors = {
  primary: '#47A248',
  primaryLight: '#589636',
  primaryDark: '#2E6A2E',
  secondary: '#2F5AA8',
  secondaryLight: '#4A7BD8',
  secondaryDark: '#1D3C72',
  background: '#FFFFFF',
  surface: '#F5F5F5',
  error: '#B00020',
  text: '#333333',
  textLight: '#666666',
  success: '#4CAF50',
  warning: '#FFC107',
  info: '#2196F3',
};

// Styled-components theme
export const theme = {
  colors,
  fonts: {
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    heading: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    monospace: 'source-code-pro, Menlo, Monaco, Consolas, monospace',
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },
  space: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '4rem',
    '3xl': '8rem',
  },
  borderRadius: {
    sm: '0.125rem',
    md: '0.25rem',
    lg: '0.5rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  },
  breakpoints: {
    xs: '0px',
    sm: '600px',
    md: '960px',
    lg: '1280px',
    xl: '1920px',
  },
};

// Material UI theme
export const muiTheme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
      light: colors.primaryLight,
      dark: colors.primaryDark,
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: colors.secondary,
      light: colors.secondaryLight,
      dark: colors.secondaryDark,
      contrastText: '#FFFFFF',
    },
    error: {
      main: colors.error,
    },
    background: {
      default: colors.background,
      paper: colors.surface,
    },
    text: {
      primary: colors.text,
      secondary: colors.textLight,
    },
    success: {
      main: colors.success,
    },
    warning: {
      main: colors.warning,
    },
    info: {
      main: colors.info,
    },
  },
  typography: {
    fontFamily: theme.fonts.body,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontFamily: theme.fonts.heading,
      fontSize: theme.fontSizes['5xl'],
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
      marginBottom: theme.space.md,
    },
    h2: {
      fontFamily: theme.fonts.heading,
      fontSize: theme.fontSizes['4xl'],
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
      marginBottom: theme.space.md,
    },
    h3: {
      fontFamily: theme.fonts.heading,
      fontSize: theme.fontSizes['3xl'],
      fontWeight: 600,
      lineHeight: 1.3,
      marginBottom: theme.space.md,
    },
    h4: {
      fontFamily: theme.fonts.heading,
      fontSize: theme.fontSizes['2xl'],
      fontWeight: 600,
      lineHeight: 1.35,
      marginBottom: theme.space.sm,
    },
    h5: {
      fontFamily: theme.fonts.heading,
      fontSize: theme.fontSizes.xl,
      fontWeight: 600,
      lineHeight: 1.4,
      marginBottom: theme.space.sm,
    },
    h6: {
      fontFamily: theme.fonts.heading,
      fontSize: theme.fontSizes.lg,
      fontWeight: 600,
      lineHeight: 1.4,
      marginBottom: theme.space.sm,
    },
    subtitle1: {
      fontSize: theme.fontSizes.lg,
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
    },
    subtitle2: {
      fontSize: theme.fontSizes.md,
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '0.00714em',
    },
    body1: {
      fontSize: theme.fontSizes.md,
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
    },
    body2: {
      fontSize: theme.fontSizes.sm,
      lineHeight: 1.5,
      letterSpacing: '0.01071em',
    },
    button: {
      fontSize: theme.fontSizes.md,
      fontWeight: 500,
      lineHeight: 1.75,
      letterSpacing: '0.02857em',
      textTransform: 'none',
    },
    caption: {
      fontSize: theme.fontSizes.xs,
      lineHeight: 1.5,
      letterSpacing: '0.03333em',
    },
    overline: {
      fontSize: theme.fontSizes.xs,
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0.08333em',
      textTransform: 'uppercase',
    },
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: theme.borderRadius.md,
          padding: `${theme.space.sm} ${theme.space.md}`,
          fontWeight: 500,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: theme.borderRadius.md,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          marginBottom: 0,
        },
        gutterBottom: {
          marginBottom: theme.space.md,
        },
      },
    },
  },
}); 