'use strict'
var gulp = require('gulp');
var sass = require('gulp-sass');
var del = require('del');

var config = {
  sassPath: './assets/scss',
  bowerDir: './bower_components',
  staticCssDir: './static/css',
}

gulp.task('sass', function() {
  gulp.src(config.sassPath + '/**/*.scss')
      .pipe(sass({
        includePaths: [config.bowerDir]
      }))
      .pipe(gulp.dest(config.staticCssDir));
});

gulp.task('clean', function(cb) {
  del([config.staticCssDir + '/**/*.css'], cb);
});

gulp.task('default', ['clean', 'sass'], function() {
  gulp.watch(config.sassPath + '/**/*.scss', ['sass']);
});
