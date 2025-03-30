import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { theme } from '../../styles/theme';
import Container from '../Layout/Container';

interface NavbarProps {
  title: string;
  logo?: string;
}

const NavbarContainer = styled.header`
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: ${theme.spacing.md} 0;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const NavbarContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  height: 32px;
  margin-right: ${theme.spacing.sm};
`;

const Title = styled.h1`
  margin: 0;
  font-size: ${theme.typography.fontSizes.large};
  font-weight: ${theme.typography.fontWeights.bold};
  color: ${theme.colors.text};
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: ${theme.colors.text};
  font-weight: ${theme.typography.fontWeights.medium};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  text-decoration: none;
  position: relative;
  transition: color ${theme.transitions.fast};
  
  &:hover {
    color: ${theme.colors.primary};
  }
  
  &.active {
    color: ${theme.colors.primary};
    
    &:after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: ${theme.spacing.sm};
      right: ${theme.spacing.sm};
      height: 2px;
      background-color: ${theme.colors.primary};
    }
  }
`;

export const Navbar: React.FC<NavbarProps> = ({ title, logo }) => {
  return (
    <NavbarContainer>
      <Container>
        <NavbarContent>
          <LogoContainer>
            {logo && <Logo src={logo} alt={title} />}
            <Title>{title}</Title>
          </LogoContainer>
          <Nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/about">About</NavLink>
          </Nav>
        </NavbarContent>
      </Container>
    </NavbarContainer>
  );
};

export default Navbar; 