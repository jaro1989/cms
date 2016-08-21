
    // 1) npm init
    // 2) npm install --save-dev gulp
    // 3) npm install gulp-concat
    // 4) npm install gulp-uglify
    // 5) npm install gulp-rename

    var gulp   = require('gulp');
    var concat = require('gulp-concat');
    var uglify = require('gulp-uglify');
    var rename = require('gulp-rename');

    var src_files = [
        './ui/ui.Config.js',
        './ui/ui.FormatDate.js',
        './ui/ui.CSS.js',
        './ui/ui.api.js',
        './ui/ui.Element.js',
        './ui/ui.Calendar.js',
        './ui/ui.FFText.js',
        './ui/ui.FFReadOnly.js',
        './ui/ui.FFHidden.js',
        './ui/ui.FFRadio.js',
        './ui/ui.FFCheckbox.js',
        './ui/ui.FFTextarea.js',
        './ui/ui.FFPassword.js',
        './ui/ui.FFSelect.js',
        './ui/ui.FFButton.js',
        './ui/ui.FFDate.js',
        './ui/ui.Modal.js',
        './ui/ui.Progress.js',
        './ui/ui.Ajax.js',
        './ui/ui.FormData.js',
        './ui/ui.Form.js',
        './ui/ui.Page.js',
        './ui/ui.Pagination.js',
        './ui/ui.SortTable.js',
        './ui/ui.List.js'
    ];

    //gulp.task('scripts', function() {
    //    return gulp.src(src_files)
    //        .pipe(concat('html-ui.js'))
    //        .pipe(gulp.dest('./app/js'))
    //        .pipe(uglify())
    //        .pipe(rename('html-ui.min.js'))
    //        .pipe(gulp.dest('./app/js'));
    //});

    gulp.task('scripts', function() {
        return gulp.src(src_files)
            .pipe(concat('ui.Html.js'))
            .pipe(gulp.dest('./ui/example/js'))
            .pipe(uglify())
            // Scrips min js to ui/example/js/...min.js
            .pipe(rename('ui.Html.min.js'))
            .pipe(gulp.dest('./ui/example/js'));
    });

    gulp.task('watch', function() {
        gulp.watch('./ui/*.js', ['scripts']);
    });

    gulp.task('default', ['watch']);