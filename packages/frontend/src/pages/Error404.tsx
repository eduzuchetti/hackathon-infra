import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  padding: 2rem;
  text-align: center;
`;

const ErrorCode = styled.h1`
  font-size: 7rem;
  margin: 0;
  color: ${({ theme }) => theme.colors.primary};
`;

const ErrorTitle = styled.h2`
  font-size: 2rem;
  margin: 1rem 0 2rem;
  color: #333;
`;

const ErrorMessage = styled.p`
  font-size: 1.2rem;
  max-width: 600px;
  margin-bottom: 2rem;
  color: #666;
`;

const HomeButton = styled(Link)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  text-decoration: none;
  display: inline-block;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryLight};
  }
`;

const Error404 = () => {
  return (
    <ErrorContainer>
      <ErrorCode>404</ErrorCode>
      <ErrorTitle>Page Not Found</ErrorTitle>
      <ErrorMessage>
        Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or never existed in the first place.
      </ErrorMessage>
      <HomeButton to="/">Return to Home</HomeButton>
    </ErrorContainer>
  );
};

export default Error404; 