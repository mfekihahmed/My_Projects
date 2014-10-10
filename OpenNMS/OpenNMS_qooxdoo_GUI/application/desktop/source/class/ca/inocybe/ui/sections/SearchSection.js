qx.Class.define("ca.inocybe.ui.sections.SearchSection", {
extend: ca.inocybe.ui.navigation.SectionPanel,
construct: function() {
	this.base(arguments,"Search","icons/16/find.png");
	this.setWidth(250);
    this.setLayout(new qx.ui.layout.HBox(5));
	this.setValue(false);
    //this.add(new ca.inocybe.operator.LibraryExplorer());
    this.add(new qx.ui.basic.Atom("Search"));
    this.add(new qx.ui.form.TextField());
    this.add(new qx.ui.form.Button("Go"));
    
}
});