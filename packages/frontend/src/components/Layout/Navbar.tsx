import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Link,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Divider,
  useMediaQuery,
  useTheme,
  Container,
  Avatar
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
  Search as SearchIcon,
  CalendarMonth as CalendarIcon
} from '@mui/icons-material';

interface NavbarProps {
  title: string;
}

interface NavItem {
  text: string;
  path: string;
  icon: React.ReactElement;
  requireAuth?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ title }) => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  
  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
    handleMenuClose();
  };
  
  const menuItems = [
    { text: 'Perfil', icon: <PersonIcon />, onClick: () => navigate('/profile') },
    { text: 'Sair', icon: <LogoutIcon />, onClick: handleLogout }
  ];
  
  const navItems: NavItem[] = [
    { text: 'Início', path: '/', icon: <HomeIcon /> },
    { text: 'Painel', path: '/painel', icon: <PersonIcon />, requireAuth: true },
    { text: 'Processos', path: '/processos', icon: <SearchIcon />, requireAuth: true },
    { text: 'Calendário', path: '/calendario', icon: <CalendarIcon />, requireAuth: true }
  ];
  
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box sx={{ my: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src="/assets/Logo-JurisAssist.png" alt="JurisAssist" style={{ height: 40 }} />
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          (!item.requireAuth || isAuthenticated) && (
            <ListItem key={item.text} disablePadding>
              <ListItemButton 
                component={RouterLink} 
                to={item.path}
                sx={{ textAlign: 'center' }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          )
        ))}
        {!isAuthenticated ? (
          <ListItem disablePadding>
            <ListItemButton 
              onClick={() => loginWithRedirect()}
              sx={{ textAlign: 'center' }}
            >
              <ListItemIcon><LoginIcon /></ListItemIcon>
              <ListItemText primary="Entrar" />
            </ListItemButton>
          </ListItem>
        ) : (
          <ListItem disablePadding>
            <ListItemButton 
              onClick={handleLogout}
              sx={{ textAlign: 'center' }}
            >
              <ListItemIcon><LogoutIcon /></ListItemIcon>
              <ListItemText primary="Sair" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" color="default" elevation={0} sx={{ 
        backgroundColor: 'transparent',
        borderBottom: '1px solid #eaeaea'
      }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {isMobile && (
              <IconButton
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, color: 'text.primary' }}
              >
                <MenuIcon />
              </IconButton>
            )}
            
            <Box
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                mr: 4
              }}
            >
              <Link 
                component={RouterLink} 
                to="/" 
                color="inherit" 
                underline="none"
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <img src="/assets/Logo-JurisAssist.png" alt="JurisAssist" style={{ height: 40 }} />
              </Link>
            </Box>
            
            {!isMobile && (
              <>
                <Box sx={{ display: 'flex', flexGrow: 1 }}>
                  {navItems.map((item) => (
                    (!item.requireAuth || isAuthenticated) && (
                      <Button 
                        key={item.text}
                        color="inherit"
                        component={RouterLink}
                        to={item.path}
                        sx={{ color: 'text.primary', mx: 1 }}
                      >
                        {item.text}
                      </Button>
                    )
                  ))}
                  
                  <Button 
                    color="inherit"
                    sx={{ color: 'text.primary', mx: 1 }}
                  >
                    Preços
                  </Button>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton 
                    size="large" 
                    aria-label="pesquisar" 
                    color="inherit"
                    sx={{ color: 'text.primary' }}
                  >
                    <SearchIcon />
                  </IconButton>

                  <Button 
                    color="inherit"
                    sx={{ color: 'text.primary', ml: 1 }}
                  >
                    Suporte
                  </Button>

                  {!isAuthenticated ? (
                    <Button 
                      color="inherit"
                      onClick={() => loginWithRedirect()}
                      sx={{ color: 'text.primary', ml: 1 }}
                    >
                      Entrar
                    </Button>
                  ) : (
                    <>
                      <IconButton
                        color="inherit"
                        onClick={handleMenuOpen}
                        sx={{ color: 'text.primary', ml: 1 }}
                      >
                        <PersonIcon />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'right',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                      >
                        <MenuItem disabled>
                          <Typography variant="body2">
                            {user?.name || user?.email}
                          </Typography>
                        </MenuItem>
                        <Divider />
                        {menuItems.map((item) => (
                          <MenuItem key={item.text} onClick={item.onClick}>
                            <ListItemIcon>
                              {item.icon}
                            </ListItemIcon>
                            <ListItemText>
                              {item.text}
                            </ListItemText>
                          </MenuItem>
                        ))}
                      </Menu>
                    </>
                  )}
                </Box>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawerOpen && isMobile}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar; 