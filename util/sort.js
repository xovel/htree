module.exports = function (a, b) {
  a = (a + '').toLowerCase();
  b = (b + '').toLowerCase();
  if (a > b) {
    return 1;
  } else if (a === b) {
    return 0;
  }
  return -1;
};
