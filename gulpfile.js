// Instanciando módulos
var gulp = require('gulp');
var gutil = require('gulp-util');
var watch = require('gulp-watch');
// Minifiy and concat
var addsrc = require('gulp-add-src')
var concat = require("gulp-concat");;
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
// Monitorameto do NodeJS
var nodemon = require('gulp-nodemon');
var notify  = require('gulp-notify');
// Games Building
var fs = require('fs');
var path = require('path');
var merge = require('merge-stream');
// Games scripts
var scriptsPath = 'app/src/games/';
var destPath = 'app/dist/games/';

// Configuração
var files = [
	{
		watch: 'app/src/main/*.js',
		output: './app/dist/',
		name: 'app.js',
		nameMin: 'app.min.js'
	}, {
		watch: 'app/src/controllers/**/*.js',
		output: './app/dist/',
		name: 'controllers.js',
		nameMin: 'controllers.min.js'
	}, {
		watch: 'app/directives/**/*.js',
		output: './app/dist/',
		name: 'directives.js',
		nameMin: 'directives.min.js'
	}, {
		watch: 'app/libs/js/*.js',
		output: './app/dist/',
		name: 'libs.js',
		nameMin: 'libs.min.js'
	}, {
		watch: 'app/src/**/*.css',
		output: './app/dist/',
		name: 'theme.css',
		nameMin: 'theme.min.css'
	}, {
		watch: 'app/libs/css/*.css',
		output: './app/dist/',
		name: 'libs.css',
		nameMin: 'libs.min.css'
	}
];
//END Configuração

gulp.task('watchJS', function () {
	for (var j in files) {
		watchedBuild(files[j]);
	}
});

/**
 * Realiza o build a cada alteração no arquivo
 */
function watchedBuild(data){
  	watch(data.watch, function(ev) {
  		gutil.log('Arquivo ' + ev.path + ' alterado. Rebuild...');
	  	gulp.src(data.watch)
			.pipe(concat(data.name))
			.pipe(gulp.dest(data.output))
				// Minificação nao funfa:
				//.pipe(uglify({outSourceMap: false})).pipe(rename(data.nameMin))
			.pipe(gulp.dest(data.output));
  });
}
/**
 * Realiza o build a cada alteração na pasta de jogos
 */
function watchGames(){

	var game = {
		watch: 'app/src/games/**/*.js',
		output: './app/dist/',
		name: 'controllers.js',
		nameMin: 'controllers.min.js'
	}

	watch(game.watch, function(ev) {

	  	gulp.src(game.watch)
			.pipe(concat(game.name))
			.pipe(gulp.dest(game.output))
			.pipe(gulp.dest(game.output));
  });

}

/**
 * Starta o servidor
 */
gulp.task('server', function (cb) {
	gutil.log('Iniciando servidor...');
  	// Configuração do NodeMon
    nodemon({
        script: './server/index.js', // Entry point do server
        watch: ["/server/index.js"], // Listener pra restartar a aplicação
        ext: 'js'
    }).on('restart', function() {
    	gutil.log('Server restart...');
  });
});

function getFolders(dir) {
    return fs.readdirSync(dir)
	      .filter(function(file) {
	        return fs.statSync(path.join(dir, file)).isDirectory();
	      });
}

function buildGames(){

   	var folders = getFolders(scriptsPath);
   	var tasks = folders.map(function(folder) {
    	return gulp.src(path.join(scriptsPath, folder, '/*.js'))
        	.pipe(concat(folder + '.js'))
        	.pipe(gulp.dest(destPath))
        	.pipe(gulp.dest(destPath));
	});
   	// Merge
	return merge(tasks);

}

gulp.task('buildGames', function(){
	return buildGames();
});

gulp.task('watchGames', function(){
	watch(scriptsPath + '/**/*.js', function(ev) {
		gutil.log('Arquivo ' + ev.path + ' alterado. Rebuild...');
  		buildGames();
  	});
});

// Gera tasks
gulp.task('runApp', ['default']);
gulp.task('build', ['buildGames']);
gulp.task('watch', ['watchGames', 'watchJS']);
gulp.task('default', ['watchJS', 'watchGames', 'server']);
