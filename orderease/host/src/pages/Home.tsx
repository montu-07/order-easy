import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div style={{ padding: '2rem 0' }}>
      <h1>Welcome to OrderEase</h1>
      <p>Your complete solution for easy order management</p>
      
      <div style={{ marginTop: '2rem' }}>
        <h2>Get Started</h2>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
          <Link to="/signup" className="btn btn-secondary">
            Sign Up
          </Link>
        </div>
      </div>

      <div style={{ marginTop: '3rem' }}>
        <h2>Features</h2>
        <ul style={{ lineHeight: '1.8' }}>
          <li>Secure Authentication</li>
          <li>Order Management</li>
          <li>User Dashboard</li>
          <li>Micro Frontend Architecture</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
