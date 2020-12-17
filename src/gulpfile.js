'use strict';

var gulp          = require('gulp');
var sass          = require('gulp-sass');
var browserSync   = require('browser-sync').create();
var uglify        = require('gulp-uglify');
var concat        = require('gulp-concat');
var gulpUtil      = require('gulp-util');
var plumber       = require('gulp-plumber');
var htmlmin       = require('gulp-htmlmin');
var fileinclude   = require('gulp-file-include');
var styleInject   = require("gulp-style-inject");
var gzip          = require('gulp-gzip');
var strip         = require('gulp-strip-comments');
var sourcemaps    = require('gulp-sourcemaps');
var wait          = require('gulp-wait');
var replace       = require('gulp-replace');

// process JS files and return the stream.
gulp.task('js', function () {
    return gulp.src([
            'dev/js/jquery-2.1.1.min.js',
            'dev/js/jquery.scrollTo.min.js',
            'dev/js/typed.custom.js',
            'dev/js/script.js',
            'dev/js/transition.js',
            'dev/js/modernizr.js'
        ])
        .pipe(plumber(function(error) {
            gulp.emit('finish');
        }))
        .pipe(concat('all.min.js'))
        .pipe(uglify().on('error', gulpUtil.log))
        .pipe(strip())
        .pipe(gulp.dest('public/js/'));
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("dev/scss/style.scss")
        .pipe(wait(500))
        .pipe(sourcemaps.init())
        .pipe(sass({errLogToConsole: true, outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest("public/css"))
        .pipe(browserSync.stream());
});

gulp.task('html', function() {
    return gulp.src('dev/*.html')
        .pipe(plumber(function(error) {
            gulp.emit('finish');
        }))
        .pipe(fileinclude({
          prefix: '@@',
          basepath: '@file'
        }))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('public/'));
});

gulp.task('html-build', function() {
    return gulp.src('dev/*.html')
        .pipe(styleInject({
            path: './public/',
            match_pattern: '<\\link\\s*rel=\"stylesheet\"\\s*(.*?)\\s*>',
        }))
        .pipe(fileinclude({
          prefix: '@@',
          basepath: '@file'
        }))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(strip())
        .pipe(gulp.dest('public/'));
});

gulp.task('gzip', function() {
    return gulp.src('public/*.html')
        .pipe(gzip())
        .pipe(gulp.dest('public/'));
    return gulp.src('public/js/all.min.js')
        .pipe(gzip())
        .pipe(gulp.dest('public/js/'));
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass','js', 'html'], function() {
    browserSync.init({
        server: "./public/"
    });
    gulp.watch("dev/scss/*.scss", ['sass']);
    gulp.watch("dev/components/*.html", ['html']);
    gulp.watch("dev/*.html", ['html']);
    gulp.watch("dev/js/*.js", ['js-watch']);
    gulp.watch("dev/assets/*", ['imagemin']);
    gulp.watch("public/*.html").on('change', browserSync.reload);
});

// all browsers reload after tasks are complete.
gulp.task('js-watch', ['js'], function (done) {
    browserSync.reload();
    done();
});

//função padroa de dev
gulp.task('default', ['serve']);
gulp.task('dev', ['serve']);

// Static Server + watching scss/html files
gulp.task('build', ['sass','js', 'html-build', 'gzip'], function() {
    //finaliza o arquivos para subir em produção
    gulp.src('./public/index.html').pipe(replace('../assets/', 'assets/')).pipe(gulp.dest('./public/'));
    return gulp.src('.htaccess').pipe(gulp.dest('./public/'));
});


