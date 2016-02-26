var gulp = require('gulp');

var clean = require('gulp-rimraf');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var lessify = require('gulp-less');
var jadeify = require('gulp-jade');
var path = require('path');

//Path variables
var curr = '.';
var dest = './dist';

var publicDir = {
  img: '/public/img/',
  css: '/public/css/',
  js:  '/public/js/',
  views: '/public/views/'
}

//Vendor path var
var bowerDir = cur + '/public/libs/';

//BEFORE File type collected vars
var appFiles = {
  vendor: [bowerDir + 'jquery/dist/*.min.js', bowerDir + '**/*.min.js']
  js:     [publicDir.js + '**/*.js'],
  css:    [bowerDir + '**/*.min.css'],
  less:   ['public/less/*.less'],
  misc:   [cur + '/app/**', cur + '/config/**'],
  server: ['./server.js'],
  jade:   [!baseDirs.app + 'public/index.jade', baseDirs.app + 'public/views/**/*.jade']
};

// TASKS ========================================================================

gulp.task('clean', function(){
  return gulp.src(dest + '/', {read: false}).pipe(clean());
});

gulp.task('copy', function(){
  return gulp.src(appFiles).pipe(gulp.dest(dest + '/'));
})

