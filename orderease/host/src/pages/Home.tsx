import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to OrderEase</h1>
      <p className="text-lg text-gray-600 mb-8">Your complete solution for easy order management</p>
      
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Get Started</h2>
        <div className="flex gap-4 mt-4">
          <Link 
            to="/login" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Login
          </Link>
          <Link 
            to="/signup" 
            className="bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Features</h2>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-center">
            <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
            Secure Authentication
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
            Order Management
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
            User Dashboard
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
            Micro Frontend Architecture
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
