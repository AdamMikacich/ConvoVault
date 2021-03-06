const debug = require('debug')('config');
const error = require('debug')('error');

const fs = require('fs');
const path = require('path');
const {promisify} = require('util');

const read = promisify(fs.readFile);
const write = promisify(fs.writeFile);

const production = process.env.NODE_ENV === 'production';
const dataPath = path.resolve(__dirname, 'data.json');

class Config {
  constructor() {
    this.data = {
      slack: {
        token: ''
      },
      http: {
        port: production ? 80 : 3000,
        root: 'http://localhost'
      },
      db: {
        dialect: 'mysql',
        name: 'convovault',
        user: 'root',
        pass: '',
        host: '127.0.0.1',
        port: 3306
      },
      storage: {
        endPoint: '127.0.0.1',
        port: 9000,
        useSSL: false,
        accessKey: '',
        secretKey: ''
      }
    };
  }

  async save() {
    const data = JSON.stringify(this.data, null, 2);
    await write(dataPath, data);
  }

  async load() {
    try {
      const data = await read(dataPath);
      this.data = JSON.parse(data);
    } catch (err) {
      this.save();
    }
  }

  async init() {
    await this.load();
    debug('init');
    return;
  }
}

module.exports = new Config();