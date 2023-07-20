import fileinclude from "gulp-file-include"
import webpHTML from "gulp-webp-html-nosvg"
import versionNumber from "gulp-version-number"

const html = () => {
	return app.gulp.src(app.path.src.html)
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: 'HTML',
				message: '<%= error.message %>',
			})
		))
		.pipe(fileinclude())
		.pipe(app.plugins.replace(/@img\//g, 'img/'))
		.pipe(
			app.plugins.gulpIf(
				app.isBuild,
				webpHTML()
			)
		)
		.pipe(
			app.plugins.gulpIf(
				app.isBuild,
				versionNumber({
					'value': '%DT%',
					'append': {
						'key': '_v',
						'cover': 0,
						'to': [
							'css',
							'js',
						],
					},
					'output': {
						'file': 'gulp/version.json'
					}
				})
			)
		)
		.pipe(app.gulp.dest(app.path.build.html))
		.pipe(app.plugins.browserSync.stream())
}

export default html