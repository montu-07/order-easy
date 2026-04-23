import React from 'react';
import ProductPage from './pages/ProductPage';
import { Provider } from 'react-redux';
import store from 'host/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <ProductPage />
      </div>
    </Provider>
  );
};

export default App;
