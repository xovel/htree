'use strict';

const getByteLength = require('./getByteLength');

module.exports = function (list, options) {
  if (options.size) {
    options.comment = options.comment || '#';
  }
  if (options.comment) {
    if (typeof options.comment !== 'string') {
      options.comment = '#';
    }
    let textMaxLen = 0;
    list.forEach(text => {
      let curLen = getByteLength(Array.isArray(text) ? text[0] : text);
      if (textMaxLen < curLen) {
        textMaxLen = curLen;
      }
    });

    list.forEach((text, index) => {
      let size;

      if (Array.isArray(text)) {
        size = text[1];
        text = text[0];
      }

      let ret = text + ' '.repeat(textMaxLen + options.padLength - getByteLength(text)) + options.comment;
      if (size) {
        ret += ' ' + size;
      }
      list[index] = ret;
    });
  }

  if (options.showDir) {
    list.unshift(options.dir);
  }

  return list.join('\n');
};
