var md5path = require('../');
var fs = require('fs');
var should = require('should');
var path = require('path');
var assert = require('stream-assert');
var File = require('gulp-util').File;
var gulp = require('gulp');
var md5 = require('blueimp-md5').md5;

require('mocha');

var thirdBase = __dirname,
    thirdFile = 'third.js',
    thirdPath = path.join(thirdBase, thirdFile);

var filePath, dirName, extName;

describe('gulp-g-md5-path', function() {

  before(function(done){
    fs.writeFile(thirdPath, 'This is a test file.\n', function (){
      filePath = thirdPath;
      dirName = path.dirname(thirdPath);
      extName = path.extname(thirdPath);
      done();
    });
  });

  after(function(done){
    fs.unlink(thirdPath, done);
  })

  describe('md5path()', function() {

    it('should save oldPath', function (done) {
      gulp.src(filePath)
        .pipe(md5path())
        .pipe(assert.first(function (d) { 
          d.oldPath.should.eql(filePath);
        }))
        .pipe(assert.end(done));
    })

    it('should md5 path correctly', function (done) {
      gulp.src(filePath)
        .pipe(md5path())
        .pipe(assert.first(function (d) { 
          path.join(dirName, md5(d.oldPath) + extName).should.eql(d.path);
          console.log(d.path);
        }))
        .pipe(assert.end(done));
    });

  });
});

