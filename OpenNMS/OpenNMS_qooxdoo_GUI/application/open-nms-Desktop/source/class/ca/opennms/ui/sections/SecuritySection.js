qx.Class.define("ca.opennms.ui.sections.SecuritySection", {
extend: ca.opennms.ui.navigation.SectionPanel,
construct: function() {
	this.base(arguments,"Security","resource/icons/16/security.png");
	this.setWidth(250);
	this.setValue(false);
    this.setLayout(new qx.ui.layout.Grow());
    //this.add(new ca.inocybe.operator.LibraryExplorer());
}
});
