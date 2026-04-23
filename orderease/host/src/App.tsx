import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ErrorBoundary from './components/ErrorBoundary';
import AuthWatcher from './components/AuthWatcher';

const RemoteLogin = React.lazy(() => import('auth/Login'));
const RemoteSignup = React.lazy(() => import('auth/Signup'));
const RemoteProductPage = React.lazy(() => import('products/ProductPage'));
const RemoteCartPage = React.lazy(() => import('cart/CartPage'));

const ProductPageWithCSS: React.FC = () => {
  const [cssLoaded, setCssLoaded] = React.useState(false);

  React.useEffect(() => {
    // Load remote CSS dynamically by fetching the HTML and extracting CSS link
    const loadRemoteCSS = async () => {
      try {
        console.log('Attempting to fetch products app HTML...');
        // Fetch the products app HTML to find the CSS file
        const response = await fetch('http://localhost:3003');
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        const html = await response.text();
        console.log('Products HTML fetched successfully, length:', html.length);
        
        // Extract CSS file path from HTML - try multiple patterns
        const cssPatterns = [
          /href="\/static\/css\/main\.[a-f0-9]+\.css"/,
          /href="\.\/static\/css\/main\.[a-f0-9]+\.css"/,
          /href="static\/css\/main\.[a-f0-9]+\.css"/
        ];
        
        let cssMatch = null;
        for (const pattern of cssPatterns) {
          cssMatch = html.match(pattern);
          if (cssMatch) {
            console.log('CSS match found with pattern:', pattern);
            break;
          }
        }
        
        if (cssMatch) {
          const cssPath = cssMatch[0].replace('href="', 'http://localhost:3003/').replace('"', '');
          console.log('Extracted CSS path:', cssPath);
          
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.type = 'text/css';
          link.href = cssPath;
          link.onload = () => {
            console.log('CSS loaded successfully');
            setCssLoaded(true);
          };
          link.onerror = (error) => {
            console.error('CSS loading error:', error);
            setCssLoaded(true); // Still show the component even if CSS fails
          };
          document.head.appendChild(link);
        } else {
          console.log('No CSS match found, using fallback');
          // Fallback to default CSS path
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.type = 'text/css';
          link.href = 'http://localhost:3003/static/css/main.css';
          link.onload = () => setCssLoaded(true);
          link.onerror = () => setCssLoaded(true);
          document.head.appendChild(link);
        }
      } catch (error) {
        console.error('Failed to load remote CSS:', error);
        setCssLoaded(true); // Still show the component even if CSS fails
      }
    };

    loadRemoteCSS();

    return () => {
      // Cleanup: remove any added CSS links when the component unmounts
      const links = document.querySelectorAll('link[href*="localhost:3003"]');
      links.forEach(link => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      });
    };
  }, []);

  if (!cssLoaded) {
    return <div className="flex justify-center items-center h-screen text-gray-600">Loading Products...</div>;
  }

  return <RemoteProductPage />;
};

function App() {
  return (
    <div className="App">
      <AuthWatcher />

      <Routes>
        <Route
          path="/login"
          element={
            <ErrorBoundary>
              <Suspense fallback={<div className="flex justify-center items-center h-screen text-gray-600">Loading Login...</div>}>
                <RemoteLogin />
              </Suspense>
            </ErrorBoundary>
          }
        />

        <Route
          path="/signup"
          element={
            <ErrorBoundary>
              <Suspense fallback={<div className="flex justify-center items-center h-screen text-gray-600">Loading Signup...</div>}>
                <RemoteSignup />
              </Suspense>
            </ErrorBoundary>
          }
        />
        <Route
          path="/products"
          element={
            <ErrorBoundary>
              <Suspense fallback={<div className="flex justify-center items-center h-screen text-gray-600">Loading Products...</div>}>
                <ProductPageWithCSS />
              </Suspense>
            </ErrorBoundary>
          }
        />
        <Route
          path="/cart"
          element={
            <ErrorBoundary>
              <Suspense fallback={<div className="flex justify-center items-center h-screen text-gray-600">Loading Cart...</div>}>
                <RemoteCartPage />
              </Suspense>
            </ErrorBoundary>
          }
        />

        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
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