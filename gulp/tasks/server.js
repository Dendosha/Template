import path from "../config/path.js"
import plugins from "../config/plugins.js"

const server = (done) => {
	plugins.browserSync.init({
		server: {
			baseDir: `${path.build.html}`,
		},
		notify: false,
		port: 3000,
	})
}

export default server