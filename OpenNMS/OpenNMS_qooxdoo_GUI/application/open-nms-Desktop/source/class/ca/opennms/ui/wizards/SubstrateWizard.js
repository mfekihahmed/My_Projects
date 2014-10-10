qx.Class.define("ca.opennms.ui.wizards.SubstrateWizard", {
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
				"message" : "<img style='float:left;padding-right:10px;' src='resource/images/icons/16/substrate.png'/><p style='font-size:16px;font-weight:bold'>Create new substrate</p><p>This wizard will guide you in the resource creation process</p><div style='clear:both;'/>",
				"formData" : {
					"name" : {
						"type" : "textfield",
						"label" : "Resource Name"
					},
					"description" : {
						"type" : "textfield",
						"label" : "Resource Description"
					},
					"resource_type" : {
						"type" : "selectbox",
						"label" : "Resource Type",
						"value" : "Connection",
						"options" : [{
							"label" : "Host",
							"value" : "Host"
						}, {
							"label" : "Facility",
							"value" : "Facility"
						}, {
							"label" : "Power Distribution Unit",
							"value" : "PDU"
						}, 
						{
							"label" : "Power Source",
							"value" : "Power Source"
						},{
							"label" : "Cloud",
							"value" : "Cloud"
						}]
					}
				}
			}, {
				"message" : "<p style='font-weight:bold'>Resource Type</p><p>Select the type of resource to create</p>",
				"formData" : {

				}
			}]
		}
	},
	members : {
		_firstPage : null,
		/**
		 * Goes to the next wizard page
		 */
		goForward : function() {
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
			if(this.getCallback()) {
				var nativeModel = qx.util.Serializer.toNativeObject(this.getModel());
				nativeModel.name = this._firstPage.name;
				nativeModel.description = this._firstPage.description;
				nativeModel.resource_type = this._firstPage.resource_type;
				this.getCallback()(nativeModel);
			}
			this.resetCallback();
		},
		_loadPageData : function(type) {
			var url = "/db/system_inocybe/_design/wizard/_view/by_type?key=\"" + type + "\"";
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
			req.send();
		}
	}
});
