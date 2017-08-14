// Sass configuration
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    connect = require('gulp-connect'),
    rimraf = require('gulp-rimraf'),
    src = './src/'
    dest = './public/';

gulp.task('sass', function () {
    return gulp.src(src + '**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest(dest))
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
    return gulp.src(src + '**/scripts/*.*')
        .pipe(gulp.dest(dest))
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
    gulp.watch([src + '**.*'],['src']);
    // gulp.watch([src + '**/*.scss'], ['sass']);
    // gulp.watch([src + '**/scripts/*.js'], ['scripts']);
    // gulp.watch([src + '**/*.html'], ['html']);
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

gulp.task('default', ['src', 'connect', 'watch']);