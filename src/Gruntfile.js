module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			dist: {
				files: {
					'_css/style.css' : 'sass/style.scss'
				}
			}
		},

		autoprefixer: {
		    options: {
		      	browsers: ['last 2 versions', 'ie 9', '> 0.5%'] 
		    },
		    main: {
		        expand: true,
		        flatten: true,
		        src: '_css/style.css',
		        dest: 'css/'
		    }
	    },
	    clean: {
		    foo: {
		      src: ['css/*', '_css/*'],

		    },
	    },
		watch: {
			 css: {
				files: '**/*.scss',
				tasks: ['clean', 'sass']
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('compile',['watch']);
	grunt.registerTask('prefix',['autoprefixer']);
}
