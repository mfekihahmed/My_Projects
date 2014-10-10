/* ************************************************************************

Copyright: Inocybe Technologies inc.

License: Proprietary

Authors: Mathieu Lemay

************************************************************************ */

/*************************************************************************

 #asset(icons/*)
 #asset(*)
 ************************************************************************ */

/**
 * This is the main application class of your custom application "rmc"
 */
qx.Class.define("ca.inocybe.boot.Application", {
	extend : qx.application.Standalone,
	/*
	 *****************************************************************************
	 MEMBERS
	 *****************************************************************************
	 */

	members : {
		__domain : null,
		__workbench : null,
		__loginService : new ca.inocybe.services.LoginService(),
		__createLogin : function(m) {
			var url = "images/open_nms.png";
			var loginWidget = new ca.inocybe.ui.dialogs.LoginDialog({
				image : qx.util.ResourceManager.getInstance().toUri(url),
				text : "Please enter login information:",
				callback : this.__loginService.login,
				context : this
			});

			loginWidget.addListener("loginSuccess", this.loginSuccess, this);

			loginWidget.addListener("loginFailure", function(e) {
				dialog.Dialog.error(e.getData());
			});
			if (m) {
				loginWidget.show();
			} else {
				this.loginSuccess();
			}
		},
		loginSuccess : function() {
			var loader = new ca.inocybe.boot.ProgressiveLoader();
			/**loader.addListener("resize", function() {
			 this.center();
			 }, loader);**/
			var dataModel = new qx.ui.progressive.model.Default();
			loader.setDataModel(dataModel);

			qx.io.PartLoader.require(["workbench"], function() {
				// if the window is not created
				if (!this.__workbench) {
					// create it
					this.__workbench = new ca.inocybe.ui.core.workbench.Workbench();
					qx.core.Init.getApplication().getRoot().add(this.__workbench, {
						edge : 0
					});
				}
			});
		},
		/**
		 * This method contains the initial application code and gets called
		 * during startup of the application
		 *
		 * @lint ignoreDeprecated(alert)
		 */

		main : function() {
			// Call super class
			this.base(arguments);
			// Enable logging in debug variant
			if (qx.core.Environment.get("qx.debug")) {
				// support native logging capabilities, e.g. Firebug for Firefox
				qx.log.appender.Native
				// support additional cross-browser console. Press F7 to toggle visibility
				qx.log.appender.Console
			}
			qx.Theme.include(ca.inocybe.theme.Appearance, collapsablepanel.theme.modern.Appearance);

			/*
			 -------------------------------------------------------------------------
			 Below is your actual application code...
			 ----- --------------------------------------------------------------------
			 */
			if (qx.core.Environment.get("console.nologin") == true) {
				this.debug("Console Login Disabled");
				this.__createLogin(false);
			} else {
				this.debug("Console Login Enabled");
                               // var doc = this.getRoot();
                               // this.setBackgroundColor("white");
				this.__createLogin(true);
			}
			
		}
	}
});
