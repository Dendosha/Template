import gulp from "gulp"
import path from "./gulp/config/path.js"
import plugins from "./gulp/config/plugins.js"

import copy from "./gulp/tasks/copy.js"
import reset from "./gulp/tasks/reset.js"
import server from "./gulp/tasks/server.js"
import html from "./gulp/tasks/html.js"
import scss from "./gulp/tasks/scss.js"
import js from "./gulp/tasks/js.js"
import images from "./gulp/tasks/images.js"
import spriteSvg from "./gulp/tasks/svgSprite.js"
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js"
import zip from "./gulp/tasks/zip.js"

global.app = {
	isBuild: process.argv.includes('--build'),
	isDev: !process.argv.includes('--build'),
	gulp: gulp,
	path: path,
	plugins: plugins,
}

function watcher() {
	gulp.watch(path.watch.files, copy)
	gulp.watch(path.watch.html, html)
	gulp.watch(path.watch.scss, scss)
	gulp.watch(path.watch.js, js)
	gulp.watch(path.watch.images, images)
}

export { spriteSvg }

const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle)

const mainTasks = gulp.parallel(copy, html, scss, js, images)

const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server))
const build = gulp.series(reset, mainTasks)
const deployZIP = gulp.series(reset, mainTasks, zip)

export { dev }
export { build }
export { deployZIP }
export { fonts }

gulp.task('default', dev)