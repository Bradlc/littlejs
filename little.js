(function(window){

	'use strict';

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
		if( document.readyState === "complete" || (!document.attachEvent && document.readyState === "interactive") ) {

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

	window.little = {
		ready: ready
	};

})(window);