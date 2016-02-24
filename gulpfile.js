'use strict';
const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync');
const nodemon = require('gulp-nodemon');
const markdown = require('./config/markdownGulp');
const uglify = require('gulp-uglify');

const paths = {
  jsSrc   : './src/js/**/*.js',
  jsBuild : './public//js',
  readme  : 'README.md',
  mdView  : './public/views/odReadme.html'
};


gulp.task('browser-sync', ['nodemon'], () => {
	browserSync.init(null, {
        injectChanges: true,
		proxy: {
            target: "localhost:2000",
            ws: true
        },
        files: ["./public/**/*.*"],
        browser: "google chrome",
        port: 2001,
        reloadDelay: 500
	});
});

gulp.task('nodemon', (cb) => {
	var started = false;
	return nodemon({
		script: 'server.js',
        ignore: ["public/**/*.*", '/gulpfile.js', "src/**/*.*"]
	}).on('start',  () =>{
		// to avoid nodemon being started multiple times
		if (!started) {
			cb();
			started = true; 
		} 
	});
});	

gulp.task('javascript',()=>{
    console.log("javascript")
    markdown(paths.readme, paths.mdView)
    browserSync.reload()
    return gulp.src(paths.jsSrc)
        .pipe(plumber())
        .pipe(babel({
            presets: ['es2015']
        }))
        // .pipe(uglify()) // temporarily disable 
        // .pipe(concat('velociti.js'))
        .pipe(gulp.dest(paths.jsBuild));
});

gulp.task('markdown',()=>{
    console.log("markdown")
    markdown(paths.readme, paths.mdView)
    browserSync.reload()
});

gulp.task('watch', () => {
  gulp.watch(paths.jsSrc, ['javascript']);
  gulp.watch(paths.readme, ['markdown']);
});



var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
var browserify = require('browserify');
var watchify = require('watchify');
var sourcemaps = require('gulp-sourcemaps');

var production = process.env.NODE_ENV === 'production';

var dependencies = [
  'alt',
  'react',
  'react-dom',
  'react-router',
  'underscore'
];

gulp.task('vendor', function() {
  return gulp.src([
    'bower_components/jquery/dist/jquery.js',
    'bower_components/bootstrap/dist/js/bootstrap.js',
    'bower_components/magnific-popup/dist/jquery.magnific-popup.js',
    'bower_components/toastr/toastr.js'
  ]).pipe(concat('vendor.js'))
    .pipe(gulpif(production, uglify({ mangle: false })))
    .pipe(gulp.dest('public/react/js'));
});

gulp.task('browserify-vendor', function() {
  return browserify()
    .require(dependencies)
    .bundle()
    .pipe(source('vendor.bundle.js'))
    .pipe(buffer())
    .pipe(gulpif(production, uglify({ mangle: false })))
    .pipe(gulp.dest('public/react/js'));
});

gulp.task('browserify', ['browserify-vendor'], function() {
  return browserify({ entries: 'src/react/js/app/main.js', debug: true })
    .external(dependencies)
    .transform(babelify, { presets: ['es2015', 'react'] })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(gulpif(production, uglify({ mangle: false })))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/react/js'));
});

gulp.task('browserify-watch', ['browserify-vendor'], function() {
  var bundler = watchify(browserify({ entries: 'src/react/js/app/main.js', debug: true }, watchify.args));
  bundler.external(dependencies);
  bundler.transform(babelify, { presets: ['es2015', 'react'] });
  bundler.on('update', rebundle);
  return rebundle();

  function rebundle() {
    var start = Date.now();
    return bundler.bundle()
      .on('error', function(err) {
        gutil.log(gutil.colors.red(err.toString()));
      })
      .on('end', function() {
        gutil.log(gutil.colors.green('Finished rebundling in', (Date.now() - start) + 'ms.'));
      })
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('public/react/js/'));
  }
});



gulp.task('default', [ 'vendor', 'browserify-watch','browser-sync','javascript','watch']);
gulp.task('build', [ 'vendor', 'browserify']);
