var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var b = require('browserify');
var babelify = require('babelify');
var config = require('./gulp/config');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('browsersync', () => {
    browserSync.init({
        server: {
            baseDir: './',
        }
    });
});

gulp.task('browserify', () => {
    var bundle = b('./src/js', {
        debug: true,
        sourceMap: false
    });
    bundle.bundle()
        .pipe(source('./src/js/index.js'))
        .pipe(buffer())
        .pipe(rename('bundle.js'))
        .pipe(gulp.dest(config.dest + '/js/'));
});

gulp.task('default', () => {
    gulp.start('browserify');
    gulp.watch('./src/js/**/**', () => {
        gulp.start('browserify');
        reload();
    });
    gulp.watch(['./**/*.html', './**/*.css'], reload);
    gulp.start('browsersync');
});