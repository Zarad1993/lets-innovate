var gulp = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');


var paths = {
	server : ['./server/**/*.js','!./server/spec/**/*.js']
}

gulp.task('default', ['lint','watch']);

gulp.task('watch',function(){
	gulp.watch(paths.server, ['lint']);
})


gulp.task('lint', function(){
  return gulp.src(['./server/**/*.js'])
             .pipe(jshint('.jshintrc'))
             .pipe(jshint.reporter('default'))
})