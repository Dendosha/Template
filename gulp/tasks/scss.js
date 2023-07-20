import dartSASS from "sass"
import gulpSASS from "gulp-sass"
import rename from "gulp-rename"

import cleanCSS from "gulp-clean-css"
import autoPrefixer from "gulp-autoprefixer"
import groupCSSMediaQueries from "gulp-group-css-media-queries"

const sass = gulpSASS(dartSASS)

const scss = () => {
	return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev })
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: 'SCSS',
				message: '<%= error.message %>',
			})
		))
		.pipe(sass({
			outputStyle: 'expanded',
		}))
		.pipe(app.plugins.replace(/@img\//g, '../img/'))
		.pipe(
			app.plugins.gulpIf(
				app.isBuild,
				groupCSSMediaQueries()
			)
		)
		.pipe(
			autoPrefixer({
				// grid: "no-autoplace",
				cascade: false,
			})
		)
		.pipe(app.gulp.dest(app.path.build.css))
		.pipe(
			app.plugins.gulpIf(
				app.isBuild,
				cleanCSS()
			)
		)
		.pipe(rename({
			extname: ".min.css",
		}))
		.pipe(app.gulp.dest(app.path.build.css))
		.pipe(app.plugins.browserSync.stream())
}

export default scss