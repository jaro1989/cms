
    var gulp = require('gulp');

    var concat = require('gulp-concat');
    var uglify = require('gulp-uglify');
    var rename = require('gulp-rename');

    var src_files = [
        './builder/index.js',
        './builder/FormatDate.js',
        './builder/CssClasses.js',
        './builder/BuildTag.js',
        './builder/Pagination.js',
        './builder/Button.js',
        './builder/Panel.js',
        './builder/Table.js',
        './builder/*.js'
    ];

    //gulp.task('scripts', function() {
    //    return gulp.src(src_files)
    //        .pipe(concat('html-builder.js'))
    //        .pipe(gulp.dest('./app/js'))
    //        .pipe(uglify())
    //        .pipe(rename('html-builder.min.js'))
    //        .pipe(gulp.dest('./app/js'));
    //});

    gulp.task('scripts-cmf', function() {
        return gulp.src(src_files)
            .pipe(concat('html-builder.js'))
            .pipe(gulp.dest('./../web/admin/js'))
            .pipe(uglify());
            // Scrips min js to web/admin/js/...min.js
            //.pipe(rename('html-builder.min.js'))
            //.pipe(gulp.dest('./../web/admin/js'));
    });

    gulp.task('watch', function() {
        gulp.watch('./builder/*.js', [/*'scripts', */'scripts-cmf']);
    });

    gulp.task('default', ['watch']);