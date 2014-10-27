var gulp = require('gulp'),
    jscs = require('gulp-jscs');

gulp.task('verify', function() {
    gulp
        .src([ './lib/**' ])
        .pipe(jscs());
});
