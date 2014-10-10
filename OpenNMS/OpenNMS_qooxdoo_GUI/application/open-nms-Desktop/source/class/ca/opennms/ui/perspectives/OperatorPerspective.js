/**
 *
 */
qx.Class.define("ca.opennms.ui.perspectives.OperatorPerspective", {
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
			return [new ca.opennms.ui.sections.LibrarySection(), new ca.opennms.ui.sections.InfrastructuresSection(), new ca.opennms.ui.sections.EventsSection(), new ca.opennms.ui.sections.AlarmsSection(), new ca.opennms.ui.sections.ReportsSection()]
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
			var page = new ca.opennms.ui.views.ProjectView();
			tabView.add(page);
			var page2 = new ca.opennms.ui.views.ResourceView();
			tabView.add(page2);
			return tabView;
		}
	}

});
