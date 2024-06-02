import React  from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios';

let url = 'http://localhost:5000';

axios.defaults.baseURL = url;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.common['Authorization'] = localStorage.getItem('JWT_PAYLOAD');



ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,

  document.getElementById('root')
);