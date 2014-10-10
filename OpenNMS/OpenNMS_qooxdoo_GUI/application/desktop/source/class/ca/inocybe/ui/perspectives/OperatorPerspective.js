/**
 *
 */
qx.Class.define("ca.inocybe.ui.perspectives.OperatorPerspective", {
	extend : qx.ui.container.Composite,
	construct : function() {

		this.base(arguments, new qx.ui.layout.Dock());
		var centerPane = new qx.ui.container.Composite(new qx.ui.layout.Dock());
		centerPane.add(this.getTabView2(), {
			edge : "center"
		});

		this.add(this.getCPanel(), {
			edge : "west"
		});
		this.add(centerPane, {
			edge : "center"
		});
	},
	members : {
		_getSections : function() {
			return [new ca.inocybe.ui.sections.LibrarySection(), new ca.inocybe.ui.sections.InfrastructuresSection(), new ca.inocybe.ui.sections.EventsSection(), new ca.inocybe.ui.sections.AlarmsSection(), new ca.inocybe.ui.sections.ReportsSection()]
		},
		getCPanel : function() {
			var container = new qx.ui.container.Composite(new qx.ui.layout.VBox());
			var group = new qx.ui.form.RadioGroup();
			this._getSections().forEach(function(x) {
				group.add(x);
				container.add(x);
			});
			return container;
		},
		getTabView2 : function() {
			var tabView = new qx.ui.tabview.TabView();
			tabView.setWidth(500);
			var page = new ca.inocybe.ui.views.ProjectView();
			tabView.add(page);
			var page2 = new ca.inocybe.ui.views.ResourceView();
			tabView.add(page2);
			return tabView;
		}
	}

});
