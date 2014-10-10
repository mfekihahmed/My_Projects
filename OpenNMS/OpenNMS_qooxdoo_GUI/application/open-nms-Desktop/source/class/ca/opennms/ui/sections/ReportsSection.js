qx.Class.define("ca.opennms.ui.sections.ReportsSection", {
extend: ca.opennms.ui.navigation.SectionPanel,
construct: function() {
	this.base(arguments,"Reports","resource/icons/16/reports.png");
	this.setWidth(250);
    this.setLayout(new qx.ui.layout.VBox(5));
	this.setValue(false);
    this.add(new qx.ui.form.Button("Usage"));
    this.add(new qx.ui.form.Button("Availability"));
    
    //this.add(new ca.inocybe.operator.LibraryExplorer());
}
});
