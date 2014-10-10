qx.Class.define("ca.inocybe.ui.sections.ProjectsSection", {
	extend : ca.inocybe.ui.navigation.SectionPanel,
	construct : function() {
		this.base(arguments, "Projects", "images/icons/16/project.png");
		this.setWidth(250);
		this.setLayout(new qx.ui.layout.VBox(5));
		this.setValue(false);
		this.add(this._createToolbar());
		this.add(this._createExplorerTabs());
	},
	members : {
		_createToolbar : function() {
			var toolbar = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
			toolbar.add(new qx.ui.form.Button("New", "images/icons/16/project_add.png"));
			toolbar.add(new qx.ui.form.Button("Delete", "images/icons/16/project_delete.png"));
			return toolbar;
		},
		_createExplorerTabs : function() {
			var tabs = new qx.ui.tabview.TabView();
			tabs.setContentPadding(0);
			tabs.setBarPosition("bottom");

			var tabbyType = new qx.ui.tabview.Page("By Type", null);
			tabbyType.setLayout(new qx.ui.layout.Grow());
			tabbyType.add(this._getContentTree());
			var tabHierachical = new qx.ui.tabview.Page("Hierarchy", null);
			tabs.add(tabbyType);
			tabs.add(tabHierachical);
			return tabs;
		},
		_getContentTree : function() {
			var tree = new qx.ui.tree.Tree();
			var controller = new qx.data.controller.Tree(null, tree, "groups", "name");
			controller.setIconPath("icon");
			tree.setHideRoot(true);
			tree.setDroppable(true);
			// create the data store
			var url = qx.util.ResourceManager.getInstance().toUri("data/resources/2.json");
			var store = new qx.data.store.Json(url);
			// connect the store and the controller
			store.bind("model", controller, "model");
			store.addListener("loaded", function(ev) {
				tree.getRoot().setOpen(true);
			}, this);
			return tree;
		}
	}
});
