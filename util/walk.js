const fs = require('fs');
const path = require('path');
const sort = require('./sort');
const getSize = require('./getSize');

module.exports = function walk(dir, deep, options) {
  let curList = fs.readdirSync(dir);
  if (options.sort) {
    curList = options.sortCase ? curList.sort(sort) : curList.sort();
  }
  let ret = [];
  let fileList = [];
  curList.forEach((name, index) => {
    if (options.ignore.indexOf(name) === -1 && deep <= options.maxDeep) {
      let curFilePath = path.join(dir, name);
      let curFileStat = fs.statSync(curFilePath);
      if (curFileStat.isDirectory()) {
        ret.push({
          name,
          deep,
          children: walk(curFilePath, deep + 1, options)
        });
      } else if (!options.folder) {
        if (options.order) {
          fileList.push({
            name,
            deep,
            size: options.size ? getSize(curFileStat.size) : ''
          });
        } else {
          ret.push({
            name,
            deep,
            size: options.size ? getSize(curFileStat.size) : ''
          });
        }
      }
    }
  });

  if (options.order) {
    if (options.order === 'back') {
      ret = ret.concat(fileList);
    } else {
      ret = fileList.concat(ret);
    }
  }

  return ret;
};
