var gulp = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var ignore = require('gulp-ignore');


var paths = {
	server : ['./server/**/*.js','./client/js/**/*.js','./client/app.js']
}

gulp.task('default', ['lint','watch']);

gulp.task('watch',function(){
	gulp.watch(paths.server, ['lint']);
})


gulp.task('lint', function(){
    return gulp.src(['./server/**/*.js' , './client/js/**/*.js', './client/app.js'])
    		   .pipe(ignore.exclude(/Spec\.js/))
               .pipe(jshint('.jshintrc'))
               .pipe(jshint.reporter('default'))
})