const REG_EXP_RE = /^\/(.+)\/(i)?$/;
let filterList;

const toRegExp = (regExp) => {
  regExp = REG_EXP_RE.test(regExp);
  try {
    regExp = regExp && new RegExp(RegExp.$1, RegExp.$2);
  } catch (e) {
    regExp = null;
  }
  return regExp;
};

exports.update = function(text) {
  text = typeof text === 'string' ? text.trim() : '';
  if (!text) {
    filterList = null;
    return;
  }
  text = text.substring(0, 3072).split(/\r\n|\r|\n/);
  text.forEach((str) => {
    const not = str[0] === '!';
    if (not) {
      str = str.substring(1);
    }
    str = str.trim();
    if (!str) {
      return;
    }
    const pattern = toRegExp(str);
    filterList = filterList || [];
    filterList.push({ not, pattern, str });
  });
};

exports.check = function(url) {
  if (!filterList) {
    return true;
  }
  if (!url || typeof url !== 'string') {
    return false;
  }
  for (let i = 0, len = filterList.length; i < len; i++) {
    const { not, pattern, str } = filterList[i];
    const result = pattern ? pattern.test(url) : url.indexOf(str) !== -1;
    if (not ? !result : result) {
      return true;
    }
  }
};
