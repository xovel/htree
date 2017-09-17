# htree

The same as `tree` in Linux/Windows, htree is for node.js.

> A file tree for node.js

## Install

```shell
npm install htree
```

> Use `-g` or `--global` to install htree as a global CLI util.

```shell
npm install htree -g
```

## Usage

### Integration

```js
const htree = require('htree');
const data = htree({
  // ...
});
console.log(data);
```

### CLI

```shell
htree [options]
```

#### Example

```shell
htree --size
htree -i=node_modules
htree -i node_modules,.git --output file.txt
htree --dir E:\\git\\xovel\\sinput --size --pad-length 20 -i node_modules --order back
htree -i node_modules --no-dot --no-underline --size
```

**WARNING**: Do not try to use `htree` in the root disk of `windows` operation system.

> `Documents and Settings` and `System Volume Information` etc will block the access authority, yet I don't have a plan to fix this problem. ~~Although ignoring them or using `try/catch` synax both is good solution.~~

## Options

```js
htree.defaults = {
  ignore: [],
  maxDepth: 5,
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
  order: true,
  showDir: true,
  dot: false,
  underline: true
};
```

### ignore

- type: array
- default: []

Ignore list, if the name of directory or file is in the ignore list, ignore it.

### maxDepth

- type: integer
- default: 5

The max depth for the direcory to access.

> If a file path is `a\b\c\d\e\foo.txt` and `maxDepth` is 5, it will be not accessed.

If you want to access all files, set this to a very large value, e.g. 99999999.

### strNode

- type: string
- default: '├'

Indicate the directory is a `node`.

### strLast

- type: string
- default: '└'

Indicate the directory or file is the `last` one.

### strPipe

- type: string
- default: '│'

`strPipe` is used as a prefix when the depth is more than 1.

> Note: `strNode`/`strLast`/`strPipe` should be set the same width.

### strConcat

- type: string
- default: '─'

The concatenate string for `strNode`/`strLast` and the name of the directory or file.

### strGap

- type: string
- default: ''

The gap string between `strConcat` and the name of the directory or file.

### strIndent

- type: string
- default: ' '

The indent string for the children of a directory.

### strComment

- type: string
- default: ''

The comment string for each line. When setted, htree will calculate the max length of all lines and pad the end by `padLength`, then concat the `strComment`.

> If options `size` is true and `strComment` is not setted, set `strComment` to `#` automatically.

### padLength

- type: integer
- default: 10

The pad-end length for `strComment`. Simillar to `padEnd` in `ES8`.

### dir

- type: string
- default: `process.cwd()`

The entrance directory for htree. If `dir` does not contain the character `:`, it will be considered as a relative path to `cwd`.

> `cwd` = `current work directory`

### folder

- type: boolean
- default: `false`

Whether **only** deal with directory, when `folder` is true, the performance of htree will be just the same as `tree` in `windows`.

### sort

- type: boolean
- default: `false`

Sort the file list by default. ~~Mostly, it is a redundant option~~.

### size

- type: boolean
- default: `false`

Show file's size in the end of each line.

### order

- type: boolean
- default: `true`

When `order` is **true**, file will be listed before directory.

When `order` is `back`, file will be listed after directory.

When `order` is **false**, the order of file and directory will not changed.

### showDir

- type: boolean
- default: `true`

Whether to show the `dir` in result.

### dot

- type: boolean
- default: `false`

If the name of a directory begins with character `.`, **ignore** the directory while `dot` is false.

### underline

- type: boolean
- default: `true`

If the name of a directory begins with character `_`, **ignore** the directory while `underline` is false.

## CLI options

Options above can all be specified by `kebab-case` and a prefix `--`.

> `kebab-case`, every character's case is lower case, use a hyphen to combine words.

See [help](docs/help) for more information.

Additional notes:

> Short command is the command which uses only a single character after `-`.

- Supported short commands:
  - `-v`, `--version`
  - `-h`, `--help`
  - `-o`, `--output`
  - `-s`, `--show-dir`
  - `-f`, `--folder`
  - `-d`, `--dir`
  - `-i`, `--ignore`
  - `-m`, `--max-depth`
- If the value of `--dir` does not contain the character `:`, it will be considered as a relative path to `cwd`.
- `--no-` does not support short command.
- `--str-indent` does not support **empty string**.
- Short command combination **must** be used as `-abc=v`, not `-abc v`.
- While setting `--dir`/`--output`, **Escape** the special characters if the value contains two or more special characters, e.g. `--dir=E:\\foo\\bar`.

## License

MIT

> See [LICENSE](LICENSE) for more information.
