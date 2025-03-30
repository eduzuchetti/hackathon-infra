import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import { Auth0ProviderWithNavigate } from './auth/auth0-provider';
import { ProtectedRoute } from './auth/protected-route';
import { Login } from './pages/Login';
import Home from './pages/Home';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <Auth0ProviderWithNavigate>
          <Navbar title="Hackathon App" />
          <main>
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
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
          <Footer />
        </Auth0ProviderWithNavigate>
      </Router>
    </ThemeProvider>
  );
}

export default App; 