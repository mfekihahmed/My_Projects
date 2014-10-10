qx.Class.define("ca.opennms.ui.views.ProjectView", {
	extend : qx.ui.tabview.Page,
	construct : function() {
		this.base(arguments, "Project Explorer", "resource/icons/16/vinf.png");
		this.setLayout(new qx.ui.layout.Grow());
		this.setPadding(0);
		this.setShowCloseButton(true);

		var explorer = new qx.ui.tabview.TabView();
		var page = new qx.ui.tabview.Page("Resources");
		page.setLayout(new qx.ui.layout.Grow());
		explorer.setBarPosition("bottom");
		explorer.add(page);
		explorer.setContentPadding(0);

		// table model
		var tableModel = new qx.ui.table.model.Simple();
		tableModel.setColumns(["Name", "Description", "Type", "Status", "Capabilities", "Actions"]);
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
		resizeBehavior.setWidth(0, "20%");
		// We could also set them individually:
		resizeBehavior.setWidth(1, "30%");
		// We could also set them individually:
		resizeBehavior.setWidth(2, "15%");

		resizeBehavior.setWidth(3, "10%");

		resizeBehavior.setWidth(4, "15%");

		resizeBehavior.setWidth(5, "10%");

		var qBarsRenderer = new canvascell.Renderer(new canvascell.plotter.QBars({
			badBarColor : '#f00',
			badBgColor : '#f88',
			goodBarColor : '#0a0',
			goodBgColor : '#afa'
		}));
		tColMod.setDataCellRenderer(3, qBarsRenderer);
		tColMod.setDataCellRenderer(4, new ca.inocybe.table.CapabilitiesRenderer());

		table.setDraggable(true);
		page.add(table);
		var page2 = new qx.ui.tabview.Page("Usage");
		page2.setLayout(new qx.ui.layout.Grid());
		page2.getLayout().setRowFlex(0, 1);
		explorer.add(page2);
		
		var data = [[['compute', 3], ['network', 7], ['clouds', 2.5]]];
		
		var options = function($jqplot) {
			return {
				title : 'Project Resource Usage Report',
				seriesDefaults : {
					renderer : $jqplot.PieRenderer,
					rendererOptions : {
						sliceMargin : 8
					}
				},
				legend :{
					show: true
				}
			}
		};
		var plugins = ['pieRenderer'];
		var plot = new qxjqplot.Plot(data, options, plugins);
		plot.setWidth(400);
		page2.add(plot, {row: 0, column:0});
		page2.add(plot, {row: 0, column:1});
		this.add(explorer);
	},
	members : {
		_createRandomRows : function(rowCount) {
			var rowData = [];
			var now = new Date().getTime();
			var dateRange = 400 * 24 * 60 * 60 * 1000;
			// 400 days
			var nextId = 0;
			for(var row = 0; row < rowCount; row++) {
				var spark = [];
				for(var i = 0; i < 30; i++) {
					spark.push(Math.random() * 100);
				}
				var qBars = {
					left : Math.round(Math.random() * 8),
					right : Math.round(Math.random() * 8),
					data : spark
				};
				var date = new Date(now + Math.random() * dateRange - dateRange / 2);
				rowData.push(["Rackspace", "Rackspace Cloud", "Cloud", qBars]);
			}
			return rowData;
		}
	}
});
