const fs = require('fs');
const path = require('path');
const getSize = require('./getSize');

module.exports = function walk(dir, deep, options) {
  let curList = fs.readdirSync(dir);
  let ret = [];
  let orderList = [];
  let temp;

  if (options.sort) {
    curList.sort();
  }

  curList.forEach((name, index) => {
    if (options.ignore.indexOf(name) === -1 && deep <= options.maxDepth) {
      let curFilePath = path.join(dir, name);
      let curFileStat = fs.statSync(curFilePath);
      if (curFileStat.isDirectory()) {
        ret.push({
          name,
          deep,
          children: walk(curFilePath, deep + 1, options)
        });
      } else if (!options.folder) {
        temp = {
          name,
          deep
        };

        if (options.size) {
          temp.size = getSize(curFileStat.size);
        }

        if (options.order) {
          orderList.push(temp);
        } else {
          ret.push(temp);
        }
      }
    }
  });

  if (options.order) {
    if (options.order === 'back') {
      ret = ret.concat(orderList);
    } else {
      ret = orderList.concat(ret);
    }
  }

  return ret;
};
