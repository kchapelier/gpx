var gulp = require('gulp'),
    jscs = require('gulp-jscs'),
    mocha = require('gulp-mocha');

var getMochaTest = function(reporter) {
    return function() {
        return gulp
            .src([ './test/*.js' ])
            .pipe(mocha({ reporter: reporter }));
    };
};

var getConventionTest = function() {
    return function() {
        return gulp
            .src([ './lib/**' ])
            .pipe(jscs());
    };
};

gulp.task('verify', ['test-with-convention'], function() {});

gulp.task('convention', getConventionTest());
gulp.task('test-with-convention', ['convention'], getMochaTest('base'));
gulp.task('test', getMochaTest('list'));
