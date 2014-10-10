qx.Class.define("ca.inocybe.ui.sections.AlarmsSection", {
	extend : ca.inocybe.ui.navigation.SectionPanel,
	construct : function() {
		this.base(arguments, "Alarms", "icons/16/alarms.png");
		this.setWidth(250);
		this.setValue(false);
		var layout = new qx.ui.layout.Grid();
		layout.setColumnWidth(0, 75);
		// set with of column 1 to 200 pixel
		layout.setColumnWidth(1, 50);
		// set with of column 1 to 200 pixel
		layout.setColumnWidth(2, 100);
		// set with of column 1 to 200 pixel
		layout.setRowAlign(0, "center", "middle");
		layout.setColumnAlign(1, "center", "middle");
		layout.setColumnMinWidth(1, 40);
		layout.setSpacing(5);
		layout.setColumnFlex(0, 1);

		console.log(layout);
		//layout.setRowAlign(0,"center","top");
		this.setLayout(layout);
		//this.add(new ca.inocybe.operator.LibraryExplorer());

		this.add(new qx.ui.basic.Label("Type"), {
			row : 0,
			column : 0
		});
		this.add(new qx.ui.basic.Label("Status"), {
			row : 0,
			column : 1
		});
		this.add(new qx.ui.basic.Label("Actions"), {
			row : 0,
			column : 2
		});
		this.add(new qx.ui.basic.Atom("Critical", "icons/16/alarms/critical.png"), {
			row : 1,
			column : 0
		});
		this.add(new qx.ui.basic.Atom("Major", "icons/16/alarms/major.png"), {
			row : 2,
			column : 0
		});
		this.add(new qx.ui.basic.Atom("Minor", "icons/16/alarms/minor.png"), {
			row : 3,
			column : 0
		});
		this.add(new qx.ui.basic.Atom("Warning", "icons/16/alarms/warning.png"), {
			row : 4,
			column : 0
		});
		this.add(new qx.ui.basic.Label("0"), {
			row : 1,
			column : 1
		});
		this.add(new qx.ui.basic.Label("0"), {
			row : 2,
			column : 1
		});
		this.add(new qx.ui.basic.Label("0"), {
			row : 3,
			column : 1
		});
		this.add(new qx.ui.basic.Label("0"), {
			row : 4,
			column : 1
		});

/**		for(var i = 0; i < 4; i++) {
			var container = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
			container.add(new qx.ui.form.Button("View"));
			container.add(new qx.ui.form.Button("Feed"));

			this.add(container, {
				row : i,
				column : 2
			});
	} **/
	}
});
