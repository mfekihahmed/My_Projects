/**
 * #asset(images/icons/16/*)
 */
qx.Class.define("ca.opennms.ui.sections.LibrarySection", {
	extend : ca.opennms.ui.navigation.SectionPanel,
	construct : function() {
		this.base(arguments, "DataCenter Resources", "images/icons/16/cube.png");
		this.setWidth(250);
		this.setValue(true);
		this.setLayout(new qx.ui.layout.Grow());
		this.add(this._createExplorerTabs());
	},
	events : {
		"navSelection" : "qx.event.type.Data"
	},
	members : {
		_createExplorerTabs : function() {
			var tabs = new qx.ui.tabview.TabView();
			tabs.setContentPadding(0);
			tabs.setBarPosition("bottom");

			var tabbyType = new qx.ui.tabview.Page("By Node Type", null);
			
			tabbyType.setLayout(new qx.ui.layout.Grow());
			tabbyType.add(this._getContentTree());
			tabs.add(tabbyType);
			return tabs;
		},
                _loadLibrary : function() {
			 var library = "";
                         var urldb = "/couch/library/_design/library/_view/all";
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
                          library = "{ \"name\": \"" +   row.value.name + "\" , \"icon\": \"" +   row.value.icon + "\" , \"elType\": \"" +   row.value.elType + "\" , \"groups\": " + qx.lang.Json.stringify(row.value.groups) + "}";

	 //rowData.push([row.value.message, row.value.formData]);
			 }, this);
			 }, this);
                         req.send();
                         console.log("library  ", library);
                         return library;

		},

		_tree : null, 
		_getContentTree : function() {
			var tree = new qx.ui.tree.Tree();
			var controller = new qx.data.controller.Tree(null, tree, "groups", "name", "elType");
			controller.setIconPath("icon");
			tree.setOpenMode("click");
			tree.setHideRoot(true);
			tree.setRootOpenClose(false);
			// tree.addListener("dblclick", function() {
			// 	var value = this._tree.getSelection()[0];
			// 	var navobj = new Object();
			// 	console.log(value.getLevel());
			// 	if(value.getLevel()==-1){
			// 		navobj.category = value.getLabel();
			// 		navobj.filter = "category";
			// 		navobj.view = "Library";
			// 	}
			// 	else{
			// 		navobj.subcategory =  value.getParent().getLabel();
			// 		navobj.subcategory =  value.getLabel();
			// 		navobj.filter = "subcategory";
			// 		navobj.view = "Library";
			// 	}
			// 	this.fireDataEvent("navSelection",navobj);
			// },this);

			//var library = this._loadLibrary();
                        //var url = qx.util.ResourceManager.getInstance().toUri("/couch/library/b46c69019545b302658f5b5855001f6a");
                        
                       var url = qx.util.ResourceManager.getInstance().toUri("data/resources/library.json");
                       // console.log("library  ", library);
                       // console.log("url  ", url);
			var store = new qx.data.store.Json(url);

			store.bind("model", controller, "model");
			tree.setDraggable(true);
			tree.addListener("dragstart", function(e) {
				// do verifications here to check if it can be dragged if possible and test with antother class, TODO

		  			// if(this.getSelection()[0].$$user_model.$$user_elType == "application" || this.getSelection()[0].$$user_model.$$user_elType == "component"){
	 					// e.addAction("move");
		  			// }
		  			// if($('#toggleButton').text() == "Physical view"){ // meaning the view we see is the physical one
			  		// 	if(this.getSelection()[0].$$user_model.$$user_elType == "controller"){
		 					e.addAction("move");
			  		// 	}
			  		// }
			});
			tree.addListener("drag", function(e){
				// console.log("Left: "+e.getDocumentLeft()+", top: "+e.getDocumentTop());
				// console.log(e.getType());
				// var cursor = qx.ui.core.DragDropCursor("resource/Switch.png");

				// draw image at getDocumentLeft, getDocumentTop
			});
			tree.addListener("click", function(e){
				// send data to InfrastructureExplorerView and make stats appear ?
				if(this.getSelection()[0].$$user_model.$$user_elType != "folder"){
				var rightContainer = ('#rightStatsContentContainer');
				rightContainer.empty();
				// $('#rightStats').show();
				// rightContainer.html('<table>' +
				// 						'<tr>' +
				// 							'<th>Key</th>' +
				// 							'<th>Value</th>' +
				// 						'</tr>' +
				// 						'<tr>' +
				// 							'<td>Id</td>' +
				// 							'<td>1</td>' +
				// 						'</tr>' +
				// 						'<tr>' +
				// 							'<td>Resource Type</td>' +
				// 							'<td>This is a resource</td>' +
				// 						'</tr>' +
				// 						'<tr>' +
				// 							'<td>Manufacturer Description</td>' +
				// 							'<td>This is a manufacturer description</td>' +
				// 						'</tr>' +
				// 						'<tr>' +
				// 							'<td>Hardware Description</td>' +
				// 							'<td>This is a hardware description</td>' +
				// 						'</tr>' +
				// 						'<tr>' +
				// 							'<td>Software Description</td>' +
				// 							'<td>This is a software description</td>' +
				// 						'</tr>' +
				// 						'<tr>' +
				// 							'<td>Serial Number</td>' +
				// 							'<td>This is a serial number</td>' +
				// 						'</tr>' +
				// 						'<tr>' +
				// 							'<td>Human Description</td>' +
				// 							'<td>This is a human description</td>' +
				// 						'</tr>' +
				// 						'<tr>' +
				// 							'<td>Datapath Id</td>' +
				// 							'<td>This is the datapath id</td>' +
				// 						'</tr>' +
				// 						'<tr>' +
				// 							'<td>Max packet buffered</td>' +
				// 							'<td>1000000</td>' +
				// 						'</tr>' +
				// 						'<tr>' +
				// 							'<td>Number of Tables</td>' +
				// 							'<td>5</td>' +
				// 						'</tr>' +
				// 					'</table>');
				}
			});

			store.addListener("loaded", function(ev) {
				tree.getRoot().setOpen(true);
			}, this);
			this._tree = tree;
			return tree;
		}
	}
});
