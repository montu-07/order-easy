import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const MainLayout: React.FC = () => {
  return (
    <div className="App">
      <nav className="navbar">
        <div className="container">
          <div className="navbar-content">
            <Link to="/" className="navbar-brand">
              OrderEase
            </Link>
            <ul className="navbar-nav">
              <li>
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="nav-link">
                  Signup
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="nav-link">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main>
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
