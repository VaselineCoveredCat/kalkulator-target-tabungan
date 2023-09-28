"use strict";
import gulp from "gulp";
import autoprefixer from "autoprefixer";
import dartsass from "sass";
import stylelint from "stylelint";
import postcss from "gulp-postcss";
import gulpsass from "gulp-sass";

const sass = gulpsass(dartsass);

function compilesass() {
  return gulp
    .src("sass/index.scss")
    .pipe(sass())
    .pipe(postcss([autoprefixer(), stylelint({fix: true})]))
    .pipe(gulp.dest("styles"));
}

export default compilesass;
