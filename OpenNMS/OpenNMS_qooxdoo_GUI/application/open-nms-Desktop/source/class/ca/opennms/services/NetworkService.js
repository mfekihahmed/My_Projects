qx.Class.define("ca.opennms.services.NetworkService", {
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
		provision : function(map) {
			var domain = qx.core.Environment.get("ca.opennms.domain");
			var url = "/nsa/Reserve?source=\"" + map.source_stp + "\"&dest=\"" + map.dest_stp + "\"";
			var id;
			var req = new qx.io.request.Xhr();
			req.setUrl(url);
			req.setMethod("GET");
			req.setParser("json");
			req.addListener("success", function(e) {
				var req = e.getTarget();
				var response = req.getResponse();
				id = response.connection.id;
				console.log(response);
			}, this);
			req.addListener("fail", function(e) {
			//	callback.call(context, false, "Could not connect!");
			});
			req.send();

		}
	}
});
