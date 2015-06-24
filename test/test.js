var md5Path = require('../'),
  check = require('./check'),
  gulp = require('gulp');

describe('gulp-g-md5-path', function() {
  describe('#md5Path', function() {
    it('It works!', function() {
      gulp.src('README.md').pipe(md5Path()).pipe(check());
    })
  })
})