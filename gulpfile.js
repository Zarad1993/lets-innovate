var gulp = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var ignore = require('gulp-ignore');
var pump = require('pump');
var concat = require('gulp-concat');



var paths = {
	server : ['./server/**/*.js','./client/js/**/*.js','./client/app.js']
}

gulp.task('default', ['lint','scripts','watch']);

gulp.task('watch',function(){
	gulp.watch(paths.server, ['lint']);
});


gulp.task('lint', function(){
    return gulp.src(['./server/**/*.js' , './client/js/**/*.js', './client/app.js'])
    		   .pipe(ignore.exclude(/Spec\.js/))
               .pipe(jshint('.jshintrc'))
               .pipe(jshint.reporter('default'))
});

gulp.task('compress', function(cb){
	pump([
		gulp.src('./client/lib/**/*.js'),
		uglify(),
		gulp.dest('client/dist')
		],cb)
});

gulp.task('scripts', function() {
  gulp.src(['./client/lib/oauth-js/dist/oauth.js', './client/lib/angular/angular.min.js', './client/lib/angular-ui/build/angular-ui.min.js', './client/lib/angular-route/angular-route.js'])
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./client/dist/'))
});