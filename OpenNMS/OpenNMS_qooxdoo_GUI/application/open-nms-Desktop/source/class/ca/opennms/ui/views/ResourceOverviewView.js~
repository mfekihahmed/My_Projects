qx.Class.define("ca.inocybe.ui.views.ResourceOverviewView", {
	extend : qx.ui.tabview.Page,
	construct : function() {
		this.base(arguments, "Overview", "images/icons/16/infrastructure.png");
		this.setLayout(new qx.ui.layout.Flow(10));
		this.setPadding(20);
		var summary = new collapsablepanel.Panel("Summary").set({
			width : 300
		});
		var hardware = new collapsablepanel.Panel("Hardware Profile").set({
			width : 300
		});
		var permissions = new collapsablepanel.Panel("Permissions").set({
			width : 300
		});
		var costs = new collapsablepanel.Panel("Costs").set({
			width : 300
		});
		costs.setLayout(new qx.ui.layout.Grid());
		costs.add(new qx.ui.basic.Label("Hourly Cost"),{row:0,column:0});
		costs.add(new qx.ui.basic.Label("0.04$"),{row:0,column:1});
		costs.add(new qx.ui.basic.Label("Instance Cost"),{row:1,column:0});
		costs.add(new qx.ui.basic.Label("0.00$"),{row:1,column:1});
		costs.add(new qx.ui.basic.Label("Usage History"),{row:1,column:0});
		var plotinfo = {
            title: 'Unit Revenues: Acme Traps Division',
            data: [
                [4, 2, 9, 16],
                [3, 7, 6.25, 3.125]
            ],
            options: function($jqplot){return{
                stackSeries: true,
                legend: {show: true, location: 'nw'},
                title: 'Unit Revenues: Acme Traps Division',
                seriesDefaults: {renderer: $jqplot.BarRenderer,rendererOptions: {barWidth: 50}
                },
                series: [{label: '1st Qtr'}, {label: '2nd Qtr'}],
                axes: {
                    xaxis: {
                        renderer: $jqplot.CategoryAxisRenderer, 
                        ticks:['Red', 'Blue', 'Green', 'Yellow']
                    }, 
                    yaxis: {
                        min: 0, 
                        max: 20, 
                        numberTicks:5, 
                        tickOptions:{formatString:'$%.2f'}
                    }
                }

            }},
            plugins: ['categoryAxisRenderer','barRenderer']
        }
		this.add(summary);
		this.add(permissions);
		this.add(costs);
	}
});
