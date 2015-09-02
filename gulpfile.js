var gulp = require( 'gulp' ),
    uglify = require( 'gulp-uglify' ),
    jshint = require( 'gulp-jshint' ),
    rename = require( 'gulp-rename' );

gulp.task( 'build', function() {
	return gulp.src( 'little.js' )
	       .pipe( jshint() )
	       .pipe( jshint.reporter( 'default' ) )
	       .pipe( uglify() )
	       .pipe( rename( 'little.min.js' ) )
	       .pipe( gulp.dest( './dist' ) );
} );