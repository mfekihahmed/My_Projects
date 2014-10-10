qx.Class.define("ca.opennms.ui.views.ResourceView", {
	extend : qx.ui.tabview.Page,
	construct : function() {
		this.base(arguments, "Resource", "resource/icons/16/infrastructure.png");
		this.setLayout(new qx.ui.layout.Grow());
		this.setPadding(0);
		this.setShowCloseButton(true);

		var explorer = new qx.ui.tabview.TabView();
		var page = new qx.ui.tabview.Page("Overview");
		page.setLayout(new qx.ui.layout.Grow());
		var page2 = new ca.inocybe.ui.views.VirtualMachineView();

		var page3 = new qx.ui.tabview.Page("Console");
		page3.setLayout(new qx.ui.layout.Grow());
		page3.add(new qx.ui.embed.Iframe("http://localhost/noVNC/vnc_auto.html"));
		var page4 = new qx.ui.tabview.Page("Metrics");
		page4.setLayout(new qx.ui.layout.Flow());
		var data = [[['compute', 3], ['network', 7], ['clouds', 2.5]]];

		var options = function($jqplot) {
			return {
				title : 'Avg CPU',
				seriesDefaults : {
					renderer : $jqplot.PieRenderer,
					rendererOptions : {
						sliceMargin : 8
					}
				},
				legend : {
					show : true
				}
			}
		};
		var plugins = ['pieRenderer'];
		var plot = new qxjqplot.Plot(data, options, plugins);
		plot.setWidth(320);
		plot.setHeight(200);
		page4.add(plot);
		var page5 = new qx.ui.tabview.Page("Carbon Management");
		page5.setLayout(new qx.ui.layout.Grow());

		explorer.setBarPosition("bottom");
		explorer.add(page);
		explorer.add(page2);
		explorer.add(page3);
		explorer.add(page4);
		explorer.add(page5);

		explorer.setContentPadding(0);

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
				rowData.push(["Test", "This is a sample description", "Network Element", qBars]);
			}
			return rowData;
		}
	}
});
