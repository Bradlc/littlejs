(function(window, document){

	'use strict';

	/*----------------------------*\
		TODO:
		wrap() - wrap element(s) in a new container element
		unwrap()
		move() - move element(s)
	\*----------------------------*/

	/*----------------------------*\
		Document Ready
		https://github.com/jfriend00/docReady
	\*----------------------------*/
	var ready,
	    readyList = [],
	    readyFired = false,
	    readyEventHandlersInstalled = false;

	function onready() {
		if ( !readyFired ) {
			readyFired = true;
			for( var i = 0; i < readyList.length; i++ ) {
				readyList[i].fn.call( window, readyList[i].ctx );
			}
			readyList = [];
		}
	}

	function readyStateChange() {
		if( document.readyState === "complete" ) {
			onready();
		}
	}

	ready = function( callback, context ) {

		if( readyFired ) {
			setTimeout( function() {
				callback( context );
			}, 1 );
			return;
		} else {
			readyList.push( {fn: callback, ctx: context} );
		}
		if( document.readyState === "complete" || ( !document.attachEvent && document.readyState === "interactive" ) ) {

			setTimeout( onready, 1 );

		} else if( !readyEventHandlersInstalled ) {

			if( document.addEventListener ) {
				document.addEventListener( "DOMContentLoaded", onready, false );
				window.addEventListener( "load", onready, false );
			} else {
				document.attachEvent( "onreadystatechange", readyStateChange );
				window.attachEvent( "onload", onready );
			}
			readyEventHandlersInstalled = true;

		}

	};

	/*----------------------------*\
		Query Selector Functions
	\*----------------------------*/
	function qs( selector, context ) {
		context = ( typeof context === 'undefined' ) ? document : context;
		return context.querySelector( selector );
	}

	function qsa( selector, context ) {
		context = ( typeof context === 'undefined' ) ? document : context;
		return context.querySelectorAll( selector );
	}

	/*----------------------------*\
		Manipulation
	\*----------------------------*/
	function remove( elem ) {
		elem = elem.length ? elem : [elem];
		for( var i = 0; i < elem.length; i++ ) {
			elem[i].parentNode.removeChild( elem[i] );
		}
	}

	/*----------------------------*\
		Styles
	\*----------------------------*/
	function windowWidth() {
		return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	}

	function windowHeight() {
		return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	}

	/*----------------------------*\
		Class Helper Functions
		Adapted from classie by desandro: https://github.com/desandro/classie
	\*----------------------------*/
	var hasClass, addClass, removeClass;

	function classReg( className ) {
		return new RegExp( "(^|\\s+)" + className + "(\\s+|$)" );
	}

	if ( 'classList' in document.documentElement ) {
		hasClass = function( elem, c ) {
			return elem.classList.contains( c );
		};
		addClass = function( elem, c ) {
			elem = elem.length ? elem : [elem];
			for( var i = 0; i < elem.length; i++ ) {
				elem[i].classList.add( c );
			}
		};
		removeClass = function( elem, c ) {
			elem = elem.length ? elem : [elem];
			for( var i = 0; i < elem.length; i++ ) {
				elem[i].classList.remove( c );
			}
		};
	} else {
		hasClass = function( elem, c ) {
			return classReg( c ).test( elem.className );
		};
		addClass = function( elem, c ) {
			elem = elem.length ? elem : [elem];
			for( var i = 0; i < elem.length; i++ ){
				if ( !hasClass( elem[i], c ) ) {
					elem[i].className = elem[i].className + ' ' + c;
				}
			}
		};
		removeClass = function( elem, c ) {
			elem = elem.length ? elem : [elem];
			for( var i = 0; i < elem.length; i++ ){
				elem[i].className = elem[i].className.replace( classReg( c ), ' ' );
			}
		};
	}

	function toggleClass( elem, c ) {
		elem = elem.length ? elem : [elem];
		for( var i = 0; i < elem.length; i++ ){
			var fn = hasClass( elem[i], c ) ? removeClass : addClass;
			fn( elem[i], c );
		}
	}

	/*----------------------------*\
		Event Handlers
	\*----------------------------*/
	function on( type, elem, selector, fn ) {

		fn = ( typeof selector === 'function' ) ? selector : fn;
		elem = ( elem.length ) ? elem : [elem];

		function listener( e ) {

			/* jshint validthis: true */

			if( typeof selector === 'string' ){

				var target = e.target.closest( selector );

				if( target ) {

					fn.apply( target, [e] );

				}

			} else {

				fn.apply( this, [e] );

			}

		}

		for( var i = 0; i < elem.length; i++ ) {

			elem[i].addEventListener( type, listener );

		}

	}

	window.little = {
		qs: qs,
		qsa: qsa,
		util: {
			ready: ready,
			remove: remove,
			windowWidth: windowWidth,
			windowHeight: windowHeight,
			addClass: addClass,
			removeClass: removeClass,
			toggleClass: toggleClass,
			hasClass: hasClass,
			on: on
		}
	};

})(window, document);