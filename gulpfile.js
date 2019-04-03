var postcss = require('gulp-postcss');
var gulp = require('gulp');
var purgecss = require('gulp-purgecss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');

gulp.task('styles', function() {
  var plugins = [
    autoprefixer(),
    cssnano()
  ];
  return gulp.src('./style.css')
    .pipe(
      purgecss({
        content: ['./*.html']
      })
    )
    .pipe(postcss(plugins))
    .pipe(gulp.dest('./dest'))
    .pipe(gulp.src('./*html'))
    .pipe(gulp.dest('./dest'))
});

gulp.task('watch:styles', function() {
  gulp.watch('./*.css', gulp.series('styles'));
});