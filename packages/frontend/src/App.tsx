import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import Dashboard from './pages/Dashboard';
import Error403 from './pages/Error403';
import Error404 from './pages/Error404';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import TypographyDemo from './pages/TypographyDemo';
import Painel from './pages/Painel';
import Processos from './pages/Processos';
import ProcessoDetalhes from './pages/ProcessoDetalhes';
import { Box } from '@mui/material';

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
            <Auth0ProviderWithNavigate>
              <Navbar title="Hackathon App" />
              <Box component="main" sx={{ flexGrow: 1 }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route 
                    path="/dashboard" 
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route path="/painel" element={<Painel />} />
                  <Route path="/processos" element={<Processos />} />
                  <Route path="/processos/:id" element={<ProcessoDetalhes />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/typography" element={<TypographyDemo />} />
                  <Route path="/403" element={<Error403 />} />
                  <Route path="/404" element={<Error404 />} />
                  <Route path="*" element={<Error404 />} />
                </Routes>
              </Box>
            </Auth0ProviderWithNavigate>
            <Footer />
          </Router>
        </Box>
      </StyledThemeProvider>
    </MuiThemeProvider>
  );
}

export default App; 