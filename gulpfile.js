var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var browserSync=require('browser-sync');
var reload=browserSync.reload;

gulp.task('sass', function() {
  return sass('css/index.css')
    .pipe(gulp.dest('apps/css'))
    .pipe(reload({ stream:true }));
});
gulp.task('serve',['sass'],function() {
  // 将你的默认的任务代码放在这

  browserSync({
  	server:{
  		baseDir:'apps'
  	}
  });

  gulp.watch(['*.html', 'css/**/*.css', 'js/**/*.js'], 'app/css/*.css', ['sass'], {cwd: 'apps'}, reload);

});