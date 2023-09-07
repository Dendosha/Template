import gulp from "gulp"
import path from "../config/path.js"
import plugins from "../config/plugins.js"

import gulpSvgSprite from "gulp-svg-sprite"

const svgSprite = () => {
	return gulp.src(path.src.svgIcons, {})
		.pipe(plugins.plumber(
			plugins.notify.onError({
				title: 'SVG Sprite',
				message: 'Error: <%= error.message %>'
			})
		))
		.pipe(gulpSvgSprite({
			mode: {
				stack: {
					sprite: `../icons/icons.svg`,
					example: true,
				},
			},
		}))
		.pipe(gulp.dest(path.build.img))
}

export default svgSprite