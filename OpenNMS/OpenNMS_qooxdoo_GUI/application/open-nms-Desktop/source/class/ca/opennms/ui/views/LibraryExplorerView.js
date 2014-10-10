qx.Class.define("ca.opennms.ui.views.LibraryExplorerView", {
	extend : qx.ui.tabview.Page, 
        //include : [qx.dev.unit.TestCase],
        
	construct : function() {
		this.base(arguments, "DC Explorer", "images/icons/16/cube.png");
		this.setLayout(new qx.ui.layout.Grow());
		this.setPadding(0);
		this.setShowCloseButton(false);

		var explorer = new qx.ui.tabview.TabView();
		var page = new qx.ui.tabview.Page("Blades", "images/icons/16/service.png");
		page.setLayout(new qx.ui.layout.VBox());
		page.setPaddingTop(3);

                var page1 = new qx.ui.tabview.Page("H. Switches", "images/icons/16/service.png");
		page1.setLayout(new qx.ui.layout.VBox());
		page1.setPaddingTop(3);

                var page2 = new qx.ui.tabview.Page("Open vSwitches", "images/icons/16/service.png");
		page2.setLayout(new qx.ui.layout.VBox());
		page2.setPaddingTop(3);

                 var page3 = new qx.ui.tabview.Page("Open NMS Slices", "images/icons/16/service.png");
		page3.setLayout(new qx.ui.layout.VBox());
		page3.setPaddingTop(3);

                var page4 = new qx.ui.tabview.Page("Controllers", "images/icons/16/service.png");
		page4.setLayout(new qx.ui.layout.VBox());
		page4.setPaddingTop(3);
                
                var page5 = new qx.ui.tabview.Page("VMs", "icons/16/vm.png");
		page5.setLayout(new qx.ui.layout.VBox());
		page5.setPaddingTop(3);


		explorer.setBarPosition("left");
               //explorer.setBarPosition("bottom");
		explorer.add(page);
                explorer.add(page1);
                explorer.add(page2);
                explorer.add(page3);
                explorer.add(page4);
                explorer.add(page5);
		explorer.setContentPadding(0);




		// table model EBS
		var tableModel = new qx.ui.table.model.Simple();
		tableModel.setColumns(["", "Name", "Description", "Type", "IP Address", "Manufacturer", "Substrate", "Status"]);
		qx.event.Timer.once(function() {
                      
			tableModel.setData(this._loadRows());
                        
		}, this, 1000);
		tableModel.setColumnEditable(0, true);
		var custom = {
			tableColumnModel : function(obj) {
				return new qx.ui.table.columnmodel.Resize(obj);
			}
		};
		var table = new qx.ui.table.Table(tableModel, custom);

		var tColMod = table.getTableColumnModel();
		var resizeBehavior = tColMod.getBehavior();
		resizeBehavior.setWidth(0, "5%");
		resizeBehavior.setWidth(1, "15%");
		resizeBehavior.setWidth(2, "10%");
		resizeBehavior.setWidth(3, "10%");
		resizeBehavior.setWidth(4, "15%");
                resizeBehavior.setWidth(5, "15%");
		resizeBehavior.setWidth(6, "15%");
                resizeBehavior.setWidth(7, "15%");
		var doubleBarRenderer = new canvascell.Renderer(new canvascell.plotter.DoubleBar({
			upFill : '#0b0',
			upBorder : '#0a0',
			downFill : '#f60',
			downBorder : '#e60'
		}));
		tColMod.setDataCellRenderer(7, doubleBarRenderer);
		tColMod.setDataCellRenderer(0, new qx.ui.table.cellrenderer.Boolean());
		table.setDraggable(true);



               // table model Hswitch
		var tableModel1 = new qx.ui.table.model.Simple();
		tableModel1.setColumns(["", "Name", "Description", "Type", "IP Address", "Manufacturer", "Substrate", "Status"]);
		qx.event.Timer.once(function() {
                      
			tableModel1.setData(this._loadHSwitchRows());
                        
		}, this, 1000);
		tableModel1.setColumnEditable(0, true);
		var custom1 = {
			tableColumnModel : function(obj) {
				return new qx.ui.table.columnmodel.Resize(obj);
			}
		};
		var table1 = new qx.ui.table.Table(tableModel1, custom1);

		var tColMod1 = table1.getTableColumnModel();
		var resizeBehavior1 = tColMod1.getBehavior();
		resizeBehavior1.setWidth(0, "5%");
		resizeBehavior1.setWidth(1, "15%");
		resizeBehavior1.setWidth(2, "10%");
		resizeBehavior1.setWidth(3, "10%");
		resizeBehavior1.setWidth(4, "15%");
                resizeBehavior1.setWidth(5, "15%");
		resizeBehavior1.setWidth(6, "15%");
                resizeBehavior1.setWidth(7, "15%");
		var doubleBarRenderer = new canvascell.Renderer(new canvascell.plotter.DoubleBar({
			upFill : '#0b0',
			upBorder : '#0a0',
			downFill : '#f60',
			downBorder : '#e60'
		}));
		tColMod1.setDataCellRenderer(7, doubleBarRenderer);
		tColMod1.setDataCellRenderer(0, new qx.ui.table.cellrenderer.Boolean());
		table1.setDraggable(true);



                // table model OVS
		var tableModel2 = new qx.ui.table.model.Simple();
		tableModel2.setColumns(["", "Name", "DatapathID", "IP Address", "Ctrl Port", "Substrate", "Status", "Nbr Tables", "Max Flows/Table", "Ports", "Description", "Type", "Manufacturer"]);
		qx.event.Timer.once(function() {
                      
			tableModel2.setData(this._loadOVSRows());
                        
		}, this, 1000);
		tableModel2.setColumnEditable(0, true);
		var custom2 = {
			tableColumnModel : function(obj) {
				return new qx.ui.table.columnmodel.Resize(obj);
			}
		};
		var table2 = new qx.ui.table.Table(tableModel2, custom2);

		var tColMod2 = table2.getTableColumnModel();
		var resizeBehavior2 = tColMod1.getBehavior();
		resizeBehavior1.setWidth(0, "5%");
		resizeBehavior1.setWidth(1, "15%");
		resizeBehavior1.setWidth(2, "10%");
		resizeBehavior1.setWidth(3, "10%");
		resizeBehavior1.setWidth(4, "15%");
                resizeBehavior1.setWidth(5, "15%");
		resizeBehavior1.setWidth(6, "15%");
                resizeBehavior1.setWidth(7, "15%");
		var doubleBarRenderer = new canvascell.Renderer(new canvascell.plotter.DoubleBar({
			upFill : '#0b0',
			upBorder : '#0a0',
			downFill : '#f60',
			downBorder : '#e60'
		}));
		tColMod2.setDataCellRenderer(6, doubleBarRenderer);
		tColMod2.setDataCellRenderer(0, new qx.ui.table.cellrenderer.Boolean());
		table2.setDraggable(true);


                // table model open nms slice
		var tableModel3 = new qx.ui.table.model.Simple();
		tableModel3.setColumns(["", "Name", "Description", "Type", "IP Address", "Manufacturer", "Substrate", "Status"]);
		qx.event.Timer.once(function() {
                      
			tableModel3.setData(this._loadSliceRows());
                        
		}, this, 1000);
		tableModel3.setColumnEditable(0, true);
		var custom3 = {
			tableColumnModel : function(obj) {
				return new qx.ui.table.columnmodel.Resize(obj);
			}
		};
		var table3 = new qx.ui.table.Table(tableModel3, custom3);

		var tColMod3 = table3.getTableColumnModel();
		var resizeBehavior3 = tColMod1.getBehavior();
		resizeBehavior3.setWidth(0, "5%");
		resizeBehavior3.setWidth(1, "15%");
		resizeBehavior3.setWidth(2, "10%");
		resizeBehavior3.setWidth(3, "10%");
		resizeBehavior3.setWidth(4, "15%");
                resizeBehavior3.setWidth(5, "15%");
		resizeBehavior3.setWidth(6, "15%");
                resizeBehavior3.setWidth(7, "15%");
		var doubleBarRenderer = new canvascell.Renderer(new canvascell.plotter.DoubleBar({
			upFill : '#0b0',
			upBorder : '#0a0',
			downFill : '#f60',
			downBorder : '#e60'
		}));
		tColMod3.setDataCellRenderer(7, doubleBarRenderer);
		tColMod3.setDataCellRenderer(0, new qx.ui.table.cellrenderer.Boolean());
		table3.setDraggable(true);
                

                // table model controller
		var tableModel4 = new qx.ui.table.model.Simple();
		tableModel4.setColumns(["", "Name", "Description", "Type", "IP Address", "Port", "Manufacturer", "Status"]);
		qx.event.Timer.once(function() {
                      
			tableModel4.setData(this._loadCRows());
                        
		}, this, 1000);
		tableModel4.setColumnEditable(0, true);
		var custom4 = {
			tableColumnModel : function(obj) {
				return new qx.ui.table.columnmodel.Resize(obj);
			}
		};
		var table4 = new qx.ui.table.Table(tableModel4, custom4);

		var tColMod4 = table4.getTableColumnModel();
		var resizeBehavior4 = tColMod1.getBehavior();
		resizeBehavior4.setWidth(0, "5%");
		resizeBehavior4.setWidth(1, "15%");
		resizeBehavior4.setWidth(2, "10%");
		resizeBehavior4.setWidth(3, "10%");
		resizeBehavior4.setWidth(4, "15%");
                resizeBehavior4.setWidth(5, "15%");
		resizeBehavior4.setWidth(6, "15%");
                resizeBehavior4.setWidth(7, "15%");
		var doubleBarRenderer = new canvascell.Renderer(new canvascell.plotter.DoubleBar({
			upFill : '#0b0',
			upBorder : '#0a0',
			downFill : '#f60',
			downBorder : '#e60'
		}));
		tColMod4.setDataCellRenderer(7, doubleBarRenderer);
		tColMod4.setDataCellRenderer(0, new qx.ui.table.cellrenderer.Boolean());
		table4.setDraggable(true);


               // table model VMs
		var tableModel5 = new qx.ui.table.model.Simple();
		tableModel5.setColumns(["", "Name", "Description", "Type", "IP Address", "EBS", "Manufacturer", "Status"]);
		qx.event.Timer.once(function() {
                      
			tableModel5.setData(this._loadVMRows());
                        
		}, this, 1000);
		tableModel5.setColumnEditable(0, true);
		var custom5 = {
			tableColumnModel : function(obj) {
				return new qx.ui.table.columnmodel.Resize(obj);
			}
		};
		var table5 = new qx.ui.table.Table(tableModel5, custom5);

		var tColMod5 = table5.getTableColumnModel();
		var resizeBehavior5 = tColMod1.getBehavior();
		resizeBehavior5.setWidth(0, "5%");
		resizeBehavior5.setWidth(1, "15%");
		resizeBehavior5.setWidth(2, "10%");
		resizeBehavior5.setWidth(3, "10%");
		resizeBehavior5.setWidth(4, "15%");
                resizeBehavior5.setWidth(5, "15%");
		resizeBehavior5.setWidth(6, "15%");
                resizeBehavior5.setWidth(7, "15%");
		var doubleBarRenderer = new canvascell.Renderer(new canvascell.plotter.DoubleBar({
			upFill : '#0b0',
			upBorder : '#0a0',
			downFill : '#f60',
			downBorder : '#e60'
		}));
		tColMod5.setDataCellRenderer(7, doubleBarRenderer);
		tColMod5.setDataCellRenderer(0, new qx.ui.table.cellrenderer.Boolean());
		table5.setDraggable(true);




               //EBS toolbar
		toolbar = new qx.ui.toolbar.ToolBar();
		toolbar.setSpacing(7);
		// create and add Part 1 to the toolbar
		var part1 = new qx.ui.toolbar.Part();
		var newButton = new qx.ui.toolbar.Button("Create", "images/icons/24/new.png");
		newButton.addListener("execute", function() {
                var server = this._loadServers();
                var slices = this._loadSlices();
                var ovs = this._loadOVS();
                var serverslicesovs = "[" + server + ", " + ovs + ", " + slices + "]" ;
		var reswiz = new dialog.Wizard();
		reswiz.set({
		width : 500,
                allowCancel : true,
                allowBack : true,
                allowNext : true, 
                allowFinish : true,
		pageData : qx.lang.Json.parse(serverslicesovs),
                callback : function( map ){
                this.__workbench = new ca.opennms.ui.core.workbench.Workbench();
		qx.core.Init.getApplication().getRoot().add(this.__workbench, {
		edge : 0
		});
                },
                context     : this
		})
		reswiz.start();
		}, this);
		var editButton = new qx.ui.toolbar.Button("Edit", "images/icons/24/edit.png");
		var runButton = new qx.ui.toolbar.Button("Run", "images/icons/24/run.png");
                var stopButton = new qx.ui.toolbar.Button("Stop", "images/icons/24/stop.png");
		var deleteButton = new qx.ui.toolbar.Button("Delete", "images/icons/24/delete.png");
                var refreshButton = new qx.ui.toolbar.Button("Update", "images/icons/24/refresh.png");
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
		part1.add(deleteButton);
		part1.add(new qx.ui.toolbar.Separator());
		part1.add(refreshButton);    
                part1.add(new qx.ui.toolbar.Separator());
                part1.add(runButton); 
		part1.add(new qx.ui.toolbar.Separator());
		part1.add(stopButton);
		toolbar.add(part1);




                //Hswitch toolbar
		toolbar2 = new qx.ui.toolbar.ToolBar();
		toolbar2.setSpacing(7);
		// create and add Part 1 to the toolbar
		var part2 = new qx.ui.toolbar.Part();
		var newButton2 = new qx.ui.toolbar.Button("Create", "images/icons/24/new.png");
		newButton2.addListener("execute", function() {
		var reswiz2 = new dialog.Wizard();
		reswiz2.set({
		width : 500,
                allowCancel : true,
                allowBack : true,
                allowNext : true, 
                allowFinish : true,
		pageData : qx.lang.Json.parse(serverslicesovs),
                callback : function( map ){
                this.__workbench = new ca.opennms.ui.core.workbench.Workbench();
		qx.core.Init.getApplication().getRoot().add(this.__workbench, {
		edge : 0
		});
                },
                context     : this
		})
		reswiz2.start();
		}, this);
		var editButton2 = new qx.ui.toolbar.Button("Edit", "images/icons/24/edit.png");
		var runButton2 = new qx.ui.toolbar.Button("Run", "images/icons/24/run.png");
                var stopButton2 = new qx.ui.toolbar.Button("Stop", "images/icons/24/stop.png");
		var deleteButton2 = new qx.ui.toolbar.Button("Delete", "images/icons/24/delete.png");
                var refreshButton2 = new qx.ui.toolbar.Button("Update", "images/icons/24/refresh.png");
		refreshButton2.addListener("execute", function() {
			qx.event.Timer.once(function() {
				console.log("Timer ran");
				tableModel1.setData(this._loadHSwitchRows());
			}, this, 1000);
		}, this);
		part2.add(newButton2);
		part2.add(new qx.ui.toolbar.Separator());
		part2.add(editButton2);
		part2.add(new qx.ui.toolbar.Separator());
		part2.add(deleteButton2);
		part2.add(new qx.ui.toolbar.Separator());
		part2.add(refreshButton2);    
                part2.add(new qx.ui.toolbar.Separator());
                part2.add(runButton2); 
		part2.add(new qx.ui.toolbar.Separator());
		part2.add(stopButton2);
		toolbar2.add(part2);
                

                //OVS toolbar
		toolbar3 = new qx.ui.toolbar.ToolBar();
		toolbar3.setSpacing(7);
		// create and add Part 1 to the toolbar
		var part3 = new qx.ui.toolbar.Part();
		var newButton3 = new qx.ui.toolbar.Button("Create", "images/icons/24/new.png");
		newButton3.addListener("execute", function() {
		var reswiz3 = new dialog.Wizard();
		reswiz3.set({
		width : 500,
                allowCancel : true,
                allowBack : true,
                allowNext : true, 
                allowFinish : true,
		pageData : qx.lang.Json.parse(serverslicesovs),
                callback : function( map ){
                this.__workbench = new ca.opennms.ui.core.workbench.Workbench();
		qx.core.Init.getApplication().getRoot().add(this.__workbench, {
		edge : 0
		});
                },
                context     : this
		})
		reswiz3.start();
		}, this);
		var editButton3 = new qx.ui.toolbar.Button("Edit", "images/icons/24/edit.png");
		var runButton3 = new qx.ui.toolbar.Button("Run", "images/icons/24/run.png");
                var stopButton3 = new qx.ui.toolbar.Button("Stop", "images/icons/24/stop.png");
		var deleteButton3 = new qx.ui.toolbar.Button("Delete", "images/icons/24/delete.png");
                var refreshButton3 = new qx.ui.toolbar.Button("Update", "images/icons/24/refresh.png");
		refreshButton3.addListener("execute", function() {
			qx.event.Timer.once(function() {
				console.log("Timer ran");
				tableModel2.setData(this._loadHSwitchRows());
			}, this, 1000);
		}, this);
		part3.add(newButton3);
		part3.add(new qx.ui.toolbar.Separator());
		part3.add(editButton3);
		part3.add(new qx.ui.toolbar.Separator());
		part3.add(deleteButton3);
		part3.add(new qx.ui.toolbar.Separator());
		part3.add(refreshButton3);    
                part3.add(new qx.ui.toolbar.Separator());
                part3.add(runButton3); 
		part3.add(new qx.ui.toolbar.Separator());
		part3.add(stopButton3);
		toolbar3.add(part3);







                //slice toolbar
		toolbar4 = new qx.ui.toolbar.ToolBar();
		toolbar4.setSpacing(7);
		// create and add Part 1 to the toolbar
		var part4 = new qx.ui.toolbar.Part();
		var newButton4 = new qx.ui.toolbar.Button("Create", "images/icons/24/new.png");
		newButton4.addListener("execute", function() {
		var reswiz4 = new dialog.Wizard();
		reswiz4.set({
		width : 500,
                allowCancel : true,
                allowBack : true,
                allowNext : true, 
                allowFinish : true,
		pageData : qx.lang.Json.parse(serverslicesovs),
                callback : function( map ){
                this.__workbench = new ca.opennms.ui.core.workbench.Workbench();
		qx.core.Init.getApplication().getRoot().add(this.__workbench, {
		edge : 0
		});
                },
                context     : this
		})
		reswiz4.start();
		}, this);
		var editButton4 = new qx.ui.toolbar.Button("Edit", "images/icons/24/edit.png");
		var runButton4 = new qx.ui.toolbar.Button("Run", "images/icons/24/run.png");
                var stopButton4 = new qx.ui.toolbar.Button("Stop", "images/icons/24/stop.png");
		var deleteButton4 = new qx.ui.toolbar.Button("Delete", "images/icons/24/delete.png");
                var refreshButton4 = new qx.ui.toolbar.Button("Update", "images/icons/24/refresh.png");
		refreshButton4.addListener("execute", function() {
			qx.event.Timer.once(function() {
				console.log("Timer ran");
				tableModel3.setData(this._loadHSwitchRows());
			}, this, 1000);
		}, this);
		part4.add(newButton4);
		part4.add(new qx.ui.toolbar.Separator());
		part4.add(editButton4);
		part4.add(new qx.ui.toolbar.Separator());
		part4.add(deleteButton4);
		part4.add(new qx.ui.toolbar.Separator());
		part4.add(refreshButton4);    
                part4.add(new qx.ui.toolbar.Separator());
                part4.add(runButton4); 
		part4.add(new qx.ui.toolbar.Separator());
		part4.add(stopButton4);
		toolbar4.add(part4);

                 

                //controller toolbar
		toolbar5 = new qx.ui.toolbar.ToolBar();
		toolbar5.setSpacing(7);
		// create and add Part 1 to the toolbar
		var part5 = new qx.ui.toolbar.Part();
		var newButton5 = new qx.ui.toolbar.Button("Create", "images/icons/24/new.png");
		newButton5.addListener("execute", function() {
		var reswiz5 = new dialog.Wizard();
		reswiz5.set({
		width : 500,
                allowCancel : true,
                allowBack : true,
                allowNext : true, 
                allowFinish : true,
		pageData : qx.lang.Json.parse(serverslicesovs),
                callback : function( map ){
                this.__workbench = new ca.opennms.ui.core.workbench.Workbench();
		qx.core.Init.getApplication().getRoot().add(this.__workbench, {
		edge : 0
		});
                },
                context     : this
		})
		reswiz5.start();
		}, this);
		var editButton5 = new qx.ui.toolbar.Button("Edit", "images/icons/24/edit.png");
		var runButton5 = new qx.ui.toolbar.Button("Run", "images/icons/24/run.png");
                var stopButton5 = new qx.ui.toolbar.Button("Stop", "images/icons/24/stop.png");
		var deleteButton5 = new qx.ui.toolbar.Button("Delete", "images/icons/24/delete.png");
                var refreshButton5 = new qx.ui.toolbar.Button("Update", "images/icons/24/refresh.png");
		refreshButton5.addListener("execute", function() {
			qx.event.Timer.once(function() {
				console.log("Timer ran");
				tableModel4.setData(this._loadHSwitchRows());
			}, this, 1000);
		}, this);
		part5.add(newButton5);
		part5.add(new qx.ui.toolbar.Separator());
		part5.add(editButton5);
		part5.add(new qx.ui.toolbar.Separator());
		part5.add(deleteButton5);
		part5.add(new qx.ui.toolbar.Separator());
		part5.add(refreshButton5);    
                part5.add(new qx.ui.toolbar.Separator());
                part5.add(runButton5); 
		part5.add(new qx.ui.toolbar.Separator());
		part5.add(stopButton5);
		toolbar5.add(part5);

               //VMS toolbar
		toolbar6 = new qx.ui.toolbar.ToolBar();
		toolbar6.setSpacing(7);
		// create and add Part 1 to the toolbar
		var part6 = new qx.ui.toolbar.Part();
		var newButton6 = new qx.ui.toolbar.Button("Create", "images/icons/24/new.png");
		newButton6.addListener("execute", function() {
		var reswiz6 = new dialog.Wizard();
		reswiz6.set({
		width : 500,
                allowCancel : true,
                allowBack : true,
                allowNext : true, 
                allowFinish : true,
		pageData : qx.lang.Json.parse(serverslicesovs),
                callback : function( map ){
                this.__workbench = new ca.opennms.ui.core.workbench.Workbench();
		qx.core.Init.getApplication().getRoot().add(this.__workbench, {
		edge : 0
		});
                },
                context     : this
		})
		reswiz6.start();
		}, this);
		var editButton6 = new qx.ui.toolbar.Button("Edit", "images/icons/24/edit.png");
		var runButton6 = new qx.ui.toolbar.Button("Run", "images/icons/24/run.png");
                var stopButton6 = new qx.ui.toolbar.Button("Stop", "images/icons/24/stop.png");
		var deleteButton6 = new qx.ui.toolbar.Button("Delete", "images/icons/24/delete.png");
                var refreshButton6 = new qx.ui.toolbar.Button("Update", "images/icons/24/refresh.png");
		refreshButton6.addListener("execute", function() {
			qx.event.Timer.once(function() {
				console.log("Timer ran");
				tableModel5.setData(this._loadHSwitchRows());
			}, this, 1000);
		}, this);
		part6.add(newButton6);
		part6.add(new qx.ui.toolbar.Separator());
		part6.add(editButton6);
		part6.add(new qx.ui.toolbar.Separator());
		part6.add(deleteButton6);
		part6.add(new qx.ui.toolbar.Separator());
		part6.add(refreshButton6);    
                part6.add(new qx.ui.toolbar.Separator());
                part6.add(runButton6); 
		part6.add(new qx.ui.toolbar.Separator());
		part6.add(stopButton6);
		toolbar6.add(part6);






		page.add(toolbar);
		page.add(table);
                page1.add(toolbar2);
		page1.add(table1);
                page2.add(toolbar3);
		page2.add(table2);
                page3.add(toolbar4);
		page3.add(table3);
                page4.add(toolbar5);
		page4.add(table4);
                page5.add(toolbar6);
		page5.add(table5);
		this.add(explorer);
		this._tableModel = tableModel;
	},
	members : {
		_tableModel : null,
		_callbackFunc : function(map) {
			var service = new ca.opennms.services.ResourceService();
			var netservice = new ca.opennms.services.NetworkService();
			map.provider = qx.core.Environment.get("ca.opennms.domain");
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
			var nextId = 0;



                         var urldb = "/couch/rlibrary/_design/rlibrary/_view/all";
			 var req = new qx.io.request.Xhr();
			 req.setUrl(urldb);
			 req.setMethod("GET");
                         req.setAsync(false);
			 req.setParser("json");
			
			 req.addListener("success", function(e) {
			 var req = e.getTarget();
			 var response = req.getResponse();
			 response.rows.forEach(function(row) {
			 rowData.push([false, row.value.name, row.value.description, row.value.type, row.value.ipaddress, row.value.manufacturer, row.value.substrate, row.value.status]);
                         
			 }, this);
			 }, this);
                         req.send();
                         return rowData;

		},
		_loadHSwitchRows : function(rowCount) {
			var rowData = [];
			var now = new Date().getTime();
			var dateRange = 400 * 24 * 60 * 60 * 1000;
			var nextId = 0;



                         var urldb = "/couch/hlibrary/_design/hlibrary/_view/all";
			 var req = new qx.io.request.Xhr();
			 req.setUrl(urldb);
			 req.setMethod("GET");
                         req.setAsync(false);
			 req.setParser("json");
			
			 req.addListener("success", function(e) {
			 var req = e.getTarget();
			 var response = req.getResponse();
			 response.rows.forEach(function(row) {
			 rowData.push([false, row.value.name, row.value.description, row.value.type, row.value.ipaddress, row.value.manufacturer, row.value.substrate, row.value.status]);
                         
			 }, this);
			 }, this);
                         req.send();
                         return rowData;

		},
		_loadOVSRows : function(rowCount) {
			var rowData = [];
			var now = new Date().getTime();
			var dateRange = 400 * 24 * 60 * 60 * 1000;
			var nextId = 0;



                         var urldb = "/couch/olibrary/_design/olibrary/_view/all";
			 var req = new qx.io.request.Xhr();
			 req.setUrl(urldb);
			 req.setMethod("GET");
                         req.setAsync(false);
			 req.setParser("json");
			
			 req.addListener("success", function(e) {
			 var req = e.getTarget();
			 var response = req.getResponse();
			 response.rows.forEach(function(row) {
			 rowData.push([false, row.value.name, row.value.dataPathId, row.value.ipaddress, row.value.ctlPort,  row.value.substrate, row.value.status, row.value.nbTables, row.value.maxPacketsBuffered, row.value.ports, row.value.description, row.value.type,  row.value.manufacturer]);
                         //["", "Name", "DatapathID", "IP Address", "Ctrl Port", "Substrate", "Status", "Nbr Tables", "Max Flows/Table", "Ports", "Description", "Type", "Manufacturer"])
			 }, this);
			 }, this);
                         req.send();
                         return rowData;

		},
		_loadSliceRows : function(rowCount) {
			var rowData = [];
			var now = new Date().getTime();
			var dateRange = 400 * 24 * 60 * 60 * 1000;
			var nextId = 0;



                         var urldb = "/couch/slibrary/_design/slibrary/_view/all";
			 var req = new qx.io.request.Xhr();
			 req.setUrl(urldb);
			 req.setMethod("GET");
                         req.setAsync(false);
			 req.setParser("json");
			
			 req.addListener("success", function(e) {
			 var req = e.getTarget();
			 var response = req.getResponse();
			 response.rows.forEach(function(row) {
			 rowData.push([false, row.value.name, row.value.description, row.value.type, row.value.ipaddress, row.value.manufacturer, row.value.substrate, row.value.status]);
                         
			 }, this);
			 }, this);
                         req.send();
                         return rowData;

		},
		_loadCRows : function(rowCount) {
			var rowData = [];
			var now = new Date().getTime();
			var dateRange = 400 * 24 * 60 * 60 * 1000;
			var nextId = 0;



                         var urldb = "/couch/clibrary/_design/clibrary/_view/all";
			 var req = new qx.io.request.Xhr();
			 req.setUrl(urldb);
			 req.setMethod("GET");
                         req.setAsync(false);
			 req.setParser("json");
			
			 req.addListener("success", function(e) {
			 var req = e.getTarget();
			 var response = req.getResponse();
			 response.rows.forEach(function(row) {
			 rowData.push([false, row.value.name, row.value.description, row.value.type, row.value.ipaddress,  row.value.port, row.value.manufacturer, row.value.status]);
                         
			 }, this);
			 }, this);
                         req.send();
                         return rowData;

		},
		_loadVMRows : function(rowCount) {
			var rowData = [];
			var now = new Date().getTime();
			var dateRange = 400 * 24 * 60 * 60 * 1000;
			var nextId = 0;



                         var urldb = "/couch/vmlibrary/_design/vmlibrary/_view/all";
			 var req = new qx.io.request.Xhr();
			 req.setUrl(urldb);
			 req.setMethod("GET");
                         req.setAsync(false);
			 req.setParser("json");
			
			 req.addListener("success", function(e) {
			 var req = e.getTarget();
			 var response = req.getResponse();
			 response.rows.forEach(function(row) {
			 rowData.push([false, row.value.name, row.value.description, row.value.type, row.value.ipaddress,  row.value.substrate, row.value.manufacturer, row.value.status]);
                         
			 }, this);
			 }, this);
                         req.send();
                         return rowData;

		},
                _loadServers : function() {
			 var servers = "";
                         var urldb = "/couch/server/_design/server/_view/all";
			 var req = new qx.io.request.Xhr();
			 req.setUrl(urldb);
			 req.setMethod("GET");
                         req.setAsync(false);
			 req.setParser("json");
			
			 req.addListener("success", function(e) {
			 var req = e.getTarget();
			 var response = req.getResponse();
			 response.rows.forEach(function(row) {
                         //console.log("Server row.value.message", row.value.message);
                         //console.log("Server row.value.formData ", qx.lang.Json.stringify(row.value.formData));
                          servers = "{ \"message\": \"" +   row.value.message + "\" , \"formData\": " + qx.lang.Json.stringify(row.value.formData) + "}";

	 //rowData.push([row.value.message, row.value.formData]);
			 }, this);
			 }, this);
                         req.send();
                         //console.log("Servers ", servers);
                         return servers;

		},
                _loadOVS : function() {
			 var ovs = "";
                         var urldb = "/couch/ovs/_design/ovs/_view/all";
			 var req = new qx.io.request.Xhr();
			 req.setUrl(urldb);
			 req.setMethod("GET");
                         req.setAsync(false);
			 req.setParser("json");
			
			 req.addListener("success", function(e) {
			 var req = e.getTarget();
			 var response = req.getResponse();
			 response.rows.forEach(function(row) {
			 ovs = "{ \"message\": \"" +   row.value.message + "\" , \"formData\": " + qx.lang.Json.stringify(row.value.formData) + "}";
                         
			 }, this);
			 }, this);
                         req.send();
                         return ovs;

		},
                 _loadSlices : function() {
			var slices = "";
                         var urldb = "/couch/slice/_design/slice/_view/all";
			 var req = new qx.io.request.Xhr();
			 req.setUrl(urldb);
			 req.setMethod("GET");
                         req.setAsync(false);
			 req.setParser("json");
			
			 req.addListener("success", function(e) {
			 var req = e.getTarget();
			 var response = req.getResponse();
			 response.rows.forEach(function(row) {
			 //rowData.push([row.value.message, row.value.formData]);
                         slices = "{ \"message\": \"" +   row.value.message + "\" , \"formData\": " + qx.lang.Json.stringify(row.value.formData) + "}";
			 }, this);
			 }, this);
                         req.send();
                         return slices;

		}
	}
});
