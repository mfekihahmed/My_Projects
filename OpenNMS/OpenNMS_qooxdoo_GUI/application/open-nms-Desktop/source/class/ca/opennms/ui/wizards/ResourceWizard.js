qx.Class.define("ca.opennms.ui.wizards.ResourceWizard", {
	extend : dialog.Wizard,
	properties : {
		url : {
			check : "String",
			init : false,
			event : "changeUrl"
		},
		pageData : {
			refine : true,
			init : [{
				"message" : "<img style='float:left;padding-right:10px;' src='resource/images/icons/16/library.png'/><p style='font-size:16px;font-weight:bold'>Add new DataCenter Resource</p><p>This wizard will guide you in the resource add process</p><div style='clear:both;'/>",
				"formData" : {
						
						"name" : {
							"type" : "textfield",
							"label" : "DataCenter Resource Name"
						},
						"description" : {
							"type" : "textfield",
							"label" : "DataCenter Resource Description"
						},
                                                "resource_type" : {
							"type" : "selectbox",
							"label" : "Resource Type",
							"options" : [{
								"label" : "Server",
								"value" : "Server"
							},{
								"label" : "Open vSwitch",
								"value" : "Open vSwitch"
							},{
								"label" : "Open NMS Slice",
								"value" : "Open NMS Slice"
							}]
						},
                                                "IP_Address" : {
							"type" : "textfield",
							"label" : "DataCenter Resource IP Address if existed"
						},
                                                "Manufacturer" : {
							"type" : "textfield",
							"label" : "DataCenter Resource'Manufacturer"
						}
					}
			}]
		}
	},
	construct : function() {
		this.base(arguments);
		this.pagedata = [{
			"message" : "<img style='float:left;padding-right:10px;' src='resource/images/icons/16/library.png'/><p style='font-size:16px;font-weight:bold'>Add new DataCenter Resource</p><p>This wizard will guide you in the resource add process</p><div style='clear:both;'/>",
			"formData" : {
						
						"name" : {
							"type" : "textfield",
							"label" : "DataCenter Resource Name"
						},
						"description" : {
							"type" : "textfield",
							"label" : "DataCenter Resource Description"
						},
                                                "resource_type" : {
							"type" : "selectbox",
							"label" : "Resource Type",
							"options" : [{
								"label" : "Server",
								"value" : "Server"
							},{
								"label" : "Open vSwitch",
								"value" : "Open vSwitch"
							},{
								"label" : "Open NMS Slice",
								"value" : "Open NMS Slice"
							}]
						},
                                                "IP_Address" : {
							"type" : "textfield",
							"label" : "DataCenter Resource IP Address if existed"
						},
                                                "Manufacturer" : {
							"type" : "textfield",
							"label" : "DataCenter Resource'Manufacturer"
						}
					}
		}];
	},
	members : {
		//_firstPage : null,
		/**
		 * Goes to the next wizard page
		 */
		/* goForward : function() {
		 var page = this.getPage();
		 if(page == 0) {
		 var obj = qx.util.Serializer.toNativeObject(this.getModel());
		 this._loadPageData(obj.resource_type);
		 this._firstPage = obj;
		 }

		 if(page > this.getPageData().length - 2) {
		 this.error("Cannot go forward!");
		 this.setPage(++page);

		 }
		 },
		 /**
		 * Finishes the wizard. Calls callback with the result data map
		 */
		finish : function() {
			this.hide();
			if (this.getCallback()) {
				var nativeModel = qx.util.Serializer.toNativeObject(this.getModel());
				nativeModel.name = this._firstPage.name;
				nativeModel.description = this._firstPage.description;
				nativeModel.resource_type = this._firstPage.resource_type;
				this.getCallback()(nativeModel);
			}
			this.resetCallback();
		}
		/*_loadPageData : function(type) {
		/*var url = "/db/system_inocybe/_design/wizard/_view/by_type?key=\"" + type + "\"";
		// Instantiate request
		var req = new qx.io.request.Xhr();
		// Set URL (mandatory)
		req.setUrl(url);

		// Set method (defaults to GET)
		req.setMethod("GET");
		req.setParser("json");

		req.addListener("success", function(e) {
		var req = e.getTarget();
		var response = req.getResponse();
		console.log(response);
		var pData = response.rows[0].value.page_data;
		var newPageData = this.getPageData().slice(0, 1).concat(pData);
		console.log(newPageData);
		this.setPageData(newPageData);
		var page = this.getPage();
		this.setPage(++page);

		}, this);
		req.send(); */
		//}
	}
});
