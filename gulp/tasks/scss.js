import gulp from "gulp"
import path from "../config/path.js"
import plugins from "../config/plugins.js"

import dartSass from "sass"
import gulpSass from "gulp-sass"
import rename from "gulp-rename"

import cleanCss from "gulp-clean-css"
import autoPrefixer from "gulp-autoprefixer"
import groupCssMediaQueries from "gulp-group-css-media-queries"

const sass = gulpSass(dartSass)

const scss = () => {
	return gulp.src(path.src.scss, { sourcemaps: app.isDev })
		.pipe(plugins.plumber(
			plugins.notify.onError({
				title: 'SCSS',
				message: 'Error: <%= error.message %>'
			})
		))
		.pipe(sass({
			outputStyle: 'expanded',
		}))
		.pipe(plugins.replace(/@img\//g, '../img/'))
		.pipe(plugins.gulpIf(
			app.isBuild,
			groupCssMediaQueries()
		))
		.pipe(plugins.gulpIf(
			app.isBuild,
			autoPrefixer()
		))
		.pipe(gulp.dest(path.build.css))
		.pipe(plugins.gulpIf(
			app.isBuild,
			cleanCss()
		))
		.pipe(rename({
			extname: '.min.css',
		}))
		.pipe(gulp.dest(path.build.css))
		.pipe(plugins.browserSync.stream())
}

export default scss
