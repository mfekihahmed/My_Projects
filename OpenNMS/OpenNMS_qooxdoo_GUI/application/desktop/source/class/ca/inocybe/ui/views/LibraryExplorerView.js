qx.Class.define("ca.inocybe.ui.views.LibraryExplorerView", {
	extend : qx.ui.tabview.Page,
	construct : function() {
		this.base(arguments, "Library Explorer", "icons/16/library.png");
		this.setLayout(new qx.ui.layout.Grow());
		this.setPadding(0);
		this.setShowCloseButton(true);

		var explorer = new qx.ui.tabview.TabView();
		var page = new qx.ui.tabview.Page("Resources");
		page.setLayout(new qx.ui.layout.VBox());
		page.setPaddingTop(3);
		explorer.setBarPosition("bottom");
		explorer.add(page);
		explorer.setContentPadding(0);

		// table model
		var tableModel = new qx.ui.table.model.Simple();
		tableModel.setColumns(["", "Name", "Description", "Type", "Provider", "Status"]);
		qx.event.Timer.once(function() {
			tableModel.setData(this._loadRows());
		}, this, 1000);
		// make second column editable
		tableModel.setColumnEditable(1, true);
		// table
		var custom = {
			tableColumnModel : function(obj) {
				return new qx.ui.table.columnmodel.Resize(obj);
			}
		};

		// table
		var table = new qx.ui.table.Table(tableModel, custom);

		var tColMod = table.getTableColumnModel();
		var resizeBehavior = tColMod.getBehavior();

		// We could also set them individually:
		// We could also set them individually:
		resizeBehavior.setWidth(0, "5%");

		resizeBehavior.setWidth(1, "15%");
		// We could also set them individually:
		resizeBehavior.setWidth(2, "30%");
		// We could also set them individually:
		resizeBehavior.setWidth(3, "15%");

		resizeBehavior.setWidth(4, "15%");

		resizeBehavior.setWidth(5, "20%");

		var doubleBarRenderer = new canvascell.Renderer(new canvascell.plotter.DoubleBar({
			upFill : '#0b0',
			upBorder : '#0a0',
			downFill : '#b00',
			downBorder : '#a00'
		}));

		tColMod.setDataCellRenderer(5, doubleBarRenderer);
		tColMod.setDataCellRenderer(0, new qx.ui.table.cellrenderer.Boolean());

		table.setDraggable(true);
		// create the toolbar
		toolbar = new qx.ui.toolbar.ToolBar();
		toolbar.setSpacing(5);

		// create and add Part 1 to the toolbar
		var part1 = new qx.ui.toolbar.Part();
		var newButton = new qx.ui.toolbar.Button("New", "images/icons/24/library_new.png");
		newButton.addListener("execute", function() {
			var reswiz = new ca.inocybe.ui.wizards.ResourceWizard();
			reswiz.set({
				width : 400,
				pageData : [{
					"message" : "<img style='float:left;padding-right:10px;' src='resource/images/icons/48/library.png'/><p style='font-size:16px;font-weight:bold'>Create new resource</p><p>This wizard will guide you in the resource creation process</p><div style='clear:both;'/>",
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
							"options" : [{
								"label" : "Virtual Switch",
								"value" : "Virtual Switch"
							}]
						},
						"substrate" : {
							"type" : "selectbox",
							"label" : "Substrate",
							"options" : [{
								"label" : "Novikit 100",
								"value" : "Novikit 100"
							}]
						}
					}
				}],
				callback : this._callbackFunc
			})
			reswiz.start();
		}, this);
		var editButton = new qx.ui.toolbar.Button("Edit", "images/icons/24/library_edit.png");
		var cloneButton = new qx.ui.toolbar.Button("Clone", "images/icons/24/library_clone.png");
		var deleteButton = new qx.ui.toolbar.Button("Delete", "images/icons/24/library_delete.png");
		var refreshButton = new qx.ui.toolbar.Button("Refresh", "images/icons/24/refresh.png");
		refreshButton.addListener("execute", function() {
			qx.event.Timer.once(function() {
				console.log("Timer ran");
				tableModel.setData(this._loadRows());
			}, this, 1000);
		}, this);
		part1.add(newButton);
		part1.add(new qx.ui.toolbar.Separator());
		part1.add(editButton);
		part1.add(new qx.ui.toolbar.Separator());
		part1.add(cloneButton);
		part1.add(new qx.ui.toolbar.Separator());
		part1.add(deleteButton);
		part1.add(new qx.ui.toolbar.Separator());
		part1.add(refreshButton);
		toolbar.add(part1);
		page.add(toolbar);
		page.add(table);
		this.add(explorer);
		this._tableModel = tableModel;
	},
	members : {
		_tableModel : null,
		_callbackFunc : function(map) {
			var service = new ca.inocybe.services.ResourceService();
			var netservice = new ca.inocybe.services.NetworkService();
			map.provider = qx.core.Environment.get("ca.inocybe.domain");
			map.category = "Infrastructure";
			map.doctype = "resource_instance";
			if (map.resource_type == "Connection") {
				map.subcategory = "Network";
				service.write(map);
				netservice.provision(map);
			} else {
				map.subcategory = "Compute";
				service.write(map);
			}
			qx.event.Timer.once(function() {
				console.log("Timer ran");
				this._tableModel.setData(this._loadRows());
			}, this, 1000);
		},
		_loadRows : function(rowCount) {
			var rowData = [];
			var now = new Date().getTime();
			var dateRange = 400 * 24 * 60 * 60 * 1000;
			// 400 days
			var nextId = 0;
			var two = [100, 0];
			rowData.push([false, "Testbed Switch", "Testbed Noviswitch", "Network", "Noviflow", two]);

			/**	var url = "/db/sample_db/_design/resource_instances/_view/all";
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
			return rowData;
			//return [false, row.value.name, row.value.description, row.value.subcategory, row.value.provider, two]
		}
	}
});
