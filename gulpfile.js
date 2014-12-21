var gulp = require('gulp');
var connect = require('gulp-connect');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');
var minifyCSS = require('gulp-minify-css');
var uncss = require('gulp-uncss');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var watch = require('gulp-watch');

var from = {
  img: 'images/**/*.@(png|jpg|gif)',
  css: 'src/css/*.css',
  html: 'src/*.html',
  js: 'src/js/*.js'
};
var to = {
  img: 'images/',
  css: './',
  html: './',
};

gulp.task('jshint', function() {
  gulp.src(from.js)
  .pipe(jshint())
  .pipe(jshint.reporter(stylish));
});

gulp.task('imagemin', function() {
  return gulp.src(from.img)
  .pipe(changed(to.img))
  .pipe(imagemin())
  .pipe(gulp.dest(to.img));
});

gulp.task('connect', function() {
  connect.server();
});

gulp.task('style', ['usemin'], function() {
  return gulp.src(to.css + 'style.css')
  .pipe(uncss({
    html: [to.html + 'index.html']
  }))
  .pipe(gulp.dest(to.css));
});

gulp.task('usemin', function () {
  return gulp.src(from.html)
  .pipe(usemin({
    css: [minifyCSS(), 'concat'],
    html: [minifyHTML({empty: true})],
    js: [uglify(), 'concat']
  }))
  .pipe(gulp.dest('./'));
});

gulp.task('watch', ['default', 'connect'], function() {
  watch(from.img, function() {
    gulp.start('imagemin');
  });
  watch(from.css, function() {
    gulp.start('style');
  });
  watch([from.js, from.html], function() {
    gulp.start('usemin');
  });
});

gulp.task('default', ['jshint', 'imagemin', 'style']);

