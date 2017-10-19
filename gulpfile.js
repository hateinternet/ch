'use strict';

const gulp = require('gulp');

const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const csso = require('gulp-csso');
const htmlmin = require('gulp-htmlmin');
const uglify = require('gulp-uglify');

const dev = gulp.dest.bind(gulp, 'dev');
const build = gulp.dest.bind(gulp, 'build');

gulp.task('watch', () => {
    return gulp.watch('src/**', ['dev']);
});

gulp.task('dev', [
    'html', 'css', 'js'
]);

gulp.task('html', () => {
    return gulp
        .src('src/html/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dev());
});

gulp.task('css', () => {
    return gulp
        .src('src/css/*.css')
        .pipe(concat('bundle.css'))
        .pipe(autoprefixer({ browsers: ['last 5 versions', 'ie >= 9'] }))
        .pipe(dev());
});

gulp.task('js', () => {
    return gulp
        .src([
            'src/js/page.js'
        ])
        .pipe(concat('bundle.js'))
        .pipe(dev());
});

gulp.task('build', [
    'html-build', 'css-build', 'js-build',
    'move-fonts', 'move-img', 'move-meta',
]);

gulp.task('css-build', () => {
    return gulp
        .src('dev/bundle.css')
        .pipe(csso())
        .pipe(build());
});

gulp.task('js-build', () => {
    return gulp
        .src('dev/bundle.js')
        .pipe(uglify())
        .pipe(build());
});

gulp.task('html-build', () => {
    return gulp
        .src('dev/*.html')
        .pipe(build());
});

gulp.task('move-fonts', () => {
    return gulp
        .src('dev/fonts/**')
        .pipe(gulp.dest('build/fonts'));
});

gulp.task('move-img', () => {
    return gulp
        .src('dev/img/**')
        .pipe(gulp.dest('build/img'));
});

gulp.task('move-meta', () => {
    return gulp
        .src('dev/meta/**')
        .pipe(gulp.dest('build/meta'));
});
