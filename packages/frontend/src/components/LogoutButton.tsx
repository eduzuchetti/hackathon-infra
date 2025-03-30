import styled from 'styled-components';
import { useAuth } from '../auth/use-auth';

const Button = styled.button`
  background-color: transparent;
  color: #f44336;
  border: 1px solid #f44336;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f44336;
    color: white;
  }
`;

export const LogoutButton = () => {
  const { logout } = useAuth();

  return (
    <Button onClick={() => logout()}>
      Sign Out
    </Button>
  );
}; 