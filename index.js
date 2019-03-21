let fs = require('fs');
let path = require('path');

let glob = require('glob');
var statMode = require('stat-mode');
var prettysize = require('prettysize');


/**
 * @param {Array} paths Path or array of paths to iterate over
 * @param {Object} [config] Configuration object
 * @param {Boolean} [config.recurse=false] Recurse into each directory?
 * @param {RegExp} [config.regex] Match files against a regex?
 * @param {Function} [iterator] Function to run on each file found
 * @return {Array} Files found
 */

module.exports = function () {
   var args, config, iterator, paths, results;
   args = Array.prototype.slice.call(arguments);
   paths = args.shift();
   if (!Array.isArray(paths)) {
      paths = [paths];
   }
   config = typeof args[0] === 'object' && Object.keys(args[0]).length ? args.shift() : {};
   if (config.recurse == null) {
      config.recurse = false;
   }
   if (config.match == null) {
      config.match = args[0] instanceof RegExp ? args.shift() : null;
   }
   if (typeof args[0] === 'function') {
      iterator = args.shift();
   }

   results = [];

   for (let trypath of paths) {
      glob.sync(trypath, {
         nonegate: true
      }).forEach(function (file) {
         paths.shift();
         let stat = fs.lstatSync(file); // do not follow symbolic links

         /* doc to "stat"
         from: https://stackoverflow.com/questions/8582105/having-trouble-understanding-how-fs-stat-works

         dev: ID of the device containing the file
         mode: file protection
         nlink: number of hard links to the file
         uid: user ID of the file’s owner.
         gid: group ID of the file’s owner.
         rdev: device ID if the file is a special file.
         blksize: block size for file system I/O.
         ino: File inode number. An inode is a file system data structure that -
         stores information about a file.
         size: file total size in bytes.
         blocks: number of blocks allocated for the file.
         atime: date object representing the file’s last access time.
         mtime: date object representing the file’s last modification time.
         ctime: date object representing the last time the file’s inode was cha
         */

         let type = stat.isFile() ? 'file' : 'directory';
         if (stat.isSymbolicLink()) type = 'link';
         if (stat.isBlockDevice()) type = 'blockDevice';
         if (stat.isCharacterDevice()) type = 'characterDevice';
         if (stat.isSocket()) type = 'socket';
         let extension = '';
         if (type === 'file') {
            extension = path.basename(file).split('.');
            extension = extension[extension.length - 1];
         }

         let mode = new statMode(stat);

         let self = {
            full: file,
            path: path.dirname(file),
            file: path.basename(file),
            name: path.basename(file, path.extname(file)),
            type: type,
            extension: extension,
            size: prettysize(stat.size),
            rights: mode.toString(),
            owner: { ...mode.owner },
            group: { ...mode.group },
            others: { ...mode.others },
            blksize: stat.blksize,
            accessTime: stat.atime,
            modifyTime: stat.mtime, // modified
            changeTime: stat.ctime,
            creationTime: stat.birthtime // created
         };

         if (config.recurse && fs.statSync(self.full).isDirectory()) {
            paths.push(self.full);
         }
         if (config.match && !file.match(config.match)) {
            return;
         }
         if ((config.type === 'file' && !fs.statSync(self.full).isFile()) || (config.type === 'dir' && !fs.statSync(self.full).isDirectory())) {
            return;
         }
         results.push(self);
         if (iterator) {
            return iterator.call(self, self);
         }
      });
   }

   return results;
};
