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
  // css
  gulp.src(config.bowerDir + '/pure/pure-min.css')
    .pipe(gulp.dest(config.staticVendorDir + '/css'));
  gulp.src(config.bowerDir + '/fontawesome/css/font-awesome.min.css')
    .pipe(gulp.dest(config.staticVendorDir + '/css'));
  // font
  gulp.src(config.bowerDir + '/fontawesome/fonts/*')
    .pipe(gulp.dest(config.staticVendorDir + '/fonts'));
  // js
  gulp.src(config.bowerDir + '/jquery/dist/jquery.min.js')
    .pipe(gulp.dest(config.staticVendorDir + '/js'));
  gulp.src(config.bowerDir + '/jquery/dist/jquery.min.map')
    .pipe(gulp.dest(config.staticVendorDir + '/js'));
  gulp.src(config.bowerDir + '/knockout/dist/knockout.js')
    .pipe(gulp.dest(config.staticVendorDir + '/js'));
  gulp.src(config.bowerDir + config.bootstrapAssetsPath + '/javascripts/bootstrap/modal.js')
    .pipe(gulp.dest(config.staticVendorDir + '/js'));
});

gulp.task('clean', function() {
  del([config.staticDir + '/css/**/*.css',
       config.staticDir + '/vendor/js/*']);
});

gulp.task('default', ['clean', 'dest', 'sass'], function() {
  gulp.watch(config.sassPath + '/**/*.scss', ['sass']);
});
