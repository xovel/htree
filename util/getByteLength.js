'use strict';

module.exports = function (str) {
  return str.replace(/[\u4e00-\u9fa5]|[【】（）［］｛｝《》：；，。！？￥]/g, '  ').length;
};
