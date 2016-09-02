var gulp = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');


var paths = {
	server : './server/**/*.js'
}

gulp.task('default', ['watch']);

gulp.task('watch',function(){
	gulp.watch(paths.server)
})