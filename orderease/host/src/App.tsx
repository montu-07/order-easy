import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ErrorBoundary from './components/ErrorBoundary';

const RemoteLogin = React.lazy(() => import('auth/Login'));
const RemoteSignup = React.lazy(() => import('auth/Signup'));

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route
            path="login"
            element={
              <ErrorBoundary>
                <Suspense fallback={<div className="flex justify-center items-center h-32 text-gray-600">Loading Login...</div>}>
                  <RemoteLogin />
                </Suspense>
              </ErrorBoundary>
            }
          />
          <Route
            path="signup"
            element={
              <ErrorBoundary>
                <Suspense fallback={<div className="flex justify-center items-center h-32 text-gray-600">Loading Signup...</div>}>
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
  );
}

export default App;