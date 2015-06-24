var through = require('through2'),
  gutil = require('gulp-util'),
  path = require('path'),
  md5Path = require('md5-image-path'),
  chalk = require('chalk');

module.exports = function() {

  return through.obj(function(file, enc, cb) {

    if (file.isStream()) {
      this.emit('error', new gutil.PluginError('gulp-debug', 'Streaming not supported'));
      return cb();
    }

    if(!file.contents){
      return cb();
    }

    console.log(file.oldPath+"  ==>  "+chalk.underline.gray(file.path));

    this.push(file);

  });
}