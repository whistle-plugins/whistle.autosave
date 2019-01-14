const fs = require('fs');
const getSettings = require('./getSettings');
const { update: updateFilter } = require('../../filter');

const readStat = (dir) => {
  return new Promise((resolve) => {
    fs.stat(dir, (err, stat) => {
      if (err) {
        return resolve({
          ec: 2,
          em: err.code === 'ENOENT' ? '该目录不存在，请手动创建' : '系统异常，请稍后再试',
        });
      }
      if (!stat.isDirectory()) {
        return resolve({
          ec: 3,
          em: '路径非目录',
        });
      }
      resolve();
    });
  });
};

module.exports = async (ctx) => {
  let { sessionsDir, filterText } = ctx.request.body;
  if (typeof sessionsDir !== 'string') {
    sessionsDir = '';
  }
  if (sessionsDir) {
    const result = await readStat(sessionsDir);
    if (result) {
      ctx.body = result;
      return;
    }
  }
  const { localStorage } = ctx.req;
  updateFilter(filterText);
  localStorage.setProperty('sessionsDir', sessionsDir);
  localStorage.setProperty('filterText', typeof filterText === 'string' ? filterText : null);
  getSettings(ctx);
};
