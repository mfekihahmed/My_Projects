/* ************************************************************************
 Copyright: Public Domain
 ************************************************************************ */

qx.Class.define("ca.inocybe.demo.Application", {
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
			var win = new qx.ui.window.Window("Canvas");
			var term = new ca.inocybe.ui.editor.Diagram();
			win.setWidth(300);
			win.setHeight(200);
			win.setShowMinimize(false);
			win.setLayout(new qx.ui.layout.VBox(10));
			win.add(term);
			this.getRoot().add(win);
			win.open();
		}
	}
});
