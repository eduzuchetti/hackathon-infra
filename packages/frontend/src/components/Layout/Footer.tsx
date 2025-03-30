import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Link, 
  Divider, 
  Stack 
} from '@mui/material';
import Grid from '../UI/Grid';
import { GitHub as GitHubIcon } from '@mui/icons-material';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    { title: 'About', path: '/about' },
    { title: 'Contact', path: '/contact' },
    { title: 'Privacy', path: '/privacy' },
    { title: 'Terms', path: '/terms' }
  ];

  return (
    <Box 
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        py: 6,
        mt: 'auto',
        borderTop: 1,
        borderColor: 'divider'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Hackathon Infrastructure
            </Typography>
            <Typography variant="body2" color="text.secondary">
              A modern React application with TypeScript, Material UI, and Auth0 integration.
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              <Link
                href="https://github.com/username/hackathon-infra"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
              >
                <GitHubIcon />
              </Link>
            </Stack>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Links
            </Typography>
            <Box>
              {footerLinks.map((link) => (
                <Box key={link.title} sx={{ mb: 1 }}>
                  <Link 
                    component={RouterLink} 
                    to={link.path}
                    color="text.secondary"
                    underline="hover"
                  >
                    {link.title}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Contact
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: info@example.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: +1 (555) 123-4567
            </Typography>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 3 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © {currentYear} Hackathon App. All rights reserved.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Built with React, TypeScript, and Material UI
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 