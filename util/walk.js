const fs = require('fs');
const path = require('path');
const getSize = require('./getSize');

module.exports = function walk(dir, deep, options) {
  let curList;
  try {
    curList = fs.readdirSync(dir);
  } catch (e) {
    process.stdout.write(e.toString() + '\n');
    process.exit(0);
  }
  let ret = [];
  let orderList = [];
  let temp;

  if (options.sort) {
    curList.sort();
  }

  function checkDir(name) {
    if (options.exclude && options.exclude.test && options.exclude.test(name)) {
      return false;
    }

    if (name[0] === '.' && !options.dot) {
      return false;
    }

    if (name[0] === '_' && !options.underline) {
      return false;
    }

    return true;
  }

  curList.forEach((name, index) => {
    if (options.ignore.indexOf(name) === -1 && deep <= options.maxDepth) {
      let curFilePath = path.join(dir, name);
      let curFileStat;
      try {
        curFileStat = fs.statSync(curFilePath);
      } catch (e) {
        process.stdout.write(e.toString() + '\n');
        process.exit(0);
      }
      if (curFileStat.isDirectory()) {
        if (checkDir(name)) {
          ret.push({
            name: name + (options.suffix && options.strSuffix ? options.strSuffix : ''),
            deep,
            children: walk(curFilePath, deep + 1, options)
          });
        }
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
    if (options.order === 'after') {
      ret = ret.concat(orderList);
    } else {
      ret = orderList.concat(ret);
    }
  }

  return ret;
};
