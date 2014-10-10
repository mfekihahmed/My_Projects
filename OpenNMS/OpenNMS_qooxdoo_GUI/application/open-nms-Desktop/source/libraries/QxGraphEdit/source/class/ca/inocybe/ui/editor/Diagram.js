/**
 * A Diagram Editor for Virtual Network Topologies
 * (c)2011-2012 Inocybe Technologies inc.
 */
qx.Class.define("ca.inocybe.ui.editor.Diagram", {
	extend : qx.ui.embed.Canvas,
	construct : function() {
		this.base(arguments);
		var ctx = this.getContext2d();
		ctx.fillStyle = "rgb(200,0,0)";
		ctx.fillRect(20, 20,  50, 50);
	},
	properties: {
		
	},
	members: {
		
	}
});
