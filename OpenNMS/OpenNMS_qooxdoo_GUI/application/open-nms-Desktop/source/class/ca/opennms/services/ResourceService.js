qx.Class.define("ca.opennms.services.ResourceService", {
	extend : qx.core.Object,
	members : {
		write : function(doc) {
			var url = "/db/sample_db";
			var req = new qx.io.request.Xhr();
			req.setUrl(url);
			req.setMethod("POST");
			req.setParser("json");
			req.setRequestData(qx.util.Json.stringify(doc));
			req.addListener("success", function(e) {
				var req = e.getTarget();
				var response = req.getResponse();
				console.log(response);
			});
			req.send();
		}
	}
});
