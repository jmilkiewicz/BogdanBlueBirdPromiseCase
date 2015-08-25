"use strict";

var gulp = require('gulp');
var paths = {
    scripts: ['server/**/*.js', 'test/**/*.js']
};

/**
 *  Runs all JS file through JsHint tool.
 */
gulp.task('jshint', function () {
    var jshint = require('gulp-jshint');

    return gulp.src(paths.scripts)
        .pipe(jshint({
            lookup: true
        }))
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});

//unit tests
gulp.task('test:unit', runMocha('test/unit-mocha.opts'));

////bdd tests
gulp.task('test:bdd', runMocha('test/bdd-mocha.opts'));

//ims integration tests
gulp.task('test:int', runMocha('test/int-mocha.opts'));

function runMocha(mochaOptsFile){
    var mochaParams = ['--opts', mochaOptsFile]
    var reporter = process.env.MOCHA_REPORTER;
    if(reporter){
        mochaParams.push('--reporter');
        mochaParams.push(reporter);
    }
    return function() {
        var spawn = require('child_process').spawn;

        var mocha = spawn('./node_modules/mocha/bin/mocha', mochaParams, {
            stdio: 'inherit',
            env: process.env
        });
        mocha.on('exit', function (exitCode) {
            this.kill();
            if (exitCode) {
                throw new Error('Mocha terminated with exit code ' + exitCode);
            }
        });
        mocha.on('close', function (code, signal) {
            console.log('mocha child process terminated due to receipt of signal ' + signal);
        });
    };
}

/**
 * listen to file changes
 */
gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['jshint']);
});

gulp.task('default', ['watch', 'jshint']);
gulp.task('test', ['test:bdd', 'test:int']);
