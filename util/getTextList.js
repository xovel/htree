module.exports = function genText(list, options, prefix = '') {
  let ret = [];

  for (let i = 0; i < list.length; i++) {
    let item = list[i];
    let curPrefix = i === list.length - 1 ? '└' : '├';
    let childPrefix = '';
    let curText = '';

    curPrefix = prefix + curPrefix + '─'.repeat(options.concatLength) + (options.gap ? ' ' : '');
    curText = curPrefix + item.name;

    if (options.size && item.size) {
      curText = [curText, item.size];
    }

    ret.push(curText);
    if (item.children && item.children.length > 0) {
      childPrefix = '│' + ' '.repeat(options.concatLength) + (options.gap ? ' ' : '') + (options.indent ? ' '.repeat(options.indentLength) : '');
      if (i === list.length - 1) {
        childPrefix = ' '.repeat(childPrefix.length);
      }
      childPrefix = prefix + childPrefix;
      ret = ret.concat(genText(item.children, options, childPrefix));
    }
  }

  return ret;
}
