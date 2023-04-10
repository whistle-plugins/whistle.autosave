const fs = require('fs');
const path = require('path');
const { check: checkFilter, update: updateFilter } = require('./filter');

const MAX_LENGTH = 10;
const noop = () => {};
let index = 0;
const getIndex = () => {
  if (index > 999) {
    index = 0;
  }
  return index++;
};

module.exports = (server, { storage, config }) => {
  let sessions = [];
  let timer;
  const username = config.username ? `${encodeURIComponent(config.username)}_` : '';
  const writeSessions = (dir) => {
    try {
      const text = JSON.stringify(sessions.slice(), null, '  ');
      sessions = [];
      dir = path.resolve(dir, `${username}${Date.now()}_${getIndex()}.txt`);
      fs.writeFile(dir, text, (err) => {
        if (err) {
          fs.writeFile(dir, text, noop);
        }
      });
    } catch (e) {}
  };
  updateFilter(storage.getProperty('filterText'));
  server.on('request', (req) => {
    // filter
    const active = storage.getProperty('active');
    if (!active) {
      return;
    }
    const dir = storage.getProperty('sessionsDir');
    if (!dir || typeof dir !== 'string') {
      sessions = [];
      return;
    }
    if (!checkFilter(req.originalReq.url)) {
      return;
    }
    req.getSession((s) => {
      if (!s) {
        return;
      }
      clearTimeout(timer);
      sessions.push(s);
      if (sessions.length >= MAX_LENGTH) {
        writeSessions(dir);
      } else {
        // 10秒之内没满10条强制写入
        timer = setTimeout(() => writeSessions(dir), 10000);
      }
    });
  });
};
