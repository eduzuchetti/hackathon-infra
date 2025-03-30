import React from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Divider, 
  Paper,
  useTheme
} from '@mui/material';
import Grid from '../components/UI/Grid';

const TypographyDemo: React.FC = () => {
  const theme = useTheme();
  
  const typographyVariants = [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'subtitle1', 'subtitle2',
    'body1', 'body2',
    'button', 'caption', 'overline'
  ] as const;

  const colorOptions = [
    'primary', 'secondary', 'error', 'warning', 
    'info', 'success', 'text.primary', 'text.secondary'
  ] as const;

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Typography System
        </Typography>
        
        <Typography variant="body1" paragraph>
          This page demonstrates the typography system used in the application. 
          It shows all available variants with their respective styles and properties.
        </Typography>

        <Divider sx={{ my: 4 }} />
        
        <Typography variant="h3" gutterBottom>
          Typography Variants
        </Typography>
        
        <Typography variant="body1" paragraph>
          Material UI provides the following typography variants, which we've customized for our application.
        </Typography>
        
        <Grid container spacing={3}>
          {typographyVariants.map((variant) => (
            <Grid item xs={12} md={6} key={variant}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Typography variant={variant} component="div" gutterBottom>
                  {variant}: The quick brown fox jumps over the lazy dog
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Font family: {variant.includes('h') ? theme.typography.fontFamily : theme.typography.fontFamily}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
        
        <Divider sx={{ my: 4 }} />
        
        <Typography variant="h3" gutterBottom>
          Color Variations
        </Typography>
        
        <Grid container spacing={3}>
          {colorOptions.map((color) => (
            <Grid item xs={12} md={6} key={color}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Typography variant="body1" color={color} gutterBottom>
                  {color}: The quick brown fox jumps over the lazy dog
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
        
        <Divider sx={{ my: 4 }} />
        
        <Typography variant="h3" gutterBottom>
          Typography Properties
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Alignment
              </Typography>
              <Typography align="left" paragraph>
                Left aligned text (default)
              </Typography>
              <Typography align="center" paragraph>
                Center aligned text
              </Typography>
              <Typography align="right" paragraph>
                Right aligned text
              </Typography>
              <Typography align="justify" paragraph>
                Justified text that spans multiple lines will be justified to fill the available space evenly. This is particularly useful for longer paragraphs of text.
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Font Weight
              </Typography>
              <Typography fontWeight="light" paragraph>
                Light text (300)
              </Typography>
              <Typography fontWeight="regular" paragraph>
                Regular text (400)
              </Typography>
              <Typography fontWeight="medium" paragraph>
                Medium text (500)
              </Typography>
              <Typography fontWeight="bold" paragraph>
                Bold text (700)
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Responsive Typography
              </Typography>
              <Typography 
                sx={{ 
                  fontSize: {
                    xs: '1rem',    // mobile
                    sm: '1.2rem',  // tablet
                    md: '1.4rem',  // desktop
                    lg: '1.6rem'   // large desktop
                  }
                }}
                paragraph
              >
                This text changes size based on the screen breakpoint
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default TypographyDemo; 