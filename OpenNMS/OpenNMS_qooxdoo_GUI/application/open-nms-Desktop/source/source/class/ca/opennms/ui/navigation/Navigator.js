qx.Class.define("ca.opennms.ui.navigation.Navigator", {
    extend: qx.ui.container.Composite,
    construct: function(){
        var layout = new qx.ui.layout.Grow();
        this.base(arguments, layout);
        this.add(getNavigationSections);
    },
    members: {
    getNavigationSections: function() {
    	var panel = new collapsablepanel.Panel("MyPanel");
					panel.setWidth(200);
panel.setLayout(new qx.ui.layout.HBox(5));
panel.add(new ca.opennms.operator.UserManager());
		return panel;
    }
    }
});
