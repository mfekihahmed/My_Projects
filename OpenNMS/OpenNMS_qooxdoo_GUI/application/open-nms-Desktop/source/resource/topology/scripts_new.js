/*
 * This file is part of Canviz. See http://www.canviz.org/
 * $Id: scripts_new.js 256 2009-01-08 11:14:07Z ryandesign.com $
 */
var canviz;
document.observe('dom:loaded', function() {
	//new Canviz('canviz', 'graph-xdot.gv');
	canviz = new Canviz('canviz');
	canviz.load('graph-xdot.gv');
});
