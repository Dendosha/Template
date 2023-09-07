import gulp from "gulp"
import path from "./gulp/config/path.js"

import reset from "./gulp/tasks/reset.js"
import html from "./gulp/tasks/html.js"
import server from "./gulp/tasks/server.js"
import scss from "./gulp/tasks/scss.js"
import js from "./gulp/tasks/js.js"
import img from "./gulp/tasks/img.js"
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js"
import svgSprite from "./gulp/tasks/svgSprite.js"
import zip from "./gulp/tasks/zip.js"

global.app = {
	isBuild: process.argv.includes('--build'),
	isDev: !process.argv.includes('--build'),
}

function watcher() {
	gulp.watch(path.watch.html, html)
	gulp.watch(path.watch.scss, scss)
	gulp.watch(path.watch.js, js)
	gulp.watch(path.watch.img, img)
}

const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle)
const mainTasks = gulp.series(fonts, gulp.parallel(html, scss, js, img))
const updateFiles = gulp.series(reset, mainTasks)

const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server))
const build = gulp.series(reset, mainTasks)
const deployZIP = gulp.series(reset, mainTasks, zip)

gulp.task('default', dev)

export { dev }
export { build }
export { deployZIP }

export { fonts }
export { updateFiles }
export { svgSprite }