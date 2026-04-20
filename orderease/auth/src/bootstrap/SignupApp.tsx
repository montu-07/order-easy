import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import Signup from '../pages/Signup';

const SignupApp: React.FC = () => {
  return (
    <Provider store={store}>
      <Signup />
    </Provider>
  );
};

export default SignupApp;
