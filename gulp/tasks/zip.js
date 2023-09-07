import gulp from "gulp"
import path from "../config/path.js"
import plugins from "../config/plugins.js"

import { deleteAsync } from "del";
import gulpZip from "gulp-zip";

const zip = () => {
	deleteAsync(`./${path.rootFolder}.zip`)
	return gulp.src(`${path.buildFolder}/**/*.*`, {})
		.pipe(plugins.plumber(
			plugins.notify.onError({
				title: 'ZIP',
				message: 'Error: <%= error.message %>'
			})
		))
		.pipe(gulpZip(`${path.rootFolder}.zip`))
		.pipe(gulp.dest('./'))
}

export default zip