/* ************************************************************************
 Copyright: Public Domain
 ************************************************************************ */

qx.Class.define("noVNC.demo.Application", {
	extend : qx.application.Standalone,
	members : {
		main : function() {
			this.base(arguments);
			if(qx.core.Environment.get("qx.debug") == "on") {
				// support native logging capabilities, e.g. Firebug for Firefox
				qx.log.appender.Native
				// support additional cross-browser console. Press F7 to toggle visibility
				qx.log.appender.Console
			};
			var term = new noVNC.Terminal();
			this.getRoot().add(term);
			term.show();
		}
	}
});
