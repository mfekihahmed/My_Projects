qx.Class.define("ca.inocybe.ui.views.InfrastructureExplorerView", {
	extend : qx.ui.tabview.Page,
	construct : function() {
		this.base(arguments, "Substrate Explorer", "images/icons/16/substrate.png");
		this.setLayout(new qx.ui.layout.Grow());
		this.setPadding(0);
		this.setShowCloseButton(false);
		this._rowData = [];
		var two = [100, 0];
		var explorer = new qx.ui.tabview.TabView();
		// var page = new qx.ui.tabview.Page("Resources");
		// page.setLayout(new qx.ui.layout.VBox());
		// page.setPaddingTop(3);
		var page2 = new qx.ui.tabview.Page("Graph");
				// page2.add(button, {left: "10%", top: "10%", width: "15%", height: "10%"});
		// draw2d
		draw2d.Connection.createConnection = function(sourcePort, targetPort){
		   // return my special kind of connection
		   return canvas.createConnection(sourcePort, targetPort);
		};
		var canvas = "";
		var offset = "";
		var portCounter = 0;
		var counter = true;
  		var switchArrayOfId = new Array();
  		var hostArrayOfId = new Array();
  		var jsonTopo = "";
		page2.setLayout(new qx.ui.layout.VBox());
		explorer.setBarPosition("bottom");
		// explorer.add(page);
		page2.setDroppable(true);
		page2.addListenerOnce('appear', function(){

			page2.getContentElement().getDomElement().setAttribute("id","page2");
			var page2Div = $(page2.getContentElement().getDomElement());
			$('<div id="bareMetalEle"></div>').appendTo(page2Div.parent());
			$('#bareMetalEle').hide();
			canvas = new graphApp.Application("page2");
			var rightStats = $('#rightStats');
			var svgDom = $('#page2 svg');
			var doc = $(document);
			var leWindow = $(window);

			leWindow.on('resize', function() {
			  svgDom.width(page2Div.width());
			  svgDom.height(page2Div.height());
			console.log("page2 size after: " + page2Div.width() + ", " + page2Div.height());
			});

			doc.keyup(function(e) {
			  if (e.keyCode == 27 && !rightStats.is(':hidden')) {
				rightStats.hide();
			  } 
			});
			page2Div.on('click', function(e) {	
			  if (!rightStats.is(':hidden')) {
				rightStats.hide();
			  } 
			});
			$('#xClose').on('click', function(e){
				rightStats.hide();
			});
		});
		page2.addListener("drop", function(e){
			if(counter){
				offset = $(page2.getContentElement().getDomElement()).offset();
				counter = false;
			}

			var selectedType = e.getRelatedTarget().getSelection()[0].$$user_model.$$user_elType;
			var elName = e.getRelatedTarget().getSelection()[0].$$user_label;
			var mouseX = e.getDocumentLeft()-offset.left;
			console.log(e.getDocumentLeft() + " - " + offset.left + " = " + mouseX);
			var mouseY = e.getDocumentTop()-offset.top;
			console.log(e.getDocumentLeft() + " - " + offset.top + " = " + mouseY);
			var element = "";
			if($('#toggleButton').text() == "Virtual view"){
				if(selectedType == "controller"){
					element = new Openstack("resource/openstack.png", 50, 50);
				}
				if(elName == "Rackspace"){
					element = new Openstack("resource/EC2Cloud.png", 50, 50);
				}
				if(elName == "Amazon"){
					element = new Openstack("resource/RackspaceCloud.png", 50, 50);
				}
		        var locator = new draw2d.layout.locator.Locator(element);
		        var port = new draw2d.HybridPort("port"+portCounter);
		        portCounter++;
		        // algo to place elements and ports
		        element.addPort(port, locator, 0, 0);
		  		
		  		canvas.view.addFigure(element, mouseX, mouseY);

			}
	  		// check if dropped element intersects with a figure on the canvas, if so, add it to its VM list
			for(var i = 0; i < canvas.view.getFigures().size; i++){
				var figure = canvas.view.getFigures().get(i);
				var coord = new Array(mouseX, mouseY);
				if(figure.isCoordInEle(coord)){
					figure.addVm(elName);
					// do request to actually install the thing ?
					break; // only adds it to the first element it intersects (prevents multiple drop if elements intersect at drop point)
				}
			}
		});
		explorer.add(page2);
		explorer.setContentPadding(0);

		// table model
		// var tableModel = new qx.ui.table.model.Simple();
		// tableModel.setColumns(["", "Name", "Description", "Type", "Provider", "Status", "Monitor"]);
		// this._rowData.push([false, "map.resource_name", "map.description", "Network", "Noviflow", "Connecting", two]);

		// qx.event.Timer.once(function() {
		// 	console.log("Initial Timer ran");
		// 	tableModel.setData(this._rowData);
		// 	console.log(this._rowData);
		// }, this, 1000);
		// /// make second column editable
		// tableModel.setColumnEditable(1, true);
		// // table
		// var custom = {
		// 	tableColumnModel : function(obj) {
		// 		return new qx.ui.table.columnmodel.Resize(obj);
		// 	}
		// };

		// // table
		// var table = new qx.ui.table.Table(tableModel, custom);

		// var tColMod = table.getTableColumnModel();
		// var resizeBehavior = tColMod.getBehavior();

		// // We could also set them individually:c
		// // We could also set them individually:
		// resizeBehavior.setWidth(0, "5%");

		// resizeBehavior.setWidth(1, "15%");
		// // We could also set them individually:
		// resizeBehavior.setWidth(2, "30%");
		// // We could also set them individually:
		// resizeBehavior.setWidth(3, "15%");

		// resizeBehavior.setWidth(4, "15%");

		// resizeBehavior.setWidth(5, "10%");
		// resizeBehavior.setWidth(6, "10%");

		// var doubleBarRenderer = new canvascell.Renderer(new canvascell.plotter.DoubleBar({
		// 	upFill : '#0b0',
		// 	upBorder : '#0a0',
		// 	downFill : '#b00',
		// 	downBorder : '#a00'
		// }));

		// tColMod.setDataCellRenderer(6, doubleBarRenderer);
		// tColMod.setDataCellRenderer(0, new qx.ui.table.cellrenderer.Boolean());

		// table.setDraggable(true);
		// // create the toolbar
		// toolbar = new qx.ui.toolbar.ToolBar();
		// toolbar.setSpacing(5);

		// create and add Part 1 to the toolbar
		// var part1 = new qx.ui.toolbar.Part();
		// var newButton = new qx.ui.toolbar.Button("New", "images/icons/24/substrate_new.png");
		// newButton.addListener("execute", function() {
		// 	var reswiz = new ca.inocybe.ui.wizards.SubstrateWizard();
		// 	reswiz.set({
		// 		width : 400,
		// 		pageData : [{
		// 			"message" : "<img style='float:left;padding-right:10px;' src='resource/images/icons/48/substrate.png'/><p style='font-size:16px;font-weight:bold'>Create new substrate</p><p>This wizard will guide you in the resource creation process</p><div style='clear:both;'/>",
		// 			"formData" : {
		// 				"resource_name" : {
		// 					"type" : "textfield",
		// 					"label" : "Resource Name"
		// 				},
		// 				"description" : {
		// 					"type" : "textfield",
		// 					"label" : "Resource Description"
		// 				},
		// 				"resource_type" : {
		// 					"type" : "selectbox",
		// 					"label" : "Resource Type",
		// 					"value" : "Connection",
		// 					"options" : [{
		// 						"label" : "Novikit 100",
		// 						"value" : "Novikit 100"
		// 					}]
		// 				}
		// 			}
		// 		}, {
		// 			"message" : "<p style='font-weight:bold'>Novikit 100</p><p>Please enter the switch information</p>",
		// 			"formData" : {
		// 				"ipaddr" : {
		// 					"type" : "textfield",
		// 					"label" : "Switch IP Address"
		// 				},
		// 				"protocol" : {
		// 					"type" : "selectbox",
		// 					"label" : "Protocol",
		// 					"value" : "Protocol",
		// 					"options" : [{
		// 						"label" : "Proprietary",
		// 						"value" : "Proprietary"
		// 					}, {
		// 						"label" : "OpenFlow Config",
		// 						"value" : "OpenFlow Config"
		// 					}]
		// 				},
		// 				"transport" : {
		// 					"type" : "selectbox",
		// 					"label" : "Transport",
		// 					"value" : "Transport",
		// 					"options" : [{
		// 						"label" : "TLS",
		// 						"value" : "TLS"
		// 					}, {
		// 						"label" : "TCP",
		// 						"value" : "TCP"
		// 					}]
		// 				}
		// 			}
		// 		}],
		// 		callback : this._callbackFunc,
		// 		context : this
		// 	})
		// 	reswiz.start();
		// }, this);
		// var editButton = new qx.ui.toolbar.Button("Edit", "images/icons/24/substrate_edit.png");
		// var deleteButton = new qx.ui.toolbar.Button("Delete", "images/icons/24/substrate_delete.png");
		// var refreshButton = new qx.ui.toolbar.Button("Refresh", "images/icons/24/refresh.png");
		// refreshButton.addListener("execute", function() {
		// 	qx.event.Timer.once(function() {
		// 		console.log("Timer ran");
		// 		//	tableModel.setData(this._loadRows());
		// 	}, this, 1000);
		// }, this);
		// part1.add(newButton);
		// part1.add(new qx.ui.toolbar.Separator());
		// part1.add(editButton);
		// part1.add(new qx.ui.toolbar.Separator());
		// part1.add(deleteButton);
		// part1.add(new qx.ui.toolbar.Separator());
		// part1.add(refreshButton);
		// toolbar.add(part1);
		// page.add(toolbar);
		// page.add(table);
		this.add(explorer);
		// this._tableModel = tableModel;
	},
	members : {
		_tableModel : null,
		_rowData : null,

		_callbackFunc : function(map) {
			var service = new ca.inocybe.services.ResourceService();
			var netservice = new ca.inocybe.services.NetworkService();
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
