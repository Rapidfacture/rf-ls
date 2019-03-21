let ls = require('./index.js');
let blue = '\x1b[34m',
   // green = '\x1b[32m',
   // yellow = '\x1b[33m',
   // red = '\x1b[31m',
   black = '\x1b[0m';
let dirPath = 'test/sample/*';


log('\n \n test ls(dirPath) \n');
console.log(ls(dirPath));


log('\n \n test ls(dirPath, parserFunc) \n');
ls(
   dirPath,
   function (file) { console.log(`${file.name} is in ${file.path} and is ${file.size}`); }
);

log('\n \n test ls(dirPath, opts: recursive, parserFunc) \n');
ls(
   dirPath,
   { recurse: true },
   function (file) { console.log(`${file.name} is in ${file.path} and is ${file.size}`); }
);

log('\n \n test ls(dirPath, regex, parserFunc) \n');
ls(
   dirPath,
   /jpg/,
   function (file) { console.log(`${file.name} is in ${file.path} and is ${file.size}`); }
);


function log (msg) {
   console.log(blue, msg, black);
}
