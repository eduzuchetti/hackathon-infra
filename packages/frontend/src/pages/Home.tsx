import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Paper,
  Stack,
  Divider,
  useTheme,
  alpha,
  styled,
  IconButton,
  Card as MuiCard
} from '@mui/material';
import { 
  Security as SecurityIcon, 
  AutoAwesome as FeatureIcon,
  Code as CodeIcon,
  ChevronRight as ChevronRightIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  GitHub as GitHubIcon,
  Laptop as LaptopIcon,
  AccountTree as AccountTreeIcon,
  CloudUpload as CloudUploadIcon
} from '@mui/icons-material';
import Grid from '../components/UI/Grid';
import Card from '../components/UI/Card';
import { Link as RouterLink } from 'react-router-dom';

// Styled components for glassmorphism and gradient effects
const GlassmorphicHero = styled(Box)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: theme.shape.borderRadius * 3,
  padding: theme.spacing(10, 2),
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
  backdropFilter: 'blur(10px)',
  boxShadow: `0 8px 32px 0 ${alpha('#000', 0.1)}`,
  border: `1px solid ${alpha('#fff', 0.18)}`,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    background: `radial-gradient(circle at top right, ${alpha(theme.palette.secondary.main, 0.2)}, transparent 400px), 
                radial-gradient(circle at bottom left, ${alpha(theme.palette.primary.main, 0.2)}, transparent 400px)`,
  }
}));

const GradientText = styled(Typography)(({ theme }) => ({
  backgroundImage: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  backgroundClip: 'text',
  textFillColor: 'transparent',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  display: 'inline-block',
}));

const GlassmorphicCard = styled(Paper)(({ theme }) => ({
  background: alpha('#fff', 0.7),
  backdropFilter: 'blur(10px)',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: `0 8px 32px 0 ${alpha('#000', 0.1)}`,
  border: `1px solid ${alpha('#fff', 0.18)}`,
  padding: theme.spacing(4),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: `0 12px 48px 0 ${alpha('#000', 0.15)}`,
  }
}));

const GradientIconWrapper = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  borderRadius: '50%',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
}));

const GradientBorderCard = styled(MuiCard)(({ theme }) => ({
  position: 'relative',
  height: '100%',
  padding: theme.spacing(3),
  background: alpha('#fff', 0.7),
  backdropFilter: 'blur(10px)',
  borderRadius: theme.shape.borderRadius * 2,
  overflow: 'hidden',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    margin: -2,
    borderRadius: 'inherit',
    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
    backgroundSize: '200% 200%',
    animation: 'gradient-border 3s ease infinite',
  },
  '@keyframes gradient-border': {
    '0%': { backgroundPosition: '0% 50%' },
    '50%': { backgroundPosition: '100% 50%' },
    '100%': { backgroundPosition: '0% 50%' },
  },
}));

const CircleDecoration = styled(Box)<{ sx?: any }>(({ theme }) => ({
  position: 'absolute',
  borderRadius: '50%',
  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.3)}, ${alpha(theme.palette.secondary.main, 0.3)})`,
  filter: 'blur(30px)',
}));

const ScrollDownButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(3),
  borderRadius: '50%',
  backgroundColor: alpha(theme.palette.background.paper, 0.5),
  backdropFilter: 'blur(5px)',
  color: theme.palette.text.primary,
  animation: 'float 2s ease-in-out infinite',
  '&:hover': {
    backgroundColor: alpha(theme.palette.background.paper, 0.7),
  },
  '@keyframes float': {
    '0%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(10px)' },
    '100%': { transform: 'translateY(0)' },
  }
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  color: '#fff',
  borderRadius: 50,
  padding: theme.spacing(1, 4),
  fontWeight: 600,
  textTransform: 'none',
  '&:hover': {
    background: `linear-gradient(90deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
    boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
  },
}));

