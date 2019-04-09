import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import fs from 'fs';
import path from 'path';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import express from 'express';
import rootReducer from './src/reducers';
import App from './src/App';

const store = createStore(rootReducer);

function handleRender(req, res) {
  // Contains the generated html, as well as the generated css and some
  // rehydration data.
  const context = {};
  const html = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <Provider store={store}>
        <App />
      </Provider>
    </StaticRouter>,
  );

  // Load contents of index.html
  fs.readFile('./index.html', 'utf8', (err, data) => {
    if (err) throw err;

    // Inserts the rendered React HTML into our main div
    const document = data.replace(/<div id="app"><\/div>/, `<div id="app">${html}</div>`);

    // Sends the response back to the client
    res.send(document);
  });
}

const app = express();

// Serve built files with static files middleware
app.use('/public', express.static(path.join(__dirname, 'public')));

// Serve requests with our handleRender function
app.get('*', handleRender);

// Start server
app.listen(3000);
