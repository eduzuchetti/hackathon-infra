import styled from 'styled-components';
import { useAuth } from '../auth/use-auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  padding: 2rem;
`;

const LoginCard = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

const Title = styled.h1`
  margin-bottom: 1.5rem;
  color: #333;
`;

const Subtitle = styled.p`
  margin-bottom: 2rem;
  color: #666;
`;

const LoginButton = styled.button`
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0060df;
  }
`;

export const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <LoginContainer>
      <LoginCard>
        <Title>Welcome to Hackathon App</Title>
        <Subtitle>Sign in to access your dashboard and manage your hackathons</Subtitle>
        <LoginButton onClick={() => login()}>
          Sign In with Auth0
        </LoginButton>
      </LoginCard>
    </LoginContainer>
  );
}; 