module.exports = function genText(list, options, prefix = '') {
  let ret = [];

  for (let i = 0; i < list.length; i++) {
    let item = list[i];
    let curPrefix = '';
    let childPrefix = '';
    let curText = '';

    if (i === list.length - 1) {
      curPrefix = options.strLast;
    } else {
      curPrefix = options.strNode;
    }

    curPrefix = prefix + curPrefix + options.strConcat + options.strGap;
    curText = curPrefix + item.name;

    if (options.size && item.size) {
      curText = [curText, item.size];
    }

    ret.push(curText);
    if (item.children && item.children.length > 0) {
      childPrefix = options.strPipe + ' ' + options.strGap + options.strIndent;
      if (i === list.length - 1) {
        childPrefix = ' '.repeat(childPrefix.length);
      }
      childPrefix = prefix + childPrefix;
      ret = ret.concat(genText(item.children, options, childPrefix));
    }
  }

  return ret;
}
