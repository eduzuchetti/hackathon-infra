# Frontend Application

This is the frontend of our hackathon infrastructure application. It's built with:

- React 18
- TypeScript 5.4.5+ (Latest)
- Webpack 5
- React Router
- Material UI
- Styled Components
- Auth0 Authentication

## Development

### Prerequisites

- Node.js 22 LTS
- npm 10+
- Auth0 account (for authentication)

### Auth0 Configuration

1. Create a free account on [Auth0](https://auth0.com/)
2. Create a new Single Page Application for each environment (dev, staging, prod)
3. Configure the following settings in your Auth0 applications:
   - Allowed Callback URLs: Your app URLs (e.g., `http://localhost:3000`, `https://app.yourdomain.com`)
   - Allowed Logout URLs: Your app URLs
   - Allowed Web Origins: Your app URLs

4. Update the Auth0 configurations in `scripts/update-auth0-config.js`:
   ```javascript
   const configurations = {
     dev: {
       domain: 'dev-hackathon.auth0.com',
       clientId: 'your-dev-client-id',
       audience: 'https://api-dev.yourdomain.com',
     },
     staging: {
       domain: 'staging-hackathon.auth0.com',
       clientId: 'your-staging-client-id',
       audience: 'https://api-staging.yourdomain.com',
     },
     prod: {
       domain: 'hackathon.auth0.com',
       clientId: 'your-prod-client-id',
       audience: 'https://api.yourdomain.com',
     },
   };
   ```

5. Generate the environment-specific Auth0 configuration:
   ```bash
   # For development
   npm run auth0:dev
   
   # For staging
   npm run auth0:staging
   
   # For production
   npm run auth0:prod
   ```

### Getting Started

1. Install the correct Node.js version:
   ```bash
   # Using nvm (recommended)
   nvm use
   
   # Or install Node.js 22 LTS manually
   # from https://nodejs.org/
   ```

2. Install dependencies:
   ```bash
   # Option 1: Using the script (recommended)
   ./clean-install.sh
   
   # Option 2: Using npm directly
   npm install
   
   # Option 3: Using npm scripts
   npm run reinstall
   ```

3. Generate the Auth0 configuration for development:
   ```bash
   npm run auth0:dev
   ```

4. Start the development server:
   ```bash
   npm start
   ```

This will start the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Available Scripts

- `npm start` - Runs the app in development mode with webpack-dev-server
- `npm run dev:watch` - Runs the development server with nodemon for auto-reloading on file changes
- `npm test` - Launches the Jest test runner
- `npm run test:ci` - Runs tests in CI mode (non-interactive, with flags for CI environments)
- `npm run test:watch` - Runs tests in watch mode for development
- `npm run build` - Builds the app for production using webpack
- `npm run build:dev` - Generates dev Auth0 config and builds for production
- `npm run build:staging` - Generates staging Auth0 config and builds for production 
- `npm run build:prod` - Generates production Auth0 config and builds for production
- `npm run clean` - Removes node_modules, package-lock.json, and build directories
- `npm run reinstall` - Cleans and reinstalls dependencies
- `npm run dev` - Alias for npm start
- `npm run auth0:dev` - Generates Auth0 config for development environment
- `npm run auth0:staging` - Generates Auth0 config for staging environment
- `npm run auth0:prod` - Generates Auth0 config for production environment

## Testing

The application uses Jest and React Testing Library for unit and integration tests. The test setup includes:

- Jest for test running and assertions
- React Testing Library for component testing
- JSDOM for browser environment simulation
- Mocks for Auth0 and styled-components

### Running Tests

```bash
# Run tests once
npm test

# Run tests in watch mode (good for development)
npm run test:watch

# Run tests in CI mode
npm run test:ci
```

### Test Organization

- Unit tests are usually placed alongside the files they test (`Component.test.tsx` next to `Component.tsx`)
- Mocks are stored in `src/__mocks__/`
- Test setup is in `src/setupTests.ts`

### CI Integration

The CI pipeline runs tests as a separate job before building and deploying. Tests must pass before the build step begins.

## Testing Error Pages

The application includes custom 403 (Forbidden) and 404 (Not Found) error pages to improve user experience. To test these pages locally:

```bash
npm run test-error-pages
```

This will start a test server on port 3030 that allows you to view and test both error pages:
- http://localhost:3030/403 - Forbidden error page
- http://localhost:3030/404 - Not Found error page

The error pages are designed to be:
1. Standalone HTML files that don't require JavaScript to function
2. Compatible with CloudFront error page configuration
3. Styled consistently with the application's design system

These error pages are automatically included in the build output when you run `npm run build`.

## CloudFront Deployment

This application is designed to be deployed to AWS CloudFront as a static website. The Auth0 configuration is stored in a static file (`src/config/auth0-config.ts`) rather than using environment variables, as CloudFront only serves static files.

For different environments (development, staging, production), you can use the environment-specific build scripts:

```bash
# Build for dev environment
npm run build:dev

# Build for staging environment
npm run build:staging

# Build for production environment
npm run build:prod
```

Each script will:
1. Generate the appropriate Auth0 configuration for the target environment
2. Build the application with webpack in production mode
3. The built files will be in the `build` directory, ready for deployment to S3/CloudFront

**Note:** Since the Auth0 configuration is baked into the build, you need a separate build for each environment.

## CloudFront Error Page Configuration

To configure CloudFront to serve custom error pages:

1. Go to the AWS CloudFront console and select your distribution
2. Navigate to the "Error Pages" tab
3. Click "Create custom error response"
4. Configure each error type:

   For 403 errors:
   - HTTP Error Code: 403
   - Error Caching Minimum TTL: 60 seconds
   - Customize Error Response: Yes
   - Response Page Path: `/403.html`
   - HTTP Response Code: 403

   For 404 errors:
   - HTTP Error Code: 404
   - Error Caching Minimum TTL: 60 seconds
   - Customize Error Response: Yes
   - Response Page Path: `/404.html`
   - HTTP Response Code: 404

5. For 403 access denied errors, ensure your bucket policy and CloudFront origin access identity are properly configured
6. Deploy the application with the `npm run build` command to include the error pages in the build output
7. After updating the CloudFront configuration, wait for the distribution to deploy (Status: Deployed)

These settings ensure that users will see the custom error pages whenever they encounter access denied (403) or page not found (404) errors.

## Custom Webpack Setup

This project uses a custom webpack configuration instead of react-scripts. This provides several benefits:

1. **Full TypeScript Support**: Compatible with TypeScript 5.4.5+ without version limitations
2. **Customizable Configuration**: Full control over webpack, babel, and other build tools
3. **Optimized Builds**: Custom-tailored build process for better performance
4. **Modern Features**: Support for the latest ES features and optimizations

The build tooling includes:
- Webpack 5 with webpack-dev-server
- Babel with preset-env, preset-react, and preset-typescript
- PostCSS with autoprefixer and preset-env
- Jest for testing with JSDOM environment

## Node.js 22 LTS Compatibility

This project is optimized for Node.js 22 LTS with the following enhancements:

- ES2020+ target for broad browser support
- Custom Babel configuration for modern JS features
- Full TypeScript 5.3+ support

## Project Structure

```
src/
├── assets/       # Static assets like images, fonts, etc.
├── components/   # Reusable UI components
├── pages/        # Page components corresponding to routes
├── styles/       # Global styles and theme definitions
├── App.tsx       # Main application component
└── index.tsx     # Application entry point
```

## Contributing

Please follow the established code style when contributing to this project. Make sure all tests pass before submitting a pull request.

## Material UI Implementation

This project uses Material UI for its component library, providing a consistent and polished user interface. The implementation includes:

### Theme Configuration

- A shared color system between Material UI and styled-components
- Custom MUI theme with overridden components
- Responsive design breakpoints matching MUI's system

### Component Structure

The UI components are organized in the following way:

- `/components/UI`: Core UI components that wrap and extend Material UI
- `/components/Layout`: Layout components like Navbar, Footer, etc.
- `/pages`: Page-level components that use the UI components

### Using Material UI with Styled Components

The project demonstrates two approaches to styling:

1. **Direct MUI usage**: Using MUI components with the `sx` prop
   ```jsx
   <Box sx={{ p: 2, display: 'flex' }}>Content</Box>
   ```

2. **Extending with styled-components**: For more customized components
   ```jsx
   const StyledButton = styled(Button)`
     text-transform: none;
     box-shadow: ${({ theme }) => theme.shadows.sm};
   `;
   ```

### Available Components

The project includes customized versions of commonly used Material UI components:

- `Button`: Extended MUI Button with consistent styling
- `Card`: Configurable card component with title, image, and action support
- `Layout components`: AppBar, Drawer, and responsive navigation 