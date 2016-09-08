var gulp = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var ignore = require('gulp-ignore');
var concat = require('gulp-concat');
var uglifycss = require('gulp-uglifycss');
var rename = require('gulp-rename');
var exec = require('child_process').exec;



var paths = {
	server : ['./server/**/*.js','./client/js/**/*.js','./client/app.js']
}

gulp.task('default', ['install','lint','scripts','css','project','watch']);

gulp.task('watch',function(){
	gulp.watch(paths.server, ['lint']);
});


gulp.task('install', function (cb) {
  exec('bower install', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})

gulp.task('lint', function(){
    return gulp.src(['./server/**/*.js' , './client/js/**/*.js', './client/app.js'])
    		   .pipe(ignore.exclude(/Spec\.js/))
               .pipe(jshint('.jshintrc'))
               .pipe(jshint.reporter('default'))
});

gulp.task('css', function(){
	gulp.src(['./client/lib/bootstrap/dist/css/bootstrap.min.css','.client/lib/font-awesome/css/font-awesome.min.css','./client/lib/prettyphoto/css/prettyPhoto.css', './client/lib/animate.css/animate.css','./client/styles/style.css'])
	.pipe(concat('styles.min.css'))
	.pipe(uglifycss({
		"maxLineLen": 80,
		"uglyComments": true
	}))
	.pipe(gulp.dest('./client/dist/'))
})

gulp.task('scripts', function() {
  gulp.src(['./client/lib/jquery/dist/jquery.min.js','./client/lib/jquery-ui/jquery-ui.min.js','./client/lib/oauth-js/dist/oauth.js', './client/lib/angular/angular.min.js', './client/lib/angular-ui/build/angular-ui.min.js', './client/lib/angular-route/angular-route.js'])
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./client/dist/'))
});

gulp.task('project', function(){
	gulp.src(['./client/js/controllers/editFeature.js','./client/js/controllers/userViewController.js','./client/js/controllers/adminController.js','./client/js/controllers/auth.js','./client/js/controllers/homeController.js','./client/js/services/services.js','./client/app.js'])
		.pipe(concat('lets-innovate.js'))
		.pipe(gulp.dest('./client/dist'))
		.pipe(rename('lets-innovate.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./client/dist'))
});