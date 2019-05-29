# htree

The same as `tree` in Linux/Windows, htree is for node.js.

> A file tree for node.js

## Install

```shell
npm install htree --global
```

Or

```shell
yarn global add htree
```

## Structure

```
├─ bin
│   └─ htree
├─ docs
│   └─ help
├─ util
│   ├─ genText.js
│   ├─ getByteLength.js
│   ├─ getSize.js
│   ├─ getTextList.js
│   └─ walk.js
├─ .eslintrc.yml
├─ .gitignore
├─ .npmrc
├─ index.js
├─ LICENSE
├─ package.json
└─ README.md
```

## Usage

```shell
htree [options]
```

## Example

```shell
htree --size
htree -i=node_modules
htree -i node_modules --output file.txt
htree --dir E:\\git\\xovel\\sinput --size --pad-length 20 -i node_modules --order after
htree --exclude="node_modules|bower_component" --no-dot --no-underline
```

**WARNING**: Do not try to use `htree` in the root disk of `windows` operation system.

## Options

```js
htree.defaults = {
  ignore: [],
  exclude: /node_modules/,
  maxDepth: 20,
  gap: true,
  concatLength: 1,
  indent: true,
  indentLength: 1,
  suffix: false,
  strSuffix: '/',
  comment: '',
  padLength: 10,
  dir: process.cwd(),
  folder: false,
  sort: false,
  size: false,
  order: 'after',
  showDir: true,
  dot: false,
  underline: true
};
```

### ignore

- type: array
- default: []

Ignore list, if the name of a directory/file is in the ignore list, ignore it.

### exclude

- type: RegExp
- default: `/node_modules/`

Exclude the directory while it's name matches the regular expression.

> Note: use this option only when you know what to do.

### maxDepth

- type: integer
- default: 20

The max depth for the direcory to access.

> If a file path is `a\b\c\d\e\foo.txt` and `maxDepth` is 5, it will be not accessed.

If you want to access all files, set this to a very large value, e.g. 99999999.

### gap

- type: boolean
- default: `true`

Whether use a gap space ` ` before the name of a directory/file.

### concatLength

- type: integer
- default: 1

The repeat times of concat string before a directory/file.

### suffix

- type: boolean
- default: `false`

Whether add a suffix to a directory. The suffix string is specified as `strSuffix`.

### strSuffix

- type: string
- default: '/'

The suffix for direcorty. It is available while `suffix` is true.

### comment

- type: string
- default: ''

The comment string for each line. When it is been set, htree will calculate the max length of all lines and pad the end by `padLength` with a single space, then concat the `comment`.

> If options `size` is true and `comment` is not set, set `comment` to `#` automatically.

### padLength

- type: integer
- default: 10

The pad-end length for `comment`. Simillar to `padEnd` in `ES8`.

### dir

- type: string
- default: `process.cwd()`

The entrance directory for htree. If `dir` does not contain the character `:`, it will be considered as a relative path to `cwd`.

> `cwd` = `current work directory`

### folder

- type: boolean
- default: `false`

Whether **only** show directory, when `folder` is true, the performance of htree will be just the same as `tree` in `windows`.

### sort

- type: boolean
- default: `false`

Sort the file list by default. ~~Mostly, it is a redundant option~~.

### size

- type: boolean
- default: `false`

Show file's size in the end of each line.

### order

- type: boolean|string
- default: `after`

When `order` is **true**, file will be listed **before** directory.

When `order` is `after`, file will be listed **after** directory.

When `order` is **false**, the order of file and directory will not changed.

### showDir

- type: boolean
- default: `true`

Whether show the `dir` in result.

### dot

- type: boolean
- default: `false`

If the name of a directory begins with character `.` and `dot` is **false**, **ignore** the directory.

### underline

- type: boolean
- default: `true`

If the name of a directory begins with character `_` and `underline` is **false**, **ignore** the directory.

### ascii

- type: boolean
- default: `false`

Use ASCII base character `` `|- `` instead of the extend table character `└`, `├`, `│` and `─`.

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
- Short command combination **must** be used as `-abc=v`, not `-abc v`.
- **Escape** the special characters when setting values, especially `--dir`, `--output`, `--exclude`, e.g. `--dir=E:\\foo\\bar`.
- `--exclude` will set a regular expression(ignore case) to `options.exclude`, so ensure its correctness.

## License

MIT

> See [LICENSE](LICENSE) for more information.
