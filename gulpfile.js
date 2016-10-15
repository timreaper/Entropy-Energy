/**------------------------------------------------------------------------------------------------------------------**
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ *
 * ------------------------------------ Ed's Gulp File for Handlebars Projects! ------------------------------------- *
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ *
 **------------------------------------------------------------------------------------------------------------------**/

/**-------------------------------*
 * Variable Declarations (Custom)
 *--------------------------------*/

/**
 * Source Paths
 ***/
var srcRoot = './src';
var dataSrc = srcRoot + '/data';
var pageDataSrc = dataSrc + '/pages';
var fontSrc = srcRoot + '/fonts';
var imageSrc = srcRoot + '/images';

var jsApp = srcRoot + '/js/app';
var jsLib = srcRoot + '/js/libraries';
var helpersFile = jsApp + '/handlebarsHelpers.js';

var scssApp = srcRoot + '/scss/app';
var scssAppFile = scssApp + '/main.scss';
var scssLib = srcRoot + '/scss/libraries';
var scssLibFile = scssLib + '/main_libraries.scss';

var handlebarsSrc = srcRoot + '/handlebars';
var pageSrc = handlebarsSrc + '/pages';
var partialSrc = handlebarsSrc + '/partials';

var htmlSrc = srcRoot + '/html';

/**
 * Destination Paths
 ***/
var distRoot = './dist';
var cssDest = distRoot + '/assets/css';
var fontDest = distRoot + '/assets/fonts';
var imageDest = distRoot + '/assets/images';
var jsDest = distRoot + '/assets/js';

/**--------------------------------*
 * Variable Declarations (Requires)
 *---------------------------------*/

/* Auto adds vendor prefixes for CSS*/
var autoPrefixer = require('autoprefixer');

/* Refreshes the browser on change of code */
var browserSync = require('browser-sync').create();

/* Concatenates all files in pipe into one file */
var concat = require('gulp-concat');

/* Deletes files */
var del = require('del');

/* The almighty runner of tasks */
var gulp = require('gulp');

/* Compiles the handlebars templates*/
var handlebars = require('gulp-hb');

/* Minifies the HTML */
var htmlMin = require('gulp-htmlmin');

/* Compresses the image */
var imageMin = require('gulp-imagemin');

/* Minifies the CSS */
var minifyCSS = require('gulp-clean-css');

/* Creates a notify message for when task is complete */
var notify = require('gulp-notify');

/* Allows for ordering of files in the pipe */
var order = require('gulp-order');

/* Allows for gathering path data on files in the pipe */
var path = require('path');

/* CSS post processor for Gulp */
var postCSS = require('gulp-postcss');

/* Image optimiser */
var pngQuant = require('imagemin-pngquant');

/* Prints out filenames of all the files that pass through a task */
var print = require('gulp-print');

var reload = browserSync.reload;

/* Renames files & file extensions */
var rename = require('gulp-rename');

/* Compiles SASS/SCSS into CSS */
var sass = require('gulp-sass');

/* Wrapper allowing for use of object streams */
var through = require('through2');

/* Minifies the JS */
var uglify = require('gulp-uglify');

/**-----------------------------*
 * Tasks (Fetching & Compiling)
 *------------------------------*/

/**
 * Browser Sync
 *      Updates the website in the browser
 ***/
gulp.task('browser_sync', function () {
	browserSync.init({
		proxy: "local.entropyandenergy.com",
		injectChanges: true,
		files: distRoot
	});
});

/**
 * Handlebars (Index)
 *       Runs through all the JSON files in the pages folder in the data directory,
 *       pumps them through the index Handlebars template and then outputs HTML files
 ***/
gulp.task('handlebars_index', function () {
	return gulp.src(pageDataSrc + '/index.json')
		.pipe(through.obj(function (file, enc, cb) {
			var name = path.parse(file.path).name;
			var data = JSON.parse(String(file.contents));

			gulp.src(handlebarsSrc + '/' + 'index.hbs')
				.pipe(handlebars({
					helpers: helpersFile,
					partials: partialSrc + '/**/*.hbs',
					bustCache: true
				}).data(data))
				.pipe(rename({
					basename: name,
					extname: '.html'
				}))
				.pipe(htmlMin({
					collapseWhitespace: true,
					minifyCSS: true,
					minifyJS: true,
					removeStyleLinkTypeAttributes: true,
					removeScriptTypeAttributes: true,
					useShortDoctype: true
				}))
				.pipe(gulp.dest(distRoot))
				.on('error', cb)
				.on('end', cb);
		}));
});

/**
 * Handlebars (Pages)
 *       Runs through all the JSON files in the pages folder in the data directory,
 *       pumps them through the index Handlebars template and then outputs HTML files
 ***/
gulp.task('handlebars_pages', function () {
	return gulp.src(pageDataSrc + '/*.{js,json}')
		.pipe(through.obj(function (file, enc, cb) {
			var name = path.parse(file.path).name;
			var data = JSON.parse(String(file.contents));

			gulp.src(pageSrc + '/' + name + '.hbs')
				.pipe(handlebars({
					helpers: helpersFile,
					partials: partialSrc + '/**/*.hbs',
					bustCache: true
				}).data(data))
				.pipe(rename({
					basename: 'index',
					extname: '.html'
				}))
				.pipe(htmlMin({
					collapseWhitespace: true,
					minifyCSS: true,
					minifyJS: true,
					removeStyleLinkTypeAttributes: true,
					removeScriptTypeAttributes: true,
					useShortDoctype: true
				}))
				.pipe(gulp.dest(distRoot + '/' + name))
				.on('error', cb)
				.on('end', cb);
		}));
});

