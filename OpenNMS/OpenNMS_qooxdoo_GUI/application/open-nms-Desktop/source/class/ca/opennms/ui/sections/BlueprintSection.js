qx.Class.define("ca.opennms.ui.sections.BlueprintSection", {
extend: ca.opennms.ui.navigation.SectionPanel,
construct: function() {
	this.base(arguments,"Blueprint","resource/icons/16/blueprint.png");
	this.setWidth(250);
      this.setValue(false);
    this.setLayout(new qx.ui.layout.Grow());
   this.setLayout(new qx.ui.layout.Grow());
this.add(this._createExplorerTabs());
},
members: { 
   _createExplorerTabs: function() {
      var tabs = new qx.ui.tabview.TabView();
      tabs.setContentPadding(0);
      tabs.setBarPosition("bottom");
      
      var tabbyType = new qx.ui.tabview.Page("By Type",null);
      tabbyType.setLayout(new qx.ui.layout.Grow());
      tabbyType.add(this._getContentTree());
      var tabHierachical = new qx.ui.tabview.Page("Hierarchy",null);
      tabs.add(tabbyType);
      tabs.add(tabHierachical);
      return tabs;
   },
   _getContentTree: function() {
         var tree = new qx.ui.tree.Tree();
         var controller = new qx.data.controller.Tree(null, tree, "groups", "name");
      	 controller.setIconPath("icon");
         tree.setHideRoot(true);
         tree.setDroppable(true);
         // create the data store
         var url = qx.util.ResourceManager.getInstance().toUri("resource/data/resources/4.json");
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
