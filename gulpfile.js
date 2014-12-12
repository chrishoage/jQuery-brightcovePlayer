var gulp = require('gulp'),
		connect = require('gulp-connect'),
		jshint = require('gulp-jshint');

gulp.task('lint', function() {
  return gulp.src('./src/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(connect.reload());
});

gulp.task('webserver', function() {
  connect.server({
  	livereload: true
  });
});

gulp.task('watch', function() {
    gulp.watch('./src/*.js', ['lint']);
})

gulp.task('default', ['lint', 'webserver', 'watch']);
