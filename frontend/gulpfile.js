var fs = require("fs")
var browserify = require('gulp-browserify')
var vueify = require('vueify')
var gulp = require('gulp');
var babelify = require('babelify');
var sass = require('gulp-sass');
var VueModule = require('gulp-vue-module');


gulp.task('default', function () {
    gulp.src('./assets/js/app.js')
        .pipe(browserify({ transform: [[{_flags: {debug: true}}, vueify], [{ presets: 'es2015'}, babelify], 'aliasify'] }))
        .pipe(gulp.dest('../public/js/'))
});

gulp.task('vueify', function () {
    return browserify('./assets/js/app.js')
        .transform(babelify, { presets: ['es2015'], plugins: ["transform-runtime"] })
        .transform(vueify)
        .transform(VueModule({debug:true}))
        .bundle()
        .pipe(fs.createWriteStream("../public/js/app.js"))

});

gulp.task('sass', function () {
    return gulp.src('./assets/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('../public/css/'));
});

