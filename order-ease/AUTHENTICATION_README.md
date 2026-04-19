# OrderEase Authentication System

Complete authentication system built with React + Redux Toolkit following your exact specifications.

## Features Implemented

### Core Features
- **Redux Toolkit** state management with async thunks
- **Fetch API** only (no axios)
- **Token storage** in localStorage
- **Role-based redirects** (ADMIN -> /admin, USER -> /)
- **Clean modern UI** with Tailwind-like styling
- **Form validation** and error handling
- **Loading states** and success messages
- **Logout functionality** with state cleanup

### Authentication Flow
1. **Landing Page** - Choose Sign In or Create Account
2. **Signup** - Create new account (name, email, password, role)
3. **Login** - Sign in with email and password
4. **Dashboard** - Role-based home page
5. **Logout** - Clear token and redirect to landing

## Folder Structure

```
src/
  redux/
    store.js          # Redux store configuration
    authSlice.js      # Auth slice with signup/login thunks
  pages/
    Login.jsx         # Login page component
    Signup.jsx        # Signup page component
  App.jsx             # Main app with routing logic
  main.tsx            # Entry point with Redux Provider
  index.css           # Tailwind-like utility classes
```

## API Integration

### Base URL
```
http://localhost:3000/api
```

### Signup API
- **Endpoint**: `POST /auth/signup`
- **Payload**: `{ name, email, password, role }`
- **Response**: `{ success, data: { id, name, email, role }, token }`

### Login API
- **Endpoint**: `POST /auth/login`
- **Payload**: `{ email, password }`
- **Response**: `{ success, data: { id, name, email, role }, token }`

## Installation & Setup

### 1. Install Dependencies
```bash
npm install @reduxjs/toolkit react-redux
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Ensure Backend is Running
Make sure your backend API is running on `http://localhost:3000` with the endpoints:
- `POST /api/auth/signup`
- `POST /api/auth/login`

## Testing Guide

### 1. Test Signup
1. Navigate to the app
2. Click "Create Account"
3. Fill out the form:
   - Name: "Test User"
   - Email: "test@example.com"
   - Password: "password123"
   - Role: "USER" or "ADMIN"
4. Click "Sign Up"
5. Should see success message and redirect

### 2. Test Login
1. Navigate to the app
2. Click "Sign In"
3. Enter credentials:
   - Email: "test@example.com"
   - Password: "password123"
4. Click "Sign in"
5. Should see success message and redirect

### 3. Test Role-based Redirects
- **USER role** -> Redirects to home dashboard
- **ADMIN role** -> Redirects to admin dashboard

### 4. Test Logout
1. Click "Logout" button
2. Should redirect to landing page
3. Token cleared from localStorage

## Redux State Management

### Auth Slice State
```javascript
{
  user: null | { id, name, email, role },
  token: string | null,
  isLoading: boolean,
  success: string | null,
  error: string | null
}
```

### Available Actions
- `signupUser(userData)` - Signup thunk
- `loginUser(credentials)` - Login thunk
- `logout()` - Clear auth state
- `clearError()` - Clear error message
- `clearSuccess()` - Clear success message

## Token Management

### Storage
- Token stored in `localStorage` under key `'token'`
- Automatically loaded on app refresh
- Sent in Authorization header for protected APIs

### Usage
```javascript
// For protected API calls
const response = await fetch(url, {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})
```

## Error Handling

### Network Errors
- Shows "Network error. Please try again."
- Check if backend server is running

### API Errors
- Displays server error messages
- 404 errors show endpoint not found
- 500 errors show server issues

### Form Validation
- Required field validation
- Email format validation
- Real-time error clearing on input

## Styling

### CSS Classes
- Tailwind-like utility classes in `index.css`
- Modern, clean design
- Responsive layout
- Focus states and hover effects

### Color Scheme
- Primary: Blue (`#2563eb`)
- Success: Green (`#16a34a`)
- Error: Red (`#dc2626`)
- Background: Gray (`#f9fafb`)

## Browser Support

### Modern Browsers
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

### Features Used
- ES6+ (async/await, destructuring)
- CSS Grid and Flexbox
- Local Storage API
- Fetch API

## Troubleshooting

### Common Issues

#### 1. "Cannot find module 'react-redux'"
**Solution**: Install dependencies
```bash
npm install @reduxjs/toolkit react-redux
```

#### 2. 404 Error on API calls
**Solution**: Check backend server
- Ensure backend is running on port 3000
- Verify API endpoints exist
- Check CORS configuration

#### 3. Token not persisting
**Solution**: Check localStorage
- Open browser dev tools
- Check Application > Local Storage
- Look for 'token' key

#### 4. Redirect not working
**Solution**: Check user role
- Verify API returns user data with role
- Check Redux state in dev tools
- Ensure role-based logic in useEffect

### Debug Tools

#### Redux DevTools
Install Redux DevTools browser extension to inspect:
- Auth state changes
- Action dispatches
- API call status

#### Browser Console
Check for:
- Network errors
- JavaScript errors
- API response logs

#### Network Tab
Monitor:
- API request URLs
- Request/response payloads
- HTTP status codes

## Security Considerations

### Current Implementation
- Token stored in localStorage (for demo)
- Basic form validation
- No password encryption on frontend

### Production Recommendations
- Use httpOnly cookies for tokens
- Add CSRF protection
- Implement password strength requirements
- Add rate limiting
- Use HTTPS in production

## Next Steps

### Additional Features
- Password reset functionality
- Email verification
- Two-factor authentication
- Social login integration
- Protected routes middleware

### Enhancements
- Form validation library (Yup/Zod)
- UI component library (Material-UI, Ant Design)
- Loading skeletons
- Error boundaries
- Unit tests

## Support

If you encounter issues:
1. Check browser console for errors
2. Verify backend API is running
3. Ensure all dependencies are installed
4. Check Redux DevTools for state issues

---

**Built with**: React, Redux Toolkit, Fetch API, CSS
**Backend Required**: Node.js/Express server with auth endpoints
**Database**: Any (backend handles data persistence)
