import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import Login from '../pages/Login';

const LoginApp: React.FC = () => {
  return (
    <Provider store={store}>
      <Login />
    </Provider>
  );
};

export default LoginApp;
