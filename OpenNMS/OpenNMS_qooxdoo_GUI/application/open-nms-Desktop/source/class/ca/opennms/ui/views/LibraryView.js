qx.Class.define("ca.opennms.ui.views.LibraryView", {
	extend : qx.ui.tabview.Page, 
        //include : [qx.dev.unit.TestCase],
        
	construct : function() {
		this.base(arguments, "DC Nodes", "images/icons/16/lib.png");
                qx.Class.include(qx.ui.treevirtual.TreeVirtual,
                       qx.ui.treevirtual.MNode);
		this.setLayout(new qx.ui.layout.Grow());
		this.setPadding(0);
		this.setShowCloseButton(false);

		var explorer = new qx.ui.tabview.TabView();
		var page = new qx.ui.tabview.Page("Nodes", "images/icons/16/service.png");
                page.setLayout(new qx.ui.layout.Grow());
		page.add(this._getContentTree());
                page.setPaddingTop(3);
                var page1 = new qx.ui.tabview.Page("Controllers", "images/icons/16/service.png");
                page1.setLayout(new qx.ui.layout.Grow());
		page1.add(this._getControllerTree());
                page1.setPaddingTop(3);
                var page2 = new qx.ui.tabview.Page("Components", "images/icons/16/service.png");
                page2.setLayout(new qx.ui.layout.Grow());
		page2.add(this._getComponentsTree());
                page2.setPaddingTop(3);
		explorer.setBarPosition("left");
		explorer.add(page);
                explorer.add(page1); 
                explorer.add(page2);
                explorer.setContentPadding(0);
		this.add(explorer);

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

		_tree : null, 
                _tree1 : null,
                _tree2 : null,
		_getContentTree : function() {
			var tree = new qx.ui.tree.Tree();
			var controller = new qx.data.controller.Tree(null, tree, "groups", "name", "elType");
			controller.setIconPath("icon");
			tree.setOpenMode("click");
			tree.setHideRoot(true);
			tree.setRootOpenClose(false);
			
                        var url = qx.util.ResourceManager.getInstance().toUri("/couch/library/b46c69019545b302658f5b5855001f6a");
                        
                    
			var store = new qx.data.store.Json(url);

			store.bind("model", controller, "model");
			tree.setDraggable(true);
			tree.addListener("dragstart", function(e) {
				
		 					e.addAction("move");
			  		
			});
			tree.addListener("drag", function(e){
			
			});
			tree.addListener("click", function(e){
				if(this.getSelection()[0].$$user_model.$$user_elType != "folder"){
				var rightContainer = ('#rightStatsContentContainer');
				
			}
			});

			store.addListener("loaded", function(ev) {
				tree.getRoot().setOpen(true);
			}, this);
			this._tree = tree;
			return tree;
		
	          },
                  _getControllerTree : function() {
			var tree1 = new qx.ui.tree.Tree();
			var controller = new qx.data.controller.Tree(null, tree1, "groups", "name", "elType");
			controller.setIconPath("icon");
			tree1.setOpenMode("click");
			tree1.setHideRoot(true);
			tree1.setRootOpenClose(false);
			
                        var url = qx.util.ResourceManager.getInstance().toUri("/couch/library/72426ea62beb8cf9336868a6ee001719");
                        
                    
			var store = new qx.data.store.Json(url);

			store.bind("model", controller, "model");
			tree1.setDraggable(true);
			tree1.addListener("dragstart", function(e) {
				
		 					e.addAction("move");
			  		
			});
			tree1.addListener("drag", function(e){
			
			});
			tree1.addListener("click", function(e){
				if(this.getSelection()[0].$$user_model.$$user_elType != "folder"){
				var rightContainer = ('#rightStatsContentContainer');
				
			}
			});

			store.addListener("loaded", function(ev) {
				tree1.getRoot().setOpen(true);
			}, this);
			this._tree1 = tree1;
			return tree1;
		
	          },
                  _getComponentsTree : function() {
			var tree2 = new qx.ui.tree.Tree();
			var controller = new qx.data.controller.Tree(null, tree2, "groups", "name", "elType");
			controller.setIconPath("icon");
			tree2.setOpenMode("click");
			tree2.setHideRoot(true);
			tree2.setRootOpenClose(false);
			
                        var url = qx.util.ResourceManager.getInstance().toUri("/couch/library/72426ea62beb8cf9336868a6ee0022d5");
                        
                    
			var store = new qx.data.store.Json(url);

			store.bind("model", controller, "model");
			tree2.setDraggable(true);
			tree2.addListener("dragstart", function(e) {
				
		 					e.addAction("move");
			  		
			});
			tree2.addListener("drag", function(e){
			
			});
			tree2.addListener("click", function(e){
				if(this.getSelection()[0].$$user_model.$$user_elType != "folder"){
				var rightContainer = ('#rightStatsContentContainer');
				
			}
			});

			store.addListener("loaded", function(ev) {
				tree2.getRoot().setOpen(true);
			}, this);
			this._tree2 = tree2;
			return tree2;
		
	          },



















                 _getVirtualTree : function() {
                                    
      // tree
      var tree = new qx.ui.treevirtual.TreeVirtual(
          [
            "Multi-tenant DCN Nodes Tree",
            "Description",
            "Status",
            "Type",
            "Ip Address",
            "Manufacturer"
          ]);
      tree.set(
        {
          width  : 400
        });
      tree.setAlwaysShowOpenCloseSymbol(true);

      // Obtain the resize behavior object to manipulate
      var resizeBehavior = tree.getTableColumnModel().getBehavior();

      // Ensure that the tree column remains sufficiently wide
      resizeBehavior.set(0, { width:"1*", minWidth:180  });


      // tree data model
     /* var dataModel = tree.getDataModel();

      var te1 = dataModel.addBranch(null, "Desktop", true);
      tree.nodeSetLabelStyle(te1,
                             "background-color: red; " +
                             "color: white;" +
                             "font-weight: bold;");
      var te1_1;

      dataModel.addBranch(te1, "Files", true);

      te1_1 = dataModel.addBranch(te1, "Workspace", true);
      var te = dataModel.addLeaf(te1_1, "Windows (C:)");
      dataModel.setColumnData(te, 1, "-rwxr-xr-x");
      dataModel.setColumnData(te, 2, "2007-01-30 22:54:03");
      te = dataModel.addLeaf(te1_1, "Documents (D:)");
      dataModel.setColumnData(te, 1, "-rwxr-xr-x");
      dataModel.setColumnData(te, 2, "2007-01-30 22:54:03");

      dataModel.addBranch(te1, "Network", true);

      te = dataModel.addBranch(te1, "Trash", true);
      tree.nodeSetCellStyle(te, "background-color: cyan;");

      dataModel.setData();*/

     
      /*
       * Create a controller that connects tree data model and data store
       */
      //this.treeController = new qcl.data.controller.TreeVirtual(tree,store);
     
      /*
       * bind the server-supplied status text to the tree's status bar.
       
      store.bind("model.statusText", tree, "additionalStatusBarText", {
        converter : function( text ){
          return " | " + text;
        }
      } );
      */





			//var tree = new qx.ui.tree.Tree();
			var controller = new qcl.data.controller.TreeVirtual(null, tree, "groups", "name", "elType");
			controller.setIconPath("icon");
			tree.setOpenMode("click");
			tree.setHideRoot(true);
			tree.setRootOpenClose(false);
			
                        //var url = qx.util.ResourceManager.getInstance().toUri("/couch/library/b46c69019545b302658f5b5855001f6a");
                        var url = qx.util.ResourceManager.getInstance().toUri("data/resources/library.json");
                    
			var store = new qx.data.store.Json(url);

			store.bind("model", controller, "model");
			tree.setDraggable(true);
			tree.addListener("dragstart", function(e) {
				
		 					e.addAction("move");
			  		
			});
			tree.addListener("drag", function(e){
			
			});
			tree.addListener("click", function(e){
				if(this.getSelection()[0].$$user_model.$$user_elType != "folder"){
				var rightContainer = ('#rightStatsContentContainer');
				
			}
			});

			store.addListener("loaded", function(ev) {
				tree.getRoot().setOpen(true);
			}, this);
			this._tree = tree;
			return tree;
		
	          }}
});
