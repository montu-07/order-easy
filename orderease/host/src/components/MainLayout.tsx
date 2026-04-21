import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-xl font-bold text-white hover:text-blue-200 transition-colors">
              OrderEase
            </Link>
            <ul className="flex space-x-4">
              <li>
                <Link to="/" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Signup
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
