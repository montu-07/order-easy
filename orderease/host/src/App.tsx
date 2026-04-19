import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load remote components
const RemoteLogin = React.lazy(() => import('auth/Login'));
const RemoteSignup = React.lazy(() => import('auth/Signup'));

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route
              path="login"
              element={
                <ErrorBoundary>
                  <Suspense fallback={<div>Loading Login...</div>}>
                    <RemoteLogin />
                  </Suspense>
                </ErrorBoundary>
              }
            />
            <Route
              path="signup"
              element={
                <ErrorBoundary>
                  <Suspense fallback={<div>Loading Signup...</div>}>
                    <RemoteSignup />
                  </Suspense>
                </ErrorBoundary>
              }
            />
            <Route
              path="dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
