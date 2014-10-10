qx.Class.define("ca.opennms.ui.views.WelcomeView", {
	extend : qx.ui.tabview.Page,
	construct : function() {
		this.base(arguments, "Library Explorer", "resource/icons/16/library.png");
		this.setLayout(new qx.ui.layout.Grow());
		this.setPadding(0);
		this.setShowCloseButton(true);

		var explorer = new qx.ui.tabview.TabView();
		var page = new qx.ui.tabview.Page("Resources");
		page.setLayout(new qx.ui.layout.VBox());
		page.setPaddingTop(3);
		explorer.setBarPosition("bottom");
		explorer.add(page);
		explorer.setContentPadding(0);

		// table model
		var tableModel = new qx.ui.table.model.Simple();
		tableModel.setColumns(["", "Name", "Description", "Type", "Provider", "Status"]);
		tableModel.setData(this._createRandomRows(1));

		// make second column editable
		tableModel.setColumnEditable(1, true);
		// table
		var custom = {
			tableColumnModel : function(obj) {
				return new qx.ui.table.columnmodel.Resize(obj);
			}
		};

		// table
		var table = new qx.ui.table.Table(tableModel, custom);

		var tColMod = table.getTableColumnModel();
		var resizeBehavior = tColMod.getBehavior();

		// We could also set them individually:
		// We could also set them individually:
		resizeBehavior.setWidth(0, "5%");

		resizeBehavior.setWidth(1, "15%");
		// We could also set them individually:
		resizeBehavior.setWidth(2, "30%");
		// We could also set them individually:
		resizeBehavior.setWidth(3, "15%");

		resizeBehavior.setWidth(4, "15%");

		resizeBehavior.setWidth(5, "20%");

		var doubleBarRenderer = new canvascell.Renderer(new canvascell.plotter.DoubleBar({
			upFill : '#0b0',
			upBorder : '#0a0',
			downFill : '#b00',
			downBorder : '#a00'
		}));

		tColMod.setDataCellRenderer(5, doubleBarRenderer);
		tColMod.setDataCellRenderer(0, new qx.ui.table.cellrenderer.Boolean());

		table.setDraggable(true);
		// create the toolbar
		toolbar = new qx.ui.toolbar.ToolBar();
		toolbar.setSpacing(5);
		
		// create and add Part 1 to the toolbar
		var part1 = new qx.ui.toolbar.Part();
		var newButton = new qx.ui.toolbar.Button("New", "resource/images/icons/16/library.png");
		newButton.addListener("execute", function() {
			var reswiz = new ca.inocybe.ui.wizards.ResourceWizard();
			reswiz.show();
			var root = qx.core.Init.getApplication().getRoot();
    		
		}, this);
		var editButton = new qx.ui.toolbar.Button("Edit", "resource/images/icons/16/library.png");
		var cloneButton = new qx.ui.toolbar.Button("Clone", "resource/images/icons/16/library.png");
		var deleteButton = new qx.ui.toolbar.Button("Delete", "resource/images/icons/16/library.png");
		part1.add(newButton);
		part1.add(new qx.ui.toolbar.Separator());
		part1.add(editButton);
		part1.add(new qx.ui.toolbar.Separator());
		part1.add(cloneButton);
		part1.add(new qx.ui.toolbar.Separator());
		part1.add(deleteButton);
		toolbar.add(part1);
	    page.add(toolbar);
		page.add(table);
		this.add(explorer);
	},
	members : {
		_createRandomRows : function(rowCount) {
			var rowData = [];
			var now = new Date().getTime();
			var dateRange = 400 * 24 * 60 * 60 * 1000;
			// 400 days
			var nextId = 0;
			var two = [100, 0];
			rowData.push([false, "Network Service Interface", "Provides the ability to create connections", "Network", "ihaveanetwork.com", two]);
			rowData.push([false, "Chicago Endpoint", "Serves as an endpoint to a connection", "Network", "ihaveanetwork.com", two]);

			return rowData;
		}
	}
});
