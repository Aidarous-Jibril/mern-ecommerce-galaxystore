import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import store from './redux/store.js'
import './index.css';
import './bootstrap.min.css'
import App from './App';

// import { BrowserRouter as Router  } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <Provider store={store}>
            <App />
      </Provider>
);