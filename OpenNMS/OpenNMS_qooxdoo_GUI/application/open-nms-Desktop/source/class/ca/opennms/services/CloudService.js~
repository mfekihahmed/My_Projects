qx.Class.define("ca.inocybe.services.CloudService", {
	extend : qx.core.Object,
	construct : function() {
		this.__createInstanceService();
	},
	members : {
		instances : null,

		__createInstanceService : function() {
			var description = {
				index : {
					method : "GET",
					url : "/cloud/api/instances?format=json"
				},

				create : {
					method : "POST",
					url : "/cloud/api/instances"
				},

				show : {
					method : "GET",
					url : "/cloud/api/instances/:id"
				},

				update : {
					method : "PUT",
					url : "/cloud/api/instances/:id"
				},

				destroy : {
					method : "DELETE",
					url : "/cloud/api/instances/:id"
				}
			}

			this.instances = new qx.io.rest.Resource(description);
			this.instances.configureRequest(function(req, action) {
				//	  req.setAccept("application/json");
				var auth = new qx.io.request.authentication.Basic("mockuser", "mockpassword");
				req.setAuthentication(auth);
			})
			
			//	var domain = qx.core.Environment.get("ca.inocybe.domain");
			var url = "/db/system_inocybe";
			var req = new qx.io.request.Xhr();
			req.setUrl(url);
			req.setMethod("POST");
			req.setParser("json");
			req.setRequestData(qx.util.Json.stringify({"test":"value"}));
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
		   req.send();
		}
	}
});
