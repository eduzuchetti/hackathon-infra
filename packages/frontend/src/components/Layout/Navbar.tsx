import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../auth/use-auth';

type NavbarProps = {
  title: string;
};

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.light};
`;

const NavBrand = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.light};
  text-decoration: none;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

const AuthButton = styled.button`
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.light};
  color: ${({ theme }) => theme.colors.light};
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.light};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Navbar = ({ title }: NavbarProps) => {
  const { isAuthenticated, login, logout, isLoading } = useAuth();

  return (
    <NavContainer>
      <NavBrand>
        <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
          {title}
        </Link>
      </NavBrand>
      
      <NavLinks>
        <NavLink to="/">Home</NavLink>
        {isAuthenticated && (
          <NavLink to="/dashboard">Dashboard</NavLink>
        )}
        <NavLink to="/about">About</NavLink>
        
        {!isLoading && (
          isAuthenticated ? (
            <AuthButton onClick={() => logout()}>
              Sign Out
            </AuthButton>
          ) : (
            <AuthButton onClick={() => login()}>
              Sign In
            </AuthButton>
          )
        )}
      </NavLinks>
    </NavContainer>
  );
};

export default Navbar; 