var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    jscs = require('gulp-jscs'),
    mocha = require('gulp-mocha'),
    sequence = require('run-sequence');

gulp.task('verify', function(callback) {
    sequence(
        'lint',
        'codestyle',
        'test',
        function(err) {
            if(!err) {
                callback.apply(null, arguments);
            }
        }
    );
});

gulp.task('lint', function() {
    return gulp
        .src([ './lib/**' ])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'));
});

gulp.task('codestyle', function() {
    return gulp
        .src([ './lib/**' ])
        .pipe(jscs());
});

gulp.task('test', function() {
    return gulp
        .src([ './test/*.js' ])
        .pipe(mocha({ reporter: 'spec' }));
});
