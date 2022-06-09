import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'; // bootstrap on ülisuur css-i koodihulk
import 'react-toastify/dist/ReactToastify.css'; // väiksem
import 'leaflet/dist/leaflet.css';
import './index.css'; // enda oma --> alati olla teistest allpool
import './i18n';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);


