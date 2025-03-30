import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

// Mock Auth0 provider
jest.mock('@auth0/auth0-react', () => ({
  useAuth0: () => ({
    isAuthenticated: false,
    user: null,
    loading: false,
    loginWithRedirect: jest.fn(),
    logout: jest.fn(),
  }),
  Auth0Provider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock('./components/Layout/Navbar', () => () => <nav data-testid="navbar">Navbar</nav>);
jest.mock('./pages/Home', () => () => <div data-testid="home-page">Home Page</div>);

describe('App', () => {
  test('renders without crashing', () => {
    render(<App />);
    
    // Check if the basic structure is rendered
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });
}); 