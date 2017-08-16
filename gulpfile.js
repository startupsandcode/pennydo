// Sass configuration
//	hsl(140, 61%, 32%)
// #208542
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat');
    connect = require('gulp-connect'),
    minifycss = require('gulp-minify-css'),
    rimraf = require('gulp-rimraf'),
    src = './src/',
    jsSrc = src + 'scripts/',
    dest = './public/';

var files = [
    jsSrc + 'modernizr.custom.97074.js',
    jsSrc + 'jquery-1.10.2.min.js',
    jsSrc + 'bootstrap.min.js',
    jsSrc + 'jquery.easing.1.3.js',
    jsSrc + 'jquery.animate-enhanced.min.js',
    jsSrc + 'jquery.superslides.js',
    jsSrc + 'owl.carousel.js',
    jsSrc + 'jquery.hoverdir.js',
    jsSrc + 'jquery.fancybox.js',
    jsSrc + 'magic.js',
    jsSrc + 'settings.js',
    jsSrc + 'drop.js'
];

gulp.task('sass', function () {
    return gulp.src(src + '**/*.scss')
        .pipe(sass())
        .pipe(concat('main.min.css'))
        .pipe(minifycss())
        .pipe(gulp.dest(dest + '/styles'))
        .pipe(connect.reload());
});

gulp.task('html', function () {
    return gulp.src(src + '**/*.html')
        .pipe(gulp.dest(dest))
        .pipe(connect.reload());
});

gulp.task('images', function () {
    return gulp.src(src + '**/images/*.*')
        .pipe(gulp.dest(dest));
});

gulp.task('scripts', function () {
    return gulp.src(files)
        .pipe(concat('main.min.js'))    
        .pipe(gulp.dest(dest + '/scripts'))
        .pipe(connect.reload());
});

gulp.task('dropjs', function () {
    return gulp.src( src + 'scripts/drop.js')
        .pipe(gulp.dest(dest + '/scripts'))
        .pipe(connect.reload());
});

gulp.task('fonts', function(){
    return gulp.src(src + '**/fonts/*.*')
        .pipe(gulp.dest(dest))
        .pipe(connect.reload());
});

gulp.task('connect', function () {
    connect.server({
        root: 'public',
        livereload: true
    });
});

gulp.task('src', function(){
    return gulp.src(src + '**/*.*')
    .pipe(gulp.dest(dest));
});

gulp.task('watch', function () {
    gulp.watch([src + '**/*.css'], ['sass']);
    gulp.watch([src + '**/scripts/*.js'], ['scripts','dropjs']);
    //gulp.watch([src + '**.*'],['src']);
    gulp.watch([src + '**/*.html'], ['html']);
});

gulp.task('clean', function(){
    console.log('deleting public');
    return gulp.src('./public', { read: false })
   .pipe(rimraf());
})

gulp.task('build',['clean'],function(){
    return gulp.start('local');
})

gulp.task('local', ['sass', 'html', 'scripts', 'fonts', 'images']);

gulp.task('default', ['fonts', 'images','dropjs','scripts','html','sass', 'connect', 'watch']);