const Home: React.FC = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const theme = useTheme();

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
    {
      title: 'React 18',
      icon: <CodeIcon fontSize="large" />,
      description: 'Built with the latest React features including hooks, context, and concurrent mode.'
    },
    {
      title: 'Material UI',
      icon: <FeatureIcon fontSize="large" />,
      description: 'Beautiful, customizable, and accessible component library.'
    },
    {
      title: 'Auth0 Integration',
      icon: <SecurityIcon fontSize="large" />,
      description: 'Secure authentication and authorization out of the box.'
    },
    {
      title: 'Cloud Deployment',
      icon: <CloudUploadIcon fontSize="large" />,
      description: 'Simple deployment to AWS S3 and CloudFront for global content delivery.'
    }
  ];

  const projects = [
    {
      title: 'Frontend App',
      icon: <LaptopIcon />,
      description: 'Modern React application with TypeScript and Material UI components.',
    },
    {
      title: 'Auth Integration',
      icon: <SecurityIcon />,
      description: 'Secure authentication flow with Auth0 and protected routes.',
    },
    {
      title: 'Infrastructure',
      icon: <AccountTreeIcon />,
      description: 'Complete infrastructure setup with continuous deployment.',
    },
    {
      title: 'Cloud Hosting',
      icon: <CloudUploadIcon />,
      description: 'Deployment scripts and configuration for AWS cloud hosting.',
    }
  ];

  return (
    <Box sx={{ overflow: 'hidden', position: 'relative' }}>
      {/* Circle decorations */}
      <CircleDecoration sx={{ width: 300, height: 300, top: -100, right: -100 }} />
      <CircleDecoration sx={{ width: 200, height: 200, bottom: 300, left: -100 }} />
      
      {/* Hero Section */}
      <Box sx={{ 
        minHeight: '90vh', 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center',
        position: 'relative',
        px: 2
      }}>
        <Container maxWidth="md">
          <GlassmorphicHero>
            <Typography 
              variant="overline" 
              sx={{ 
                mb: 2, 
                letterSpacing: 3,
                color: theme.palette.text.secondary
              }}
            >
              WELCOME TO
            </Typography>
            
            <GradientText 
              variant="h2" 
              sx={{ 
                fontWeight: 800, 
                textAlign: 'center',
                mb: 3,
                fontSize: { xs: '2.5rem', md: '3.75rem' }
              }}
            >
              Hackathon Infrastructure
            </GradientText>
            
            <Typography 
              variant="h5" 
              color="textSecondary" 
              sx={{ 
                mb: 6, 
                textAlign: 'center',
                maxWidth: '800px',
                mx: 'auto',
                px: 2
              }}
            >
              A modern React platform with TypeScript, Material UI, and Auth0 integration.
            </Typography>
            
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              {!isAuthenticated && (
                <GradientButton 
                  size="large"
                  onClick={() => loginWithRedirect()}
                  endIcon={<ChevronRightIcon />}
                >
                  Get Started
                </GradientButton>
              )}
              
              <Button 
                variant="outlined" 
                size="large" 
                color="primary"
                component={RouterLink}
                to="/about"
                sx={{ 
                  borderRadius: 50,
                  px: 4,
                  borderWidth: 2,
                  '&:hover': {
                    borderWidth: 2
                  }
                }}
              >
                Learn More
              </Button>
            </Stack>
            
            <Box sx={{ mt: 10, display: 'flex', justifyContent: 'center' }}>
              <ScrollDownButton onClick={scrollToFeatures}>
                <KeyboardArrowDownIcon />
              </ScrollDownButton>
            </Box>
          </GlassmorphicHero>
        </Container>
      </Box>
      
      {/* Features Section */}
      <Box id="features" sx={{ py: 12, backgroundColor: alpha(theme.palette.background.paper, 0.5) }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="overline" color="primary" sx={{ letterSpacing: 2, fontWeight: 500 }}>
              POWERFUL FEATURES
            </Typography>
            <GradientText 
              variant="h3" 
              sx={{ fontWeight: 700, mb: 2 }}
            >
              Everything You Need
            </GradientText>
            <Typography variant="subtitle1" color="textSecondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              Our platform provides all the tools and features you need to build amazing applications.
            </Typography>
          </Box>
          
          <Grid container spacing={4} justifyContent="center">
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <GlassmorphicCard>
                  <GradientIconWrapper>
                    {feature.icon}
                  </GradientIconWrapper>
                  <Typography variant="h5" component="h3" gutterBottom textAlign="center">
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="textSecondary" textAlign="center">
                    {feature.description}
                  </Typography>
                </GlassmorphicCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      
      {/* Projects Section */}
      <Box sx={{ py: 12 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="overline" color="secondary" sx={{ letterSpacing: 2, fontWeight: 500 }}>
              SHOWCASE
            </Typography>
            <GradientText 
              variant="h3" 
              sx={{ fontWeight: 700, mb: 2 }}
            >
              Featured Projects
            </GradientText>
            <Typography variant="subtitle1" color="textSecondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              Explore our showcase of projects built with our infrastructure.
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            {projects.map((project, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <GradientBorderCard>
                  <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box sx={{ 
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        borderRadius: '50%', 
                        width: 48,
                        height: 48,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2,
                        color: theme.palette.primary.main
                      }}>
                        {project.icon}
                      </Box>
                      <Typography variant="h6" component="h3">
                        {project.title}
                      </Typography>
                    </Box>
                    
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 2, flexGrow: 1 }}>
                      {project.description}
                    </Typography>
                    
                    <Button 
                      size="small" 
                      color="primary" 
                      endIcon={<ChevronRightIcon />}
                      sx={{ alignSelf: 'flex-start', textTransform: 'none' }}
                    >
                      Learn more
                    </Button>
                  </Box>
                </GradientBorderCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      
      {/* CTA Section */}
      <Container maxWidth="md" sx={{ py: 12 }}>
        <GlassmorphicHero sx={{ 
          py: 8, 
          textAlign: 'center',
          background: alpha(theme.palette.primary.main, 0.05)
        }}>
          <GradientText 
            variant="h3" 
            sx={{ fontWeight: 700, mb: 3 }}
          >
            Ready to Get Started?
          </GradientText>
          
          <Typography variant="h6" sx={{ mb: 4, maxWidth: 700, mx: 'auto' }}>
            Join our community and start building amazing applications today.
          </Typography>
          
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={2}
            justifyContent="center"
          >
            {!isAuthenticated && (
              <GradientButton 
                size="large"
                onClick={() => loginWithRedirect()}
              >
                Sign Up Now
              </GradientButton>
            )}
            
            <Button
              variant="outlined"
              size="large"
              color="primary"
              startIcon={<GitHubIcon />}
              component="a"
              href="https://github.com/eduzuchetti/hackathon-infra"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ 
                borderRadius: 50,
                px: 4,
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2
                }
              }}
            >
              View on GitHub
            </Button>
          </Stack>
        </GlassmorphicHero>
      </Container>
    </Box>
  );
};

export default Home; 