qx.Class.define("ca.opennms.ui.views.InfrastructureOpennmsView", {
	extend : qx.ui.tabview.Page,
	construct : function() {
		this.base(arguments, "DC Infrastructure", "images/icons/16/infra.png");
		this.setLayout(new qx.ui.layout.Grow());
		this.setPadding(0);
		this.setShowCloseButton(false);


		var explorer = new qx.ui.tabview.TabView();

                var page3 = new qx.ui.tabview.Page("Open NMS Topology", "images/icons/16/infra.png");
                page3.setLayout(new qx.ui.layout.Grow());
                var frame = new qx.ui.embed.ThemedIframe();
                frame.addListener("load", function(e) {
                this.debug("Loaded: " + this.getSource());
                });
                frame.setSource("http://207.162.8.249/resource/network/examples/opennmstopo.html");
                page3.add(frame);
                page3.setPaddingTop(3);

                var page4 = new qx.ui.tabview.Page("Multipath Topology", "images/icons/16/infra.png");
                page4.setLayout(new qx.ui.layout.Grow());
                var frame1 = new qx.ui.embed.ThemedIframe();
                frame1.addListener("load", function(e) {
                this.debug("Loaded: " + this.getSource());
                });
                frame1.setSource("http://207.162.8.249/resource/network/examples/multipathtopo.html");
                page4.add(frame1);
                page4.setPaddingTop(3);


                explorer.setBarPosition("left");
		explorer.add(page3);
                explorer.add(page4);
		explorer.setContentPadding(0);

		
		this.add(explorer);
	},
	members : {
		_tableModel : null,
		_rowData : null,

		_callbackFunc : function(map) {
			var service = new ca.opennms.services.ResourceService();
			var netservice = new ca.opennms.services.NetworkService();
			var two = [100, 0];
			this._rowData.push([false, map.resource_name, map.description, "Network", "Noviflow", "Connecting", two]);
			/*map.provider = qx.core.Environment.get("ca.inocybe.domain");
			 map.category = "Infrastructure";
			 map.doctype = "substrate_instance";
			 if (map.resource_type == "Connection") {
			 map.subcategory = "Network";
			 service.write(map);
			 netservice.provision(map);
			 } else {
			 map.subcategory = "Compute";
			 service.write(map);
			 }*/
			qx.event.Timer.once(function() {
			 console.log("Timer ran");
			 var model = this._tableModel.getData();
			 var data = model[0];
			 console.log(model);
			 data[5] = "Connected";
			 model[0] = data;
			 this._tableModel.setData(model);
			 }, this, 3000);
			qx.event.Timer.once(function() {
				console.log("Timer ran");
				this._tableModel.setData(this._rowData);
			}, this, 100);
		},
		_loadRows : function(rowCount) {
			var now = new Date().getTime();
			var dateRange = 400 * 24 * 60 * 60 * 1000;
			// 400 days
			var nextId = 0;
			var two = [100, 0];
			/**var url = "/db/sample_db/_design/substrate_instances/_view/all";
			 var req = new qx.io.request.Xhr();
			 req.setUrl(url);
			 req.setMethod("GET");
			 req.setParser("json");
			 req.addListener("success", function(e) {
			 var req = e.getTarget();
			 var response = req.getResponse();
			 console.log(response);
			 response.rows.forEach(function(row) {
			 rowData.push([false, row.value.name, row.value.description, row.value.subcategory, row.value.provider, two]);
			 }, this);
			 }, this);
			 req.send();
			 */
			return this._rowData;
		}
	}
});
