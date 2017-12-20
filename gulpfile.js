'use strict';

const gulp = require('gulp');

const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const csso = require('gulp-csso');
const htmlmin = require('gulp-htmlmin');
const template = require('gulp-template');
const uglify = require('gulp-uglify');

const data = require('./data');

const dev = gulp.dest.bind(gulp, 'dev');
const build = gulp.dest.bind(gulp, 'build');

gulp.task('watch', () => {
    return gulp.watch('src/**', ['dev']);
});

gulp.task('dev', [
    'html-index', 'html-stories', 'css', 'js',
    'move-fonts', 'move-img', 'move-meta',
]);

gulp.task('html-index', () => {
    return gulp
        .src('src/html/index.html')
        .pipe(template({ data }))
        .pipe(htmlmin({
            collapseInlineTagWhitespace: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            removeComments: true
        }))
        .pipe(dev());
});

gulp.task('html-stories', () => {
    return data.stories.map(story => gulp
        .src('src/html/story.html')
        .pipe(template({ story, data }))
        .pipe(htmlmin({
            collapseInlineTagWhitespace: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            removeComments: true
        }))
        .pipe(concat(`${story.name}.html`))
        .pipe(dev())
    );
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
            'src/js/hammer.min.js',
            'src/js/imagesloaded.min.js',
            'src/js/wheel-indicator.min.js',
            'src/js/custom-scrollbar.min.js',

            'src/js/page.js',
            'src/js/index.js',

            'src/js/timeline.js',
            'src/js/horizontal-slider.js',
            'src/js/philosophy-slider.js',
            'src/js/philosophy-mobile.js',
            'src/js/vertical-slider.js',

            'src/js/header.js',
            'src/js/history.js',
            'src/js/achievements.js',
            'src/js/gallery.js',

            'src/js/loading.js',
        ])
        .pipe(concat('bundle.js'))
        .pipe(dev());
});

gulp.task('move-fonts', () => {
    return gulp
        .src('build/fonts/**')
        .pipe(gulp.dest('dev/fonts'));
});

gulp.task('move-img', () => {
    return gulp
        .src('build/img/**')
        .pipe(gulp.dest('dev/img'));
});

gulp.task('move-meta', () => {
    return gulp
        .src('build/meta/**')
        .pipe(gulp.dest('dev/meta'));
});

gulp.task('build', [
    'html-build', 'css-build', 'js-build'
]);

gulp.task('html-build', () => {
    return gulp
        .src('dev/*.html')
        .pipe(build());
});

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
