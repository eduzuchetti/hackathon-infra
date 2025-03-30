import { Auth0Provider } from '@auth0/auth0-react';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth0Config } from '../config/auth0-config';

// Auth0 domain and client ID should be environment variables in production
const AUTH0_DOMAIN = process.env.REACT_APP_AUTH0_DOMAIN || 'your-auth0-domain.auth0.com';
const AUTH0_CLIENT_ID = process.env.REACT_APP_AUTH0_CLIENT_ID || 'your-auth0-client-id';
const AUTH0_AUDIENCE = process.env.REACT_APP_AUTH0_AUDIENCE || 'https://api.yourdomain.com';

type Auth0ProviderWithNavigateProps = {
  children: ReactNode;
};

export const Auth0ProviderWithNavigate = ({ children }: Auth0ProviderWithNavigateProps) => {
  const navigate = useNavigate();

  const onRedirectCallback = (appState: any) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={auth0Config.domain}
      clientId={auth0Config.clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: auth0Config.audience,
        scope: 'openid profile email'
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
}; 