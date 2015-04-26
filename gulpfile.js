'use strict'
var gulp = require('gulp');
var sass = require('gulp-sass');
var del = require('del');

var config = {
  sassPath: './assets/scss',
  bowerDir: './bower_components',
  staticDir: './static',
  staticVendorDir: './static/vendor',
  bootstrapAssetsPath: '/bootstrap-sass-official/assets'
}

gulp.task('sass', function() {
  gulp.src(config.sassPath + '/**/*.scss')
    .pipe(sass({
      includePaths: [
        config.bowerDir,
        config.bowerDir + config.bootstrapAssetsPath + '/stylesheets'
      ]
    }))
    .pipe(gulp.dest(config.staticDir + '/css'));
});

gulp.task('dest', function() {
  gulp.src(config.bowerDir + config.bootstrapAssetsPath + '/javascripts/bootstrap/modal.js')
    .pipe(gulp.dest(config.staticVendorDir + '/js'));
});

gulp.task('clean', function(cb) {
  del([config.staticDir + '/css/**/*.css'], cb);
});

gulp.task('default', ['clean', 'dest', 'sass'], function() {
  gulp.watch(config.sassPath + '/**/*.scss', ['sass']);
});
