qx.Class.define("ca.inocybe.ui.sections.ReportsSection", {
extend: ca.inocybe.ui.navigation.SectionPanel,
construct: function() {
	this.base(arguments,"Reports","icons/16/reports.png");
	this.setWidth(250);
    this.setLayout(new qx.ui.layout.VBox(5));
	this.setValue(false);
    this.add(new qx.ui.form.Button("Usage"));
    this.add(new qx.ui.form.Button("Availability"));
    
    //this.add(new ca.inocybe.operator.LibraryExplorer());
}
});