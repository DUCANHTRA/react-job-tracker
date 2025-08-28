import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { JobProvider } from './context/JobContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <JobProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </JobProvider>
  </React.StrictMode>
);