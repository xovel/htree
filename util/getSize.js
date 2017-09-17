module.exports = function getSize(size) {
  let suffix = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB', 'DB', 'NB'];
  let i = 0;
  let ret = size;

  while (ret >= 1000) {
    ret /= 1024;
    i++;
  }

  if (i >= suffix.length) {
    // ehhh, it's just a joke.
    return '...';
    // throw new Error('too large');
  }

  return (i === 0 ? ret : ret.toFixed(2)) + ' ' + suffix[i];
};
