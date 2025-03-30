import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { 
  Typography, 
  Box, 
  Button, 
  Stack,
  useTheme,
  alpha,
  styled,
} from '@mui/material';
import { 
  Security as SecurityIcon, 
  ChevronRight as ChevronRightIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

// Styled components for glassmorphism and gradient effects
const GlassmorphicHero = styled(Box)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: 0,
  padding: theme.spacing(10, 2),
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
  backdropFilter: 'blur(10px)',
  boxShadow: `0 8px 32px 0 ${alpha('#000', 0.1)}`,
  border: 'none',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100vw',
  height: '100vh',
  margin: 0,
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

const CircleDecoration = styled(Box)(({ theme }) => ({
  position: 'absolute',
  borderRadius: '50%',
  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.3)}, ${alpha(theme.palette.secondary.main, 0.3)})`,
  filter: 'blur(30px)',
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
    // Como não há mais a seção de features, este botão não tem mais um destino válido
    // Uma alternativa poderia ser redirecionar para o painel ou outra página
    if (isAuthenticated) {
      window.location.href = '/painel';
    } else {
      loginWithRedirect();
    }
  };

  return (
    <Box sx={{ overflow: 'hidden', position: 'relative' }}>
      {/* Circle decorations */}
      <Box component={CircleDecoration} sx={{ width: 300, height: 300, top: -100, right: -100 }} />
      <Box component={CircleDecoration} sx={{ width: 200, height: 200, bottom: 300, left: -100 }} />
      
      {/* Hero Section */}
      <GlassmorphicHero>
        <Typography 
          variant="overline" 
          sx={{ 
            mb: 2, 
            letterSpacing: 3,
            color: theme.palette.text.secondary
          }}
        >
          BEM-VINDO AO
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
          JurisAssist
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
          Uma plataforma moderna para gerenciamento jurídico com React, TypeScript, Material UI e integração Auth0.
        </Typography>
        
        <Stack 
          direction={{ xs: 'column', sm: 'row' }} 
          spacing={2}
        >
          {!isAuthenticated ? (
            <GradientButton 
              size="large" 
              onClick={() => loginWithRedirect()}
              startIcon={<SecurityIcon />}
            >
              Iniciar Agora
            </GradientButton>
          ) : (
            <RouterLink to="/painel" style={{ textDecoration: 'none' }}>
              <GradientButton 
                size="large"
                startIcon={<ChevronRightIcon />}
              >
                Acessar Painel
              </GradientButton>
            </RouterLink>
          )}
          
          <Button 
            variant="outlined" 
            size="large" 
            onClick={scrollToFeatures}
            sx={{ 
              borderRadius: 50,
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              '&:hover': {
                borderColor: theme.palette.primary.dark,
                backgroundColor: alpha(theme.palette.primary.main, 0.04)
              }
            }}
            endIcon={<KeyboardArrowDownIcon />}
          >
            Saiba Mais
          </Button>
        </Stack>
      </GlassmorphicHero>
    </Box>
  );
};

export default Home; 