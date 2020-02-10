import App from './App';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import express from 'express';
import { renderToString } from 'react-dom/server';
import trademarkAPI from './trademark';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();

//Parse requests with URL-encoded payloads.
//Send requests prefixed with "/trademark" to the endpoint that fetches search data
server.use(express.urlencoded({ extended: false }));
server.use('/trademark', trademarkAPI);

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', (req, res) => {
    const context = {};
    const markup = renderToString(
      <StaticRouter context={context} location={req.url}>
        <App />
      </StaticRouter>
    );

    if (context.url) {
      res.redirect(context.url);
    } else {
      res.status(200).send(
        `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <title>trademarkit</title>
        <meta property="og:title" content="trademarkit">
        <meta property="og:description" content="Search for name idea to find out if they're trademarked.">
        <meta property="og:image" content="./tm.png">
        <meta property="og:image:width" content="500" />
        <meta property="og:image:height" content="500" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${
          assets.client.css
            ? `<link rel="stylesheet" href="${assets.client.css}">`
            : ''
        }
        ${
          process.env.NODE_ENV === 'production'
            ? `<script src="${assets.client.js}" defer></script>`
            : `<script src="${assets.client.js}" defer crossorigin></script>`
        }
    </head>
    <body>
        <div id="root">${markup}</div>
    </body>
</html>`
      );
    }
  });

//Catch 404s and forward to error handling endware

// server.use((req, res, next) => {
//   const err = new Error('Not Found')
//   err.status = 404
//   next(err)
// });

// server.use((err, req, res, next) => {
//   res.status(err.status || 500).send(err.message)
// });

export default server;
