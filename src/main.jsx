import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css'; // if using Tailwind or global styles
// main.jsx or App.jsx
import { library } from '@fortawesome/fontawesome-svg-core';
import { faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

library.add(faInstagram, faYoutube);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
