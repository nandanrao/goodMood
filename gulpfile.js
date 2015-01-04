var gulp = require('gulp'),
    gutil = require('gulp-util'),
    bower = require('bower'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    sh = require('shelljs'),
    wiredep = require('wiredep'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    inject = require('gulp-inject'),
    angularFilesort = require('gulp-angular-filesort'),
    queue = require('streamqueue'),
    html2js = require('gulp-html2js'),
    concat = require('gulp-concat'),
    karma = require('karma').server

var paths = {
  scss: ['./scss/**/*.scss'],
  js: ['./www/js/**/*.js'],
  html: ['./www/**/*.html']
};

gulp.task('sass', function() {
  gulp.src(paths.scss)
    .pipe(sass())
    .pipe(gulp.dest('www/css/'))
    .pipe(reload({stream:true}))
});

gulp.task('serve', ['wiredep', 'inject', 'sass', 'karma-conf', 'templates'], function(){
  browserSync({
    server: {
      baseDir: 'www',
    }
  })

  gulp.watch(['www/**/*.html', 'www/**/*.js'], ['inject', 'wiredep', 'karma-conf', 'templates', reload]);
  gulp.watch('scss/*.scss', ['sass']);
});

gulp.task('wiredep', function(){
  gulp.src('www/index.html')
    .pipe(wiredep.stream())
    .pipe(gulp.dest('www'))
})
 
gulp.task('inject', function(){
  gulp.src('www/index.html')
    .pipe(inject(gulp.src('www/vendor/**/*.js'), {relative: true, name: 'vendor', read: false}))
    .pipe(inject(appFiles(), {relative: true}))
    .pipe(gulp.dest('www'))
})

gulp.task('templates', function(){
  gulp.src('www/js/**/*.html')
    .pipe(html2js({
      outputModuleName: 'ngTemplates',
      base: 'www/js/'
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('www/lib/templates/'))
})

gulp.task('karma-conf', function () {
  return gulp.src('./karma.conf.js')
    .pipe(inject(testFiles(), {
      starttag: '// testfiles:js',
      endtag: '// endinject',
      addRootSlash: false,
      transform: function (filepath, file, i, length) {
        return '\'' + filepath + '\'' + (i + 1 < length ? ',' : '');
      }
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('karma', ['karma-conf'], function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js'
  }, done);
  // gulp.watch('www/**/*.js', ['karma-conf']);
});

function testFiles() {
  return new queue({objectMode: true})
    .queue(gulp.src(wiredep({
      devDependencies: true
    }).js))
    .queue(gulp.src('www/lib/mocks/**/*.js'))
    // .queue(gulp.src('www/lib/vendor/**/*.js'))
    .queue(appFiles())
    .queue(gulp.src(['www/js/**/*_test.js']))
    .done();
}

function appFiles () {
  var files = [
    'www/js/**/*.js',
    '!www/js/**/*_test.js',
    '!www/js/**/*_mobile.js',
    'www/lib/templates/*.js'
  ];
  return gulp.src(files)
    .pipe(angularFilesort());
}

// --- Came with ionic scaffolding... 

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
