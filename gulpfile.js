var gulp = require('gulp'),
    jscs = require('gulp-jscs'),
    mocha = require('gulp-mocha'),
    sequence = require('run-sequence');

gulp.task('verify', function(callback) {
    sequence(
        'convention',
        'test',
        function(err) {
            if(!err) {
                callback.apply(null, arguments);
            }
        }
    );
});


gulp.task('convention', function() {
    return gulp
        .src([ './lib/**' ])
        .pipe(jscs());
});

gulp.task('test', function() {
    return gulp
        .src([ './test/*.js' ])
        .pipe(mocha({ reporter: 'spec' }));
});
