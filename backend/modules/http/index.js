const debug = require('debug')('http');
const error = require('debug')('error');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const config = require('../config');

class HTTP {
  async init() {
    app.use(bodyParser.json());
    app.use(bodyParser.text());

    // app.use('/', express.static(path.join(__dirname, './../../frontend/dist')));
    
    // app.get('*', (req, res) => {
    //   res.sendFile(path.join(__dirname, './../../frontend/dist/index.html'));
    // });

    app.post('/slack', async (req, res) => {
      res.status(200).send();

      const request = req.body;
      debug(request);
    });

    const port = config.data.http.port;
    app.listen(port, () => {
      debug('listening on port', port);
    })

    debug('init');
    return;
  }
}

module.exports = new HTTP();