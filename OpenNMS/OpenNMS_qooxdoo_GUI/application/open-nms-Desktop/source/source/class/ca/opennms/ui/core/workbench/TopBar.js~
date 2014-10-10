/**
 *
 */
qx.Class.define("ca.opennms.ui.core.workbench.TopBar", {
	extend : qx.ui.container.Composite,
	events : {
		"changePerspective" : "qx.event.type.Data"
	},
	construct : function() {
		var layout = new qx.ui.layout.HBox(50);
		this.base(arguments, layout);
		var opennmslogo = new qx.ui.basic.Image("opennms1.png");
                opennmslogo.setScale(true);
                opennmslogo.setWidth(170);
                opennmslogo.setHeight(70);
                this.add(opennmslogo);
		//this.add(opennmslogo, {left: 20, top: 10});
		var spacer = new qx.ui.core.Widget().set({
			allowGrowY : false,
			height : 20
		});
		var perspectiveSelector = new ca.opennms.ui.core.perspective.PerspectiveSelector();
		this.add(perspectiveSelector);
		this.add(spacer, {
			flex : 1
		});
		var infoBox = new qx.ui.container.Composite().set({
			backgroundColor : "#ddd",
			allowGrowX : true
		});
		/*var myAccount = new ca.opennms.ui.core.AccountMenu("My Account", "resource/icons/24/pawn.png");
               
                
		var help = new qx.ui.form.Button("Help", "resource/icons/24/lifebelt.png");
               
		this.add(myAccount);
		this.add(help);*/
		//     this.add(infoBox,{flex:1})
                var logout = new qx.ui.form.Button("Logout", "icons/24/remote_logoff.png");
                //logout.setScale(true);
                logout.setWidth(100);
                logout.setHeight(40);
		
                logout.addListener("execute", function() {
		this.__logout();
                //this.debug("Console Login Enabled");
		//this.ca.opennms.boot.Application.__createLogin(true);	



		}, this);
                this.add(logout);
                
		this.setAllowGrowX(true);
		perspectiveSelector.addListener("changePerspective", function(e) {
			this.fireDataEvent("changePerspective", e.getData());
		}, this);

	},
         members : {
		__logout : function() {
	       // var main = new ca.opennms.boot.Application.__createLogin(true);
		}
		}
});
