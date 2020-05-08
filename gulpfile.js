//подключаем модули галпа
const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const browserSync = require('browser-sync').create();


//Порядок подключения CSS файлов
// const cssFiles = [
// 	'./src/css/main.css',
// 	'./src/css/media.css'
// ]

//Порядок подключения JS файлов
const jsFiles = [
	'./src/js/lib.js',
	'./src/js/main.js'
]

// Таск на стили CSS
function styles() {
	//Шаблон для поиска файлов CSS
	//Все файлы по шаблону './src/css/**/*.css'
	return gulp.src('./src/css/**/*.css')
	.pipe(concat('style.css'))
	//Добавить префиксы
	.pipe(autoprefixer({
	 		overrideBrowserslist: ['last 2 versions'],
            cascade: false
    }))
    //Минификация CSS
	.pipe(cleanCSS({
		level: 2
	}))
	//Выходная папка для стилей
	.pipe(gulp.dest('./build/css'))
	.pipe(browserSync.stream());
}

// Таск на стили JS
function scripts() {
	//Шаблон для поиска файлов JS
	//Все файлы по шаблону './src/js/**/*.js'
	return gulp.src(jsFiles)
	//Обьединение файлов в один
	.pipe(concat('script.js'))
	//Минификация JS
	.pipe(uglify({
		toplevel: true
	}))
	//Выходная папка для скриптов
	.pipe(gulp.dest('./build/js'))
	.pipe(browserSync.stream());
}

//Удалить все в указаной папке
function clean() {
	return del(['build/*'])
}

//Просматривать файлы
function watch() {
	 browserSync.init({
        server: {
            baseDir: "./"
        }
    })
	//Следить за CSS файлами
	gulp.watch('./src/css/**/*.css', styles)
	//Следить за JS файлами
	gulp.watch('./src/js/**/*.js', scripts)
	//При изменении HTML запустить синхронизацию 
	gulp.watch("./*.html").on('change', browserSync.reload);
}

// Таск вызывающий функцию styles
gulp.task('styles', styles);

// Таск вызывающий функцию scripts
gulp.task('scripts', scripts);

//Таск для очистки папки build
gulp.task('del', clean);

//Таск для отслеживания изменений
gulp.task('watch', watch);

//Таск для удаления файлов в папке build и запуск styles и scripts
gulp.task('build', gulp.series(clean, gulp.parallel(styles,scripts)));

//Таск запускает таски build и watch последовательно
gulp.task('dev', gulp.series('build', 'watch'))


