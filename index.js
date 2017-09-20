const walk = require('./util/walk');
const getTextList = require('./util/getTextList');
const genText = require('./util/genText');

let htree = function (options) {
  options = Object.assign(htree.defaults, options || {});

  let walkList = walk(options.dir, 1, options);
  let textList = getTextList(walkList, options);

  return genText(textList, options);
};

htree.defaults = {
  ignore: [],
  exclude: '',
  maxDepth: 5,
  gap: false,
  concatLength: 1,
  indent: true,
  indentLength: 1,
  suffix: false,
  strSuffix: '/',
  strComment: '',
  padLength: 10,
  dir: process.cwd(),
  folder: false,
  sort: false,
  size: false,
  order: true,
  showDir: true,
  dot: false,
  underline: true
};

module.exports = htree;
