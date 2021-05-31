import path from 'path';
import fs from 'fs';
// import {Helmet} from 'react-helmet'

import React from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server';

import App from '../src/App';

const PORT = process.env.PORT || 3006;
const app = express();

app.get('/', (_req, res) => {
  const appReactDom = ReactDOMServer.renderToString(<App />);
  const indexFile = path.resolve('./build/index.html');

  // TODO: load page meta data: titles, descriptions ...
  // const helmet = Helmet.renderStatic();
  fs.readFile(indexFile, 'utf8', (err, data) => { // can we cache this ?
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!');
    }
    const preRenderredDom = data.replace('<div id="root"></div>', `<div id="root">${appReactDom}</div>`)
    return res.send(
      preRenderredDom
    );
  });
});

app.use(express.static('./build'));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
