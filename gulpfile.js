const gulp = require("gulp");
const less = require("gulp-less");
const rename = require("gulp-rename");
const concat = require("gulp-rigger");
const browserSync = require("browser-sync");
const minCSS = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");
const media = require("gulp-group-css-media-queries");

const {
	src,
	dest,
	series,
	watch
} = require("gulp");

const path = {
	src: {
		blocks: "src/blocks",
		html: "src/index.html",
		style: "src/style/less/style.less",
		js: "src/js/*.js",
		img: "src/img/**/*.*",
		fonts: "src/fonts/*.*"
	},

	build: {
		html: "build/",
		style: "build/style/",
		js: "build/js/",
		img: "build/img/",
		fonts: "build/fonts/"
	}
}

function liveServer() {
	browserSync.init({
		server: {
			baseDir: "./build"
		},
		online: false,
		notify: false
	});
};

function style() {
	return src(path.src.style)
		.pipe(less())
		.pipe(dest(path.build.style))
		.pipe(autoprefixer("last 3 version"))
		.pipe(minCSS())
		.pipe(media())
		.pipe(dest(path.build.style))
		.pipe(browserSync.stream())
}

function fonts() {
	return src(path.src.fonts)
		.pipe(dest(path.build.fonts))
}

function img() {
	return src(path.src.img)
		.pipe(dest(path.build.img))
		.pipe(browserSync.stream())
}

function html() {
	return src("src/tpl/index.html")
		.pipe(concat())
		.pipe(dest("src/"))
		// .pipe(browserSync.stream())
}

watch(["src/**/*.html" , "!src/index.html"], html)
// watch(["src/style/less/*.less"], style)
// watch([path.src.img], img)


exports.default = series(html);