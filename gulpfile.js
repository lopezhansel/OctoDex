'use strict';
const gulp = require('gulp');
const babel = require('gulp-babel');
// const concat = require('gulp-concat');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync');
const nodemon = require('gulp-nodemon');
// const uglify = require('gulp-uglify');

const paths = {
  jsSrc: './src/js/**/*.js',
  jsBuild: './public//js'
};


gulp.task('default',['browser-sync','javascript','watch']);

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

gulp.task('watch', () => {
  gulp.watch(paths.jsSrc, ['javascript']);
});

