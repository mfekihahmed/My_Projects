qx.Class.define("ca.opennms.ui.views.VirtualMachineView", {
	extend : qx.ui.tabview.Page,
	construct : function() {
		this.base(arguments, "Virtual Machine", "resource/images/icons/16/pawn.png");
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
