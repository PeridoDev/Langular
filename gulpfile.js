var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {

    mix.babel('./resources/assets/app/**/*.js');
	mix.sass('./resources/assets/app/**/*.scss');
 	mix.copy('./resources/assets/app/**/*.html', 'public/template');
	mix.version(['js/all.js', 'css/app.css']);
	
	mix.browserSync({
		host: 'dev.langular.se',
		proxy: 'dev.langular.se',
		open: 'local',
		reloadDelay: 3000,
		files: './resources/assets/app/**'
	});

});