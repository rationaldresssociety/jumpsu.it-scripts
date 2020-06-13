'use strict';

var del = require('del');
var gulp = require('gulp');
var runSequence = require('run-sequence');
var babel = require('gulp-babel');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');

// Gulp task to minify JavaScript files
gulp.task('scripts', function() {
    return gulp.src(
        [
            'node_modules/babel-polyfill/dist/polyfill.js',
            './src/js/**/*.js'
        ])
        .pipe(browserify())
        .pipe(babel({presets: ['es2015']}))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'))
});

// Clean output directory
gulp.task('clean', () => del(['dist']));

// Gulp task to minify all files
gulp.task('default', ['clean'], function () {
  runSequence(
    'scripts'
  );
});