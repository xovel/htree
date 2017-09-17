module.exports = function (str) {
  return str.replace(/[\u4e00-\u9fa5]|[【】（）［］｛｝《》：；，。！？￥]/g, '  ').length;
  // return str.replace(/[\u4e00-\u9fa5]|[\u0800-\u4e00]|[\x3130-\x318F]|[\xAC00-\xD7A3]/g, '  ').length;
};
