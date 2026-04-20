import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-3">OrderEase Auth Remote</h1>
        <p className="text-slate-600">
          This app is running as a remote microfrontend.
        </p>
        <p className="text-slate-500 text-sm mt-2">
          Use the host app on port 3000 to access login and signup.
        </p>
      </div>
    </div>
  </React.StrictMode>
);