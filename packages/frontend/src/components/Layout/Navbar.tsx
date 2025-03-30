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
  Container
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Info as InfoIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
  Search as SearchIcon,
  Language as LanguageIcon
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
  const [langAnchorEl, setLangAnchorEl] = useState<null | HTMLElement>(null);
  
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLangMenu = (event: React.MouseEvent<HTMLElement>) => {
    setLangAnchorEl(event.currentTarget);
  };
  
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  
  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
    handleMenuClose();
  };
  
  const menuItems = [
    { text: 'Profile', icon: <PersonIcon />, onClick: () => navigate('/profile') },
    { text: 'Logout', icon: <LogoutIcon />, onClick: handleLogout }
  ];
  
  const navItems: NavItem[] = [
    { text: 'Home', path: '/', icon: <HomeIcon /> },
    { text: 'Painel', path: '/painel', icon: <PersonIcon /> },
    { text: 'Processos', path: '/processos', icon: <PersonIcon /> },
    { text: 'About', path: '/about', icon: <InfoIcon /> }
  ];
  
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        {title}
      </Typography>
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
              <ListItemText primary="Login" />
            </ListItemButton>
          </ListItem>
        ) : (
          <ListItem disablePadding>
            <ListItemButton 
              onClick={handleLogout}
              sx={{ textAlign: 'center' }}
            >
              <ListItemIcon><LogoutIcon /></ListItemIcon>
              <ListItemText primary="Logout" />
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
            
            <Typography
              variant="h6"
              component="div"
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                mr: 4,
                color: 'text.primary',
                fontWeight: 'bold'
              }}
            >
              <Link 
                component={RouterLink} 
                to="/" 
                color="inherit" 
                underline="none"
              >
                {title}
              </Link>
            </Typography>
            
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
                    Pricing
                  </Button>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton 
                    size="large" 
                    aria-label="search" 
                    color="inherit"
                    sx={{ color: 'text.primary' }}
                  >
                    <SearchIcon />
                  </IconButton>

                  <Button
                    color="inherit"
                    onClick={handleLangMenu}
                    startIcon={<LanguageIcon />}
                    sx={{ color: 'text.primary', ml: 1 }}
                  >
                    Eng
                  </Button>
                  <Menu
                    anchorEl={langAnchorEl}
                    open={Boolean(langAnchorEl)}
                    onClose={() => setLangAnchorEl(null)}
                  >
                    <MenuItem>English</MenuItem>
                    <MenuItem>Português</MenuItem>
                    <MenuItem>Español</MenuItem>
                  </Menu>

                  <Button 
                    color="inherit"
                    sx={{ color: 'text.primary', ml: 1 }}
                  >
                    Support
                  </Button>

                  {!isAuthenticated ? (
                    <Button 
                      color="inherit"
                      onClick={() => loginWithRedirect()}
                      sx={{ color: 'text.primary', ml: 1 }}
                    >
                      Sign In
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

                  <Button 
                    variant="contained"
                    sx={{ 
                      ml: 2,
                      backgroundColor: '#00ED64',
                      color: 'black',
                      '&:hover': {
                        backgroundColor: '#00C957'
                      },
                      borderRadius: '4px',
                      textTransform: 'none',
                      fontWeight: 'medium',
                      px: 2
                    }}
                  >
                    Get Started
                  </Button>
                </Box>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      
      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
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