import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Paper,
  Stack,
  Divider
} from '@mui/material';
import { 
  Security as SecurityIcon, 
  AutoAwesome as FeatureIcon,
  Code as CodeIcon
} from '@mui/icons-material';
import Grid from '../components/UI/Grid';
import Card from '../components/UI/Card';

const Home: React.FC = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const features = [
    {
      title: 'React 18',
      icon: <CodeIcon fontSize="large" color="primary" />,
      description: 'Built with the latest React features including hooks, context, and concurrent mode.'
    },
    {
      title: 'Material UI',
      icon: <FeatureIcon fontSize="large" color="primary" />,
      description: 'Beautiful, customizable, and accessible component library.'
    },
    {
      title: 'Auth0 Integration',
      icon: <SecurityIcon fontSize="large" color="primary" />,
      description: 'Secure authentication and authorization out of the box.'
    }
  ];

  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Box 
        sx={{ 
          textAlign: 'center', 
          py: 8,
        }}
      >
        <Typography 
          variant="h2" 
          component="h1" 
          gutterBottom
          sx={{ fontWeight: 'bold', mb: 2 }}
        >
          Hackathon Infrastructure
        </Typography>
        
        <Typography 
          variant="h5" 
          color="textSecondary" 
          sx={{ mb: 4, maxWidth: '800px', mx: 'auto' }}
        >
          A modern React application with TypeScript, Material UI, and Auth0 integration.
        </Typography>
        
        {!isAuthenticated && (
          <Button 
            variant="contained" 
            size="large" 
            color="primary" 
            onClick={() => loginWithRedirect()}
            sx={{ my: 2 }}
          >
            Get Started
          </Button>
        )}
      </Box>
      
      <Divider sx={{ my: 4 }} />
      
      {/* Features Section */}
      <Box sx={{ py: 4 }}>
        <Typography 
          variant="h4" 
          component="h2" 
          align="center" 
          gutterBottom
          sx={{ mb: 6 }}
        >
          Key Features
        </Typography>
        
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper 
                elevation={2}
                sx={{ 
                  p: 4, 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)'
                  }
                }}
              >
                <Box sx={{ mb: 2 }}>
                  {feature.icon}
                </Box>
                <Typography variant="h6" component="h3" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
      
      <Divider sx={{ my: 4 }} />
      
      {/* Projects Section */}
      <Box sx={{ py: 4 }}>
        <Typography 
          variant="h4" 
          component="h2" 
          align="center" 
          gutterBottom
          sx={{ mb: 6 }}
        >
          Sample Projects
        </Typography>
        
        <Grid container spacing={4}>
          {[1, 2, 3].map((item) => (
            <Grid item xs={12} md={4} key={item}>
              <Card
                title={`Project ${item}`}
                subheader="Sample Project"
                image={`https://source.unsplash.com/random/300x200?sig=${item}`}
                actions={
                  <Stack direction="row" spacing={1}>
                    <Button size="small" color="primary">
                      View
                    </Button>
                    <Button size="small" color="secondary">
                      Details
                    </Button>
                  </Stack>
                }
              >
                <Typography variant="body2" color="text.secondary">
                  This is a sample project card demonstrating the Material UI integration with our custom components.
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Home; 