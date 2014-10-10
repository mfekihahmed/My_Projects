qx.Class.define("ca.inocybe.ui.sections.SecuritySection", {
extend: ca.inocybe.ui.navigation.SectionPanel,
construct: function() {
	this.base(arguments,"Security","icons/16/security.png");
	this.setWidth(250);
	this.setValue(false);
    this.setLayout(new qx.ui.layout.Grow());
    //this.add(new ca.inocybe.operator.LibraryExplorer());
}
});