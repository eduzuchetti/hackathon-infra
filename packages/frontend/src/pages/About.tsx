import React from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Divider, 
  Paper
} from '@mui/material';
import Grid from '../components/UI/Grid';

const About: React.FC = () => {
  const typographyVariants = [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'subtitle1', 'subtitle2',
    'body1', 'body2',
    'button', 'caption', 'overline'
  ] as const;

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          About This Project
        </Typography>
        
        <Typography variant="body1" paragraph>
          This is a modern React application built with TypeScript, Material UI, and Auth0 integration.
          It serves as a foundation for hackathon projects and demonstrates best practices for frontend development.
        </Typography>

        <Typography variant="body1" paragraph>
          The application includes features like authentication, responsive design, and a customizable theme system
          that combines the power of Material UI with the flexibility of styled-components.
        </Typography>
        
        <Divider sx={{ my: 4 }} />
        
        <Typography variant="h3" gutterBottom>
          Typography Showcase
        </Typography>
        
        <Typography variant="body1" paragraph>
          Below are examples of all available typography variants provided by Material UI, customized
          for this application's design system.
        </Typography>
        
        <Grid container spacing={3}>
          {typographyVariants.map((variant) => (
            <Grid item xs={12} md={6} key={variant}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Typography variant={variant} component="div" gutterBottom>
                  {variant}: The quick brown fox jumps over the lazy dog
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Font family: {variant.includes('h') ? 'heading' : 'body'}
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
          {['primary', 'secondary', 'error', 'warning', 'info', 'success', 'text.primary', 'text.secondary'].map((color) => (
            <Grid item xs={12} md={6} key={color}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Typography variant="body1" color={color} gutterBottom>
                  {color}: The quick brown fox jumps over the lazy dog
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default About; 