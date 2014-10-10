qx.Class.define("ca.inocybe.ui.views.VirtualMachineView", {
	extend : qx.ui.tabview.Page,
	construct : function() {
		this.base(arguments, "Virtual Machine", "images/icons/16/compute.png");
		this.setLayout(new qx.ui.layout.Flow(10));
		this.setPadding(20);
		var summary = new collapsablepanel.Panel("Summary").set({width:300});
		var hardware = new collapsablepanel.Panel("Hardware Profile").set({width:300});
		var actions = new collapsablepanel.Panel("Actions").set({width:300});
		var network = new collapsablepanel.Panel("Networking").set({width:300});
		this.add(summary);
		this.add(hardware);
		this.add(actions);
		this.add(network);
	}
});
