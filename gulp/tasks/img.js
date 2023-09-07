import gulp from "gulp"
import path from "../config/path.js"
import plugins from "../config/plugins.js"

import webp from "gulp-webp"
import imagemin from "gulp-imagemin"

const img = () => {
	return gulp.src(path.src.img)
		.pipe(plugins.plumber(
			plugins.notify.onError({
				title: 'IMG',
				message: 'Error: <%= error.message %>'
			})
		))
		.pipe(plugins.newer(path.build.img))
		.pipe(plugins.gulpIf(
			app.isBuild,
			webp()
		))
		.pipe(plugins.gulpIf(
			app.isBuild,
			gulp.dest(path.build.img)
		))
		.pipe(plugins.gulpIf(
			app.isBuild,
			gulp.src(path.src.img)
		))
		.pipe(plugins.gulpIf(
			app.isBuild,
			plugins.newer(path.build.img)
		))
		.pipe(plugins.gulpIf(
			app.isBuild,
			imagemin({
				progressive: true,
				svgPlugins: [{ removeViewBox: false }],
				interlaced: true,
				optimizationLevel: 3,
			})
		))
		.pipe(gulp.dest(path.build.img))
		.pipe(gulp.src(path.src.svg))
		.pipe(gulp.dest(path.build.img))
		.pipe(plugins.browserSync.stream())
}

export default img