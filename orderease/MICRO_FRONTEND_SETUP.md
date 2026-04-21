# OrderEase Micro Frontend Setup

Complete micro frontend architecture using Module Federation with React.

## Project Structure

```
orderease/
  host/                 # Host application (port 3000)
  auth/                 # Auth micro frontend (port 3001)
```

## Installation & Setup

### 1. Install Dependencies

#### Host App:
```bash
cd orderease/host
npm install @craco/craco react-router-dom @types/react-router-dom @module-federation/webpack
```

#### Auth App:
```bash
cd orderease/auth
npm install @craco/craco react-router-dom @types/react-router-dom @reduxjs/toolkit react-redux @module-federation/webpack
```

### 2. Run Applications

#### Start Auth App (Remote):
```bash
cd orderease/auth
npm start
# Runs on http://localhost:3001
```

#### Start Host App:
```bash
cd orderease/host
npm start
# Runs on http://localhost:3000
```

## Architecture Overview

### Host App Responsibilities:
- **Routing**: Main application routing
- **Layout**: Navigation and layout components
- **Protected Routes**: Token-based route protection
- **Remote Loading**: Load auth components from remote
- **State Management**: Basic app state

### Auth App Responsibilities:
- **Authentication**: Login/signup forms
- **Redux Store**: Auth state management
- **API Integration**: Backend communication
- **Token Management**: Local storage handling
- **Remote Exports**: Expose Login/Signup components

## Key Files

### Host App Files:
- `craco.config.js` - Module Federation configuration
- `src/App.tsx` - Main app with routing
- `src/components/MainLayout.tsx` - Layout component
- `src/components/ProtectedRoute.tsx` - Route protection
- `src/pages/Home.tsx` - Home page
- `src/pages/Dashboard.tsx` - Protected dashboard

### Auth App Files:
- `craco.config.js` - Module Federation configuration
- `src/App.tsx` - Auth app entry point
- `src/redux/store.ts` - Redux store
- `src/redux/authSlice.ts` - Auth state management
- `src/pages/Login.tsx` - Login component
- `src/pages/Signup.tsx` - Signup component

## Module Federation Configuration

### Host Config:
```javascript
remotes: {
  auth: 'auth@http://localhost:3001/remoteEntry.js',
}
```

### Auth Config:
```javascript
exposes: {
  './Login': './src/pages/Login',
  './Signup': './src/pages/Signup',
}
```

## Remote Component Loading

The host app loads remote components using React.lazy:

```javascript
const RemoteLogin = React.lazy(() => import('auth/Login'));
const RemoteSignup = React.lazy(() => import('auth/Signup'));
```

## Protected Routes

Protected routes check for localStorage token:

```javascript
const token = localStorage.getItem('token');
if (!token) {
  return <Navigate to="/login" replace />;
}
```

## API Integration

Auth app communicates with backend at `http://localhost:4000`:

- **Login**: `POST /auth/login`
- **Signup**: `POST /auth/signup`

## Development Workflow

1. **Start Auth App First**: The remote must be running before host
2. **Start Host App**: Will load remote components from auth app
3. **Test Navigation**: Navigate between host and remote components
4. **Test Auth**: Login/signup functionality
5. **Test Protected Routes**: Access dashboard with/without token

## Common Issues & Solutions

### 1. Remote Not Loading
- Ensure auth app is running on port 3001
- Check browser console for network errors
- Verify `remoteEntry.js` is accessible

### 2. Duplicate React Instances
- Shared dependencies configured as singletons
- Check craco.config.js in both apps

### 3. CORS Issues
- Configure backend to allow both ports 3000 and 3001
- Check CORS_ORIGIN in backend configuration

### 4. Route Conflicts
- Host handles main routing
- Remote components handle internal navigation
- Use relative navigation in remote components

## Benefits of This Architecture

1. **Independent Development**: Teams can work on auth separately
2. **Technology Flexibility**: Different tech stacks possible
3. **Isolated Deployments**: Deploy auth independently
4. **Code Sharing**: Shared dependencies reduce bundle size
5. **Lazy Loading**: Components loaded on demand

## Next Steps

1. **Add More Micro Frontends**: Products, Orders, etc.
2. **Shared Components**: Common UI components
3. **State Management**: Cross-app state sharing
4. **Error Boundaries**: Better error handling
5. **Performance Monitoring**: Bundle size optimization

## Testing

1. **Unit Tests**: Test individual components
2. **Integration Tests**: Test host-remote communication
3. **E2E Tests**: Test complete user flows
4. **Performance Tests**: Monitor loading times

## Production Considerations

1. **CDN Deployment**: Deploy remotes to CDN
2. **Version Management**: Handle remote version updates
3. **Fallback UI**: Handle remote loading failures
4. **Security**: Validate remote components
5. **Monitoring**: Track remote component performance
