qx.Class.define("ca.opennms.ui.views.testwait", {
	extend : qx.dev.unit.TestCase,
	members : {
		wait : function() {
			this.wait(1000);
		}
		
	}
});
