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
  useTheme
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Dashboard as DashboardIcon,
  Info as InfoIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
  TextFields as TextFieldsIcon
} from '@mui/icons-material';

interface NavbarProps {
  title: string;
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
    { text: 'Profile', icon: <PersonIcon />, onClick: () => navigate('/profile') },
    { text: 'Logout', icon: <LogoutIcon />, onClick: handleLogout }
  ];
  
  const navItems = [
    { text: 'Home', path: '/', icon: <HomeIcon /> },
    { text: 'Dashboard', path: '/dashboard', icon: <DashboardIcon />, requireAuth: true },
    { text: 'Typography', path: '/typography', icon: <TextFieldsIcon /> },
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
      <AppBar position="static" color="primary">
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
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
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {navItems.map((item) => (
                (!item.requireAuth || isAuthenticated) && (
                  <Button 
                    key={item.text}
                    color="inherit"
                    component={RouterLink}
                    to={item.path}
                    startIcon={item.icon}
                    sx={{ ml: 2 }}
                  >
                    {item.text}
                  </Button>
                )
              ))}
              
              {!isAuthenticated ? (
                <Button 
                  color="inherit"
                  onClick={() => loginWithRedirect()}
                  startIcon={<LoginIcon />}
                  sx={{ ml: 2 }}
                >
                  Login
                </Button>
              ) : (
                <>
                  <IconButton
                    color="inherit"
                    onClick={handleMenuOpen}
                    sx={{ ml: 2 }}
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
          )}
        </Toolbar>
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