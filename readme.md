List file and directory information similar to the linux command `ls` in with node in an easy to use format.

## Installation

> npm i rf-ls

## Usage

```js
let ls = require('rf-ls');

console.log(ls('test/sample/*'));
// this gives the following output:

[{
  full: 'test/sample/logo_orange.png',
  path: 'test/sample',
  file: 'logo_orange.png',
  name: 'logo_orange',
  type: 'file',
  extension: 'png',
  size: '16.5 kB',
  rights: '-rw-r--r--',
  owner: { read: true, write: true, execute: false },
  group: { read: true, write: false, execute: false },
  others: { read: true, write: false, execute: false },
  blksize: 4096,
  accessTime: '2019-03-21T10:33:09.622Z',
  modifyTime: '2019-02-21T15:49:57.000Z',
  changeTime: '2019-03-21T10:33:09.618Z',
  creationTime: '2019-03-21T10:33:09.618Z'
},{
  full: 'test/sample/logo_orange.svg',
  path: 'test/sample',
  file: 'logo_orange.svg',
  name: 'logo_orange',
  type: 'file',
  extension: 'svg',
  size: '1.2 kB',
  rights: '-rw-r--r--',
  owner: { read: true, write: true, execute: false },
  group: { read: true, write: false, execute: false },
  others: { read: true, write: false, execute: false },
  blksize: 4096,
  accessTime: '2019-03-21T10:33:09.810Z',
  modifyTime: '2019-02-21T15:49:58.000Z',
  changeTime: '2019-03-21T10:33:09.618Z',
  creationTime: '2019-03-21T10:33:09.618Z'
}]


```



## ToDo

NOTE: The module is forked from npm package "ls" which had following arguments - currently only the "path" is working.
Please help to fix this. Further wished options: Move recursiv through folders, select only certain filetypes with rgex.
Also some tests would be nice

from the 'ls' Readme:

The only required argument is the initial path, the rest can be omitted.

    ls([path/s], {config}, /file regex/, iteratorFunction)

Each file produces an object with the following parameters:

* full: The path and file (/foo/bar/baz.jpg)
* path: The path to the file (/foo/bar/)
* file: The file (baz.jpg)
* name: The file without an extension (baz)

* recurse: Should we recurse into directories? (Boolean, default is false)
* type: What kind of files should we return? ('all', 'dir', 'file', default is 'all')

The /regex/ will only return matching files. All directories will still be recursed.

The iterator function is mostly a style preference, but can be handy if you need to throw an error and stop traversal.

## Testing

> node test.js

This will log the output to your console.


## License
This is module is a fork of the module 'ls' https://github.com/awnist/ls/blob/master/README.md
It is licensed under the same terms: [UNLICENSED](http://unlicense.org/). Do whatever you want with it.