/**
 * HTML
 *       Runs through all the HTML & PHP files in the HTML folder in the data directory,
 *       minifies them and then outputs them in dist directory.
 ***/
gulp.task('html', function () {
	return gulp.src(htmlSrc + '/**/*.{php,html}')
		.pipe(print(function (filepath) {
			return "HTML: " + filepath;
		}))
		.pipe(htmlMin({
			collapseWhitespace: true,
			minifyCSS: true,
			minifyJS: true,
			removeStyleLinkTypeAttributes: true,
			removeScriptTypeAttributes: true,
			useShortDoctype: true
		}))
		.pipe(gulp.dest(distRoot))
});

/**
 * Images
 *      Deletes all images in dist, minifies all the images files in source & them moves them into dist
 ***/
gulp.task('images', function () {
	del([imageDest + '/**/*']); // Clean images folder repopulating
	return gulp.src(imageSrc + '/**/*.{svg,png,gif,jpg,jpeg}')
		.pipe(imageMin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngQuant()]
		}))
		.pipe(gulp.dest(imageDest));
});

/**
 * Javascript (App)
 *       Compiles all the Javascript files in the JS directory
 ***/
gulp.task('js_app', function () {
	return gulp.src(jsApp + '/**/*.js')
		.pipe(print(function (filepath) {
			return "JS (App): " + filepath;
		}))
		.pipe(concat('app.js'))
		.pipe(uglify())
		.pipe(gulp.dest(jsDest));
});


/**
 * Javascript (Libraries)
 *       Compiles all the Javascript files in the JS directory in the Libraries directory
 ***/
gulp.task('js_libraries', function () {
	return gulp.src(jsLib + '/**/*.js')
		.pipe(order([
			"jquery.js",
			'*.js'
		], jsLib))
		.pipe(print(function (filepath) {
			return "JS (Libraries): " + filepath;
		}))
		.pipe(concat('libraries.js'))
		.pipe(uglify())
		.pipe(gulp.dest(jsDest));
});

/**
 * SCSS (App)
 *       Compiles all the SCSS stylesheets in the app directory
 ***/
gulp.task('scss_app', function () {
	return gulp.src(scssAppFile)
		.pipe(concat('app.css'))
		.pipe(sass().on('error', sass.logError))
		.pipe(postCSS([
			autoPrefixer({browsers: ['last 3 versions']})
		]))
		.pipe(minifyCSS())
		.pipe(gulp.dest(cssDest));
});

/**
 * SCSS (Libraries)
 *       Compiles all the SCSS stylesheets in the libraries directory
 ***/
gulp.task('scss_libraries', function () {
	return gulp.src(scssLibFile)
		.pipe(concat('libraries.css'))
		.pipe(sass().on('error', sass.logError))
		.pipe(postCSS([
			autoPrefixer({browsers: ['last 3 versions']})
		]))
		.pipe(minifyCSS())
		.pipe(gulp.dest(cssDest));
});

/**----------------------------*
 * Tasks (Watchers)
 *-----------------------------*/

gulp.task('watch', ['browser_sync'], function () {
	gulp.watch(imageSrc + '/**/*', ['images']).on("change", reload);
	gulp.watch(jsApp + '/**/*.js', ['js_app']).on("change", reload);
	gulp.watch(jsLib + '/**/*.js', ['js_libraries']).on("change", reload);
	gulp.watch(scssApp + '/**/*.scss', ['scss_app']).on("change", reload);
	gulp.watch(scssLib + '/**/*.js', ['scss_libraries']).on("change", reload);
	gulp.watch([handlebarsSrc + '/**/*.hbs', dataSrc + '/**/*.json'], ['handlebars']);
});

/**----------------------------*
 * Tasks (Running & Executing)
 *-----------------------------*/

/**
 * Default (THE MOST IMPORTANT TASK OF ALL)
 *
 ***/
gulp.task('default', ['handlebars_index', 'handlebars_pages', 'html', 'images', 'js_app', 'js_libraries', 'scss_app', 'scss_libraries'], function () {
	console.log('Gulp (Default) complete.');
});

/**
 * JS (Only deals with JS)
 *
 ***/
gulp.task('js', ['js_app', 'js_libraries'], function () {
	console.log('Gulp (JS) complete.');
});

/**
 * Handlebars (Only deals with Handlebars)
 *
 ***/
gulp.task('handlebars', ['handlebars_index', 'handlebars_pages'], function () {
	console.log('Gulp (Handlebars) complete.');
});

/**
 * Quick (Only deals with Handlebars, JS & SCSS)
 *
 ***/
gulp.task('quick', ['handlebars_index', 'handlebars_pages', 'html', 'js_app', 'js_libraries', 'scss_app', 'scss_libraries'], function () {
	console.log('Gulp (Quick) complete.');
});

/**
 * SCSS (Only deals with SCSS)
 *
 ***/
gulp.task('scss', ['scss_app', 'scss_libraries'], function () {
	console.log('Gulp (SCSS) complete.');
});
