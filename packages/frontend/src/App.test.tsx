import { render, screen } from '@testing-library/react';
import App from './App';

// Mock the entire auth0-provider module
jest.mock('./auth/auth0-provider', () => 
  ({ children }: { children: React.ReactNode }) => <>{children}</>
);

// Mock components that might cause issues in tests
jest.mock('./pages/Home', () => () => <div data-testid="home-page">Home Page</div>);
jest.mock('./pages/Dashboard', () => () => <div data-testid="dashboard-page">Dashboard Page</div>);
jest.mock('./pages/Login', () => () => <div data-testid="login-page">Login Page</div>);
jest.mock('./pages/About', () => () => <div data-testid="about-page">About Page</div>);
jest.mock('./components/Layout/Navbar', () => () => <nav data-testid="navbar">Navbar</nav>);
jest.mock('./components/Layout/Footer', () => () => <footer data-testid="footer">Footer</footer>);
jest.mock('./auth/protected-route', () => 
  ({ children }: { children: React.ReactNode }) => <>{children}</>
);

describe('App', () => {
  test('renders without crashing', () => {
    render(<App />);
    
    // Check if the basic structure is rendered
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
}); 