qx.Class.define("ca.opennms.ui.sections.SearchSection", {
extend: ca.opennms.ui.navigation.SectionPanel,
construct: function() {
	this.base(arguments,"Search","resource/icons/16/find.png");
	this.setWidth(250);
    this.setLayout(new qx.ui.layout.HBox(5));
	this.setValue(false);
    //this.add(new ca.inocybe.operator.LibraryExplorer());
    this.add(new qx.ui.basic.Atom("Search"));
    this.add(new qx.ui.form.TextField());
    this.add(new qx.ui.form.Button("Go"));
    
}
});
