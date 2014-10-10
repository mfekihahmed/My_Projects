qx.Class.define("ca.opennms.services.LoginService", {
	extend : qx.core.Object,
	members : {
		/**
		 * Sample callback function that takes the username, password and
		 * another callback function as parameters. The passed function
		 * is called with a boolean value (true=authenticated, false=
		 * authentication failed) and a string value which contains
		 * an error message like so:
		 * callback.call( context, {Boolean} result, {String} message);
		 * @param username {String}
		 * @param password {String}
		 * @param callback {Function} The callback function
		 * @param context {Object} The execution context
		 */
		login : function(username, password, otppasswd, callback, context) {
			var url = "/login" + username + "\"";
			if (username == "system" && password =="ets3.4ecolo"){
				callback.call(context, true);
			}
			else{
				callback.call(context, false, "Invalid Login Credentials!");
			}
		/*	var req = new qx.io.request.Xhr();
			req.setUrl(url);
			req.setMethod("POST");
			req.setParser("json");
			req.addListener("success", function(e) {
				var req = e.getTarget();
				var response = req.getResponse();
				console.log(response);
				if(response.rows[0]) {
					if(password == response.rows[0].value.password) {
						console.log("otp:" + otppasswd);
						if(otppasswd != null) {
							callback.call(context, true);
						} else {
							callback.call(context, false, "Invalid Hardware Key!");
						}
					} else {
						callback.call(context, false, "Wrong password!");
					}
				} else {
					callback.call(context, false, "User not found!");
				}

			});
			req.addListener("fail", function(e) {
				callback.call(context, false, "Could not connect!");
			});
			req.send(); */
		}
	}
});
