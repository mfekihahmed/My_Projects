qx.Class.define("ca.inocybe.ui.sections.EventsSection", {
extend: ca.inocybe.ui.navigation.SectionPanel,
construct: function() {
	this.base(arguments,"Events","icons/16/events.png");
	this.setWidth(250);
        this.setValue(false);
	var layout = new qx.ui.layout.Grid();
	layout.setSpacing(10);
	layout.setColumnFlex(1,1);
    layout.setColumnAlign(1,"center","top");
    layout.setColumnAlign(0,"left","middle");
    this.setLayout(layout);
    //this.add(new ca.inocybe.operator.LibraryExplorer());
    this.add(new qx.ui.basic.Label("Event Type"),{row:0,column:0});

    this.add(new qx.ui.basic.Label("Event Source"),{row:1,column:0});
    // create a combo box
    var comboBox = new qx.ui.form.ComboBox();
    for (var i=1; i<31; i++)
      {
        var tempItem = new qx.ui.form.ListItem("2^ " + i + " = " + Math.pow(2, i));
        comboBox.add(tempItem);
      }
    var comboBox2 = new qx.ui.form.ComboBox();
    for (var i=1; i<31; i++)
      {
        var tempItem = new qx.ui.form.ListItem("2^ " + i + " = " + Math.pow(2, i));
        comboBox2.add(tempItem);
      }
    this.add(comboBox,{row:0,column:1});
    this.add(comboBox2,{row:1,column:1});
    this.add(new qx.ui.basic.Label("Start Date Range"),{row:2,column:0});
    var dateFieldFormat = new qx.ui.form.DateField();
    dateFieldFormat.setValue(new Date());
	this.add(dateFieldFormat,{row:2,column:1});
    this.add(new qx.ui.basic.Label("End Date Range"),{row:3,column:0});
     var dateFieldFormat2 = new qx.ui.form.DateField();
    dateFieldFormat2.setValue(new Date());
	this.add(dateFieldFormat2,{row:3,column:1}); var dateFieldFormat = new qx.ui.form.DateField();
    dateFieldFormat.setValue(new Date());
	this.add(new qx.ui.form.Button("Search"),{row:4,column:1});
	
    
    
      
}
});