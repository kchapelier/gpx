var fs = require('fs'),
    gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    jscs = require('gulp-jscs'),
    mocha = require('gulp-mocha'),
    plato = require('gulp-plato'),
    sequence = require('run-sequence'),
    stylish = require('jshint-stylish');

gulp.task('report', function() {
    var jshintOptions = JSON.parse(fs.readFileSync('./.jshintrc'));

    return gulp
        .src([ './lib/**' ])
        .pipe(plato('report', {
            jshint: {
                options: jshintOptions
            },
            complexity: {
                trycatch: true
            }
        }));
});

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
        .pipe(jshint.reporter(stylish));
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
