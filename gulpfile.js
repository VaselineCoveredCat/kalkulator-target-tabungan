"use strict";
import gulp from "gulp";
import autoprefixer from "autoprefixer";
import dartsass from "sass";
import stylelint from "stylelint";
import postcss from "gulp-postcss";
import gulpbabel from "gulp-babel";
import gulpsass from "gulp-sass";
import gulptype from "gulp-typescript";

const sass = gulpsass(dartsass);
const ts = gulptype.createProject("tsconfig.json");

export function compiletypescript() {
  return gulp.src("src/typescripts/index.ts").pipe(ts()).pipe(gulpbabel()).pipe(gulp.dest("scripts"));
}

export default function compilesass() {
  return gulp
    .src("src/sass/index.scss")
    .pipe(sass())
    .pipe(postcss([autoprefixer(), stylelint({fix: true})]))
    .pipe(gulp.dest("styles"));
}
