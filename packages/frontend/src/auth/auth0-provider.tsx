import { Auth0Provider } from '@auth0/auth0-react';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth0Config } from '../config/auth0-config';

type Auth0ProviderWithNavigateProps = {
  children: ReactNode;
};

const Auth0ProviderWithNavigate = ({ children }: Auth0ProviderWithNavigateProps) => {
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

export default Auth0ProviderWithNavigate; 