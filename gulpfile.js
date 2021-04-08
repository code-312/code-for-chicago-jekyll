var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

gulp.task('autoprefixer', function () {
    return gulp.src('scss/main.scss')
        .pipe(postcss([autoprefixer({
            browsers: ['last 2 versions']
        })], {
            syntax: require('postcss-scss')
        }))
        .pipe(gulp.dest(function (file) {
          return file.base;
        }));
});
