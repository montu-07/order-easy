import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={{ padding: '2rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Dashboard</h1>
        <button onClick={handleLogout} className="btn btn-secondary">
          Logout
        </button>
      </div>
      
      <div style={{ backgroundColor: '#f8f9fa', padding: '2rem', borderRadius: '8px' }}>
        <h2>Welcome to your Dashboard!</h2>
        <p>This is a protected route. You can only see this page if you're logged in.</p>
        
        <div style={{ marginTop: '2rem' }}>
          <h3>Quick Actions</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e9ecef' }}>
              <h4>Orders</h4>
              <p>Manage your orders</p>
            </div>
            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e9ecef' }}>
              <h4>Products</h4>
              <p>Browse products</p>
            </div>
            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e9ecef' }}>
              <h4>Settings</h4>
              <p>Account settings</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
