gulp = require('gulp');
uglify = require('gulp-uglify');
config = require('./gulp/config');

gulp.task('uglify', function() {
    gulp.src(
        [config.src + 'js/**.js']
    );
});