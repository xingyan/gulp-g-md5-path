var through = require('through2'),
  gutil = require('gulp-util'),
  path = require('path'),
  md5Path = require('md5-image-path');


module.exports = function(opts) {

  return through.obj(function(file, enc, cb) {

    if (file.isStream()) {
      this.emit('error', new gutil.PluginError('gulp-debug', 'Streaming not supported'));
      return cb();
    }

    if(!file.contents){
      return cb();
    }
    var filePath = (opts && opts.basedir) ? path.relative(opts.basedir, file.path) : file.path;
    var dirName = path.dirname(file.path),
      extName = path.extname(file.path),
      output = md5Path({
        files: filePath
      });

    file.path = (output && output[0] && output[0].md5) ? path.join(dirName, output[0].md5 + extName) : file.path;

    cb(null, file);
  });
}