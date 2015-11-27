'use strict';
const gulp = require('gulp');
const babel = require('gulp-babel');
// const concat = require('gulp-concat');
const browserSync = require('browser-sync');
const nodemon = require('gulp-nodemon');
// const uglify = require('gulp-uglify');

const paths = {
  jsSrc: 'src/js/**/*.js',
  jsBuild: 'public//js'
};


gulp.task('default',['browser-sync','javascript','watch']);

gulp.task('browser-sync', ['nodemon'], () => {
	browserSync.init(null, {
		proxy: {
            target: "localhost:80",
            ws: true
        },
        files: ["public/**/*.*"],
        browser: "google chrome",
        port: 1000,
        reloadDelay: 1000
	});
});

gulp.task('nodemon', (cb) => {
	var started = false;
	return nodemon({
		script: 'server.js',
        ignore: ['/public/**',  '/gulpfile.js']
	}).on('start',  () =>{
		// to avoid nodemon being started multiple times
		if (!started) {
			cb();
			started = true; 
		} 
	});
});	

gulp.task('javascript',()=>{
    return gulp.src(paths.jsSrc)
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

