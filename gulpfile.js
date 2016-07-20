var gulp = require('gulp'),
	//styles
	sass = require('gulp-sass'),
	csso = require('gulp-csso'),
	autoprefixer = require('gulp-autoprefixer'),
	uncss = require('gulp-uncss'),
	csslint = require('gulp-csslint'),

	//scripts
	fixmyjs = require("gulp-fixmyjs"),
	uglify = require('gulp-uglify'),
	jshint = require('gulp-jshint'),

	//views
	pug = require('gulp-pug'),

	//images
	imagemin = require('gulp-imagemin'),
	cache = require('gulp-cache'),
	svgo = require('gulp-svgo'),

	//other
	bsync = require('browser-sync').create(),
	newer = require('gulp-newer')
	del = require('del'),
	concat = require('gulp-concat'),
	merge = require('merge2'),
	runSequence = require('run-sequence'),
	plumber = require('gulp-plumber');


gulp.task('styles', function(){
	return gulp.src(['src/scss/fonts/imported.css', 'src/scss/fonts/*.css', 'src/scss/reset.css', 'src/scss/*.css', 'src/scss/*.scss'])
		.pipe(plumber({
			errorHandler: function (err) {
        console.log(err);
    	  this.emit('end');
    	}
		}))
		.pipe(newer('*.css'))
		.pipe(concat('style.scss'))					// concat to one file
		.pipe(sass())											// convert sass to css
		// .pipe(csslint())									// check for errors
  //   .pipe(csslint.reporter())											
		.pipe(gulp.dest('.temp'))
		// .pipe(uncss('index.html'))				// remove unused css
		.pipe(autoprefixer())							// add prefixes
		.pipe(csso())											// minify
		.pipe(gulp.dest('./'))
		.pipe(bsync.reload({ stream: true }))
});

gulp.task('scripts', function(){
	var plugins =	gulp.src(['src/js/plugins/*.js', '!src/js/plugins/_*.js'])
			// .pipe(newer('.temp/plugins.js'))
			.pipe(concat('plugins.js'));

	var main = gulp.src(['src/js/main/*.js', '!src/js/main/_*.js'])
			// .pipe(newer('.temp/main.js'))
			.pipe(jshint())
			.pipe(jshint.reporter('default'))
			.pipe(concat('main.js'))

	var merged = merge(plugins, main)
		.pipe(plumber({
			errorHandler: function (err) {
        console.log(err);
    	  this.emit('end');
    	}
		}))
		.pipe(concat('script.js'))					
		// .pipe(fixmyjs())
		// .pipe(uglify())										
		.pipe(gulp.dest('./'))
		.pipe(bsync.reload({ stream: true }));

	plugins.pipe(gulp.dest('.temp'));
	main.pipe(gulp.dest('.temp'));

	return merged;
});

gulp.task('views', function(){
	return gulp.src('src/views/index.pug')
		.pipe(plumber({
			errorHandler: function (err) {
        console.log(err);
    	  this.emit('end');
    	}
		}))
		.pipe(newer('*.html'))
		.pipe(pug({ pretty: true }))										
		.pipe(gulp.dest('./'))
		.pipe(bsync.reload({ stream: true }))
});

gulp.task('images', function(){
  return gulp.src('src/img/**/*.+(png|jpg|jpeg|gif|svg)')
  	.pipe(plumber({
			errorHandler: function (err) {
        console.log(err);
    	  this.emit('end');
    	}
		}))
	  // .pipe(cache(imagemin({ interlaced: true })))
	  // .pipe(svgo())
	  .pipe(gulp.dest('img'))
	  .pipe(bsync.reload({ stream: true }))
});

gulp.task('favicon', function(){
  return gulp.src('src/favicon/*')
	  .pipe(gulp.dest('favicon'))
	  .pipe(bsync.reload({ stream: true }))
});

gulp.task('watch', function(){
	gulp.watch('src/scss/*', ['styles']);
	gulp.watch('src/views/*', ['views']);
	gulp.watch('src/js/**/*', ['scripts']);
	gulp.watch('src/img/**/*', ['images']);
	gulp.watch('src/favicon/*', ['favicon']);
});

gulp.task('clean', function() {
  return del.sync(['dist', '.temp', 'img']);
})

gulp.task('build', function (callback) {
  runSequence('clean', 
    ['styles', 'views', 'scripts', 'images', 'favicon'],
    callback
  )
})

gulp.task('default', function (callback) {
  runSequence(['build','bsync', 'watch'],
    callback
  )
})

gulp.task('bsync', function(){
	bsync.init({
		server: { baseDir: './'}
	})
});

