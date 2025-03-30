import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme, muiTheme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import Auth0ProviderWithNavigate from './auth/auth0-provider';
import ProtectedRoute from './auth/protected-route';
import Login from './pages/Login';
import Home from './pages/Home';
import About from './pages/About';
import Error403 from './pages/Error403';
import Error404 from './pages/Error404';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Painel from './pages/Painel';
import Processos from './pages/Processos';
import ProcessoDetalhes from './pages/ProcessoDetalhes';
import { Box } from '@mui/material';

const AppContent = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <>
      <Auth0ProviderWithNavigate>
        <Navbar title="Hackathon App" />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/painel" element={<Painel />} />
            <Route path="/processos" element={<Processos />} />
            <Route path="/processos/:id" element={<ProcessoDetalhes />} />
            <Route path="/about" element={<About />} />
            <Route path="/403" element={<Error403 />} />
            <Route path="/404" element={<Error404 />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </Box>
      </Auth0ProviderWithNavigate>
      {isHomePage && <Footer />}
    </>
  );
};

function App() {
  return (
    <MuiThemeProvider theme={muiTheme}>
      <StyledThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        <Box sx={{ 
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh'
        }}>
          <Router>
            <AppContent />
          </Router>
        </Box>
      </StyledThemeProvider>
    </MuiThemeProvider>
  );
}

export default App; 