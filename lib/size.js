'use strict';

module.exports = function getSize(size) {
  let suffix = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB', 'DB', 'NB'];
  let i = 0;

  while (size >= 1000) {
    size /= 1024;
    i++;
  }

  if (i >= suffix.length) {
    return '...';
  }

  return (i === 0 ? size : size.toFixed(2)) + ' ' + suffix[i];
};
