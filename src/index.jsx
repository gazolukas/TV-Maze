import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from "react-router-dom";
import configureStore from './store/configureStore';
import App from './App';

const store = configureStore();

hydrate(
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>,
  global.document.querySelector('#app'),
);
