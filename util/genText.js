const getByteLength = require('./getByteLength');

module.exports = function (list, options) {
  if (options.size) {
    options.strComment = options.strComment || '#';
  }
  if (options.strComment) {
    let textMaxLen = 0;

    list.forEach((text) => {
      let curLen = getByteLength(options.size ? text.split('/')[0] : text);
      if (textMaxLen < curLen) {
        textMaxLen = curLen;
      }
    });

    list.forEach((text, index) => {
      let temp;
      if (options.size) {
        temp = text.split('/');
      }
      let curText = options.size ? temp[0] : text;
      let ret = curText + ' '.repeat(textMaxLen + options.padLength - getByteLength(curText)) + options.strComment;
      if (options.size && temp[1]) {
        ret += ' ' + temp[1];
      }
      list[index] = ret;
    });
  }

  if (options.showDir) {
    list.unshift(options.dir);
  }

  return list.join('\n');
};
