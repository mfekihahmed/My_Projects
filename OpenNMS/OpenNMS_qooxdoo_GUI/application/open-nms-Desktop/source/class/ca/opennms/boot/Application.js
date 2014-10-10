/* ************************************************************************

Copyright: opennms

License: Proprietary

Authors: Mohamed Fekih Ahmed

************************************************************************ */

/*************************************************************************

 #asset(icons/*)
 #asset(*)
 ************************************************************************ */

/**
 * This is the main application class of your custom application "rmc"
 */
qx.Class.define("ca.opennms.boot.Application", {
	extend : qx.application.Standalone,
	/*
	 *****************************************************************************
	 MEMBERS
	 *****************************************************************************
	 */

	members : {
		__domain : null,
		__workbench : null,
		__loginService : new ca.opennms.services.LoginService(),
		__createLogin : function(m) {
			var url = "images/opennms1.png";
			var loginWidget = new ca.opennms.ui.dialogs.LoginDialog({
				image : qx.util.ResourceManager.getInstance().toUri(url),
				text : "Please enter Administrator login information:",
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
			var loader = new ca.opennms.boot.ProgressiveLoader();
			/**loader.addListener("resize", function() {
			 this.center();
			 }, loader);**/
			var dataModel = new qx.ui.progressive.model.Default();
			loader.setDataModel(dataModel);

			qx.io.PartLoader.require(["workbench"], function() {
				// if the window is not created
				if (!this.__workbench) {
					// create it
					this.__workbench = new ca.opennms.ui.core.workbench.Workbench();
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
			qx.Theme.include(ca.opennms.theme.Appearance, collapsablepanel.theme.modern.Appearance);

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
				this.__createLogin(true);
			}
			
		}
	}
});
