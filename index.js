const walk = require('./util/walk');
const getTextList = require('./util/getTextList');
const genText = require('./util/genText');

let htree = function (options) {
  options = Object.assign(htree.defaults, options || {});

  options.padLength = +options.padLength;
  options.maxDeep = +options.maxDeep;

  let walkList = walk(options.dir, 1, options);
  let textList = getTextList(walkList, options);

  return genText(textList, options);
};

htree.defaults = {
  ignore: [],
  maxDeep: 5,
  strNode: '├',
  strLast: '└',
  strPipe: '│',
  strConcat: '─',
  strGap: '',
  strIndent: ' ',
  strComment: '',
  padLength: 10,
  dir: process.cwd(),
  folder: false,
  sort: false,
  size: false,
  sizeSuffixSpace: true,
  order: true,
  showDir: true
};

module.exports = htree;
