/**
 *
 */
qx.Class.define("ca.inocybe.ui.core.workbench.TopBar", {
	extend : qx.ui.container.Composite,
	events : {
		"changePerspective" : "qx.event.type.Data"
	},
	construct : function() {
		var layout = new qx.ui.layout.HBox(50);
		this.base(arguments, layout);
		var opennmslogo = new qx.ui.basic.Image("resource/open_nms.png");
                opennmslogo.setScale(true);
                opennmslogo.setWidth(110);
                opennmslogo.setHeight(50);
                this.add(opennmslogo);
		//this.add(opennmslogo, {left: 20, top: 10});
		var spacer = new qx.ui.core.Widget().set({
			allowGrowY : false,
			height : 20
		});
		var perspectiveSelector = new ca.inocybe.ui.core.perspective.PerspectiveSelector();
		this.add(perspectiveSelector);
		this.add(spacer, {
			flex : 1
		});
		var infoBox = new qx.ui.container.Composite().set({
			backgroundColor : "#ddd",
			allowGrowX : true
		});
		var myAccount = new ca.inocybe.ui.core.AccountMenu("My Account", "icons/24/pawn.png");
		var help = new qx.ui.form.Button("Help", "icons/24/lifebelt.png");
		this.add(myAccount);
		this.add(help);
		//     this.add(infoBox,{flex:1})
		this.setAllowGrowX(true);
		perspectiveSelector.addListener("changePerspective", function(e) {
			this.fireDataEvent("changePerspective", e.getData());
		}, this);

	}
});
