/**
 * #require(ca.inocybe.ui.sections.LibrarySection)
 * #require(ca.inocybe.ui.sections.InfrastructuresSection)
 * #use(ca.inocybe.ui.sections.*)
 */
qx.Class.define("ca.inocybe.ui.core.workbench.Workbench", {
	extend : qx.ui.container.Composite,
	construct : function() {
		this.base(arguments);
		// Create Layout as a Horizontal Box
		this.setLayout(new qx.ui.layout.VBox(5));

		this._createWidgetContent();
		/*content.__top.addListener("changePerspective", this.__switchPerspective, this);

		 content.__left = new qx.ui.container.Composite(new qx.ui.layout.VBox(0));
		 content.__center = new ca.inocybe.ui.core.workbench.WorkArea();

		 content.__left.add(new ca.inocybe.ui.sections.LibrarySection());

		 content.__left.addListener("navSelection", function(e) {
		 console.log(e.getData());
		 this.__center.launchView();
		 }, this);

		 this.add(this.__top, {
		 edge : "north"
		 });
		 this.add(this.__left, {
		 edge : "west"
		 });
		 this.add(this.__center, {
		 edge : "center"
		 });

		 */
	},
	properties : {
		header : {
			nullable : true
		},
		content : {
			check : qx.ui.core.Widget
		},
		footer : {

		}

	},
	members : {
		__workarea : null,
		__switchPerspective : function(perspective) {
			this.__workarea.loadPerspective(perspective);
		},
		_createWidgetContent : function(e) {
			var topbar = new ca.inocybe.ui.core.workbench.TopBar().set({
				maxHeight : 50
			});
			topbar.addListener("changePerspective", function(e) {
				this.__switchPerspective(e.getData());
			}, this)
			this.add(topbar);
			this.__workarea = new ca.inocybe.ui.core.workbench.WorkArea();

			this.add(this.__workarea, {
				flex : 1
			});
			// this.__workarea.launchView(new ca.inocybe.ui.views.LibraryExplorerView());
			this.__workarea.launchView(new ca.inocybe.ui.views.InfrastructureExplorerView());

			var footer = new qx.ui.embed.Html().set({
				alignX : "center"
			});
			footer.setHtml('<p style="text-align:center">Copyright &copy; 2013 Mohamed Fekih Ahmed: Synchromedia - Ericsson & Inocybe Technologies Inc.</p>');
                       //footer.setHtml('<p style="text-align:center">Mohamed Fekih Ahmed</p>');
			var platformLogo = new qx.ui.basic.Image("open_nms.png").set({
				alignX : "center"
			});
                        platformLogo.setScale(true);
                        platformLogo.setWidth(150);
                        platformLogo.setHeight(70); 
			this.add(new qx.ui.container.Composite(), {
				flex : 1
			});
			this.add(platformLogo);
			this.add(footer);
		}
	}
});
