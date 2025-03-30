export const theme = {
  colors: {
    primary: '#47A248', // MongoDB green
    primaryLight: '#589636', // Variation for contrast
    background: '#FFFFFF',
    text: '#333333',
    secondaryText: '#666666',
    border: '#E8E8E8',
    error: '#D0021B',
    success: '#0DB04B',
    warning: '#F8991D',
    info: '#3D85C6',
    light: '#FFFFFF'
  },
  typography: {
    fontFamily: 'Helvetica Neue, Arial, Inter, sans-serif',
    fontSizes: {
      small: '14px',
      base: '16px',
      medium: '18px',
      large: '20px',
      xl: '24px',
      xxl: '32px',
      xxxl: '48px'
    },
    fontWeights: {
      light: 300,
      normal: 400,
      medium: 500,
      semiBold: 600,
      bold: 700
    },
    lineHeights: {
      tight: 1.2,
      normal: 1.5,
      loose: 1.8
    }
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
    xxxl: '64px'
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '12px',
    round: '50%'
  },
  shadows: {
    small: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
    medium: '0 3px 6px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.12)',
    large: '0 10px 20px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.1)',
    button: '0 1px 3px rgba(0, 0, 0, 0.08)'
  },
  transitions: {
    default: '0.3s ease-in-out',
    fast: '0.15s ease-in-out',
    slow: '0.5s ease-in-out'
  }
}; 