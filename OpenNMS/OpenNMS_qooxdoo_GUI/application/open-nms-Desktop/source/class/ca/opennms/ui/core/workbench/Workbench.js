/**
 * #require(ca.opennms.ui.sections.LibrarySection)
 * #require(ca.opennms.ui.sections.InfrastructuresSection)
 * #use(ca.opennms.ui.sections.*)
 */
qx.Class.define("ca.opennms.ui.core.workbench.Workbench", {
	extend : qx.ui.container.Composite,
	construct : function() {
		this.base(arguments);
		// Create Layout as a Horizontal Box
		this.setLayout(new qx.ui.layout.VBox(10));
                this.set({
                decorator: "main",
                backgroundColor: "blue"
                });

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
			var topbar = new ca.opennms.ui.core.workbench.TopBar().set({
				maxHeight : 300
			});
			topbar.addListener("changePerspective", function(e) {
				this.__switchPerspective(e.getData());
			}, this)
			this.add(topbar);
                        




			this.__workarea = new ca.opennms.ui.core.workbench.WorkArea();

			this.add(this.__workarea, {
				flex : 1
			});
                        this.__workarea.launchView(new ca.opennms.ui.views.opennms());
                        this.__workarea.launchView(new ca.opennms.ui.views.video());
                        //this.__workarea.launchView(new ca.opennms.ui.views.EcoloticInfrastructure());
                        this.__workarea.launchView(new ca.opennms.ui.views.Infrastructure());
                        this.__workarea.launchView(new ca.opennms.ui.views.LibraryView());
			   this.__workarea.launchView(new ca.opennms.ui.views.LibraryExplorerView());
                        this.__workarea.launchView(new ca.opennms.ui.views.InfrastructureOpennmsView());
                        //this.__workarea.launchView(new ca.opennms.ui.views.ipmi());
                        


                        //this.__workarea.launchView(new ca.opennms.ui.views.novnc());

                        //this.__workarea.launchView(new ca.opennms.ui.views.InfrastructureExplorerView());







			var footer = new qx.ui.embed.Html().set({
				alignX : "center"
			});
			footer.setHtml('<p style="text-align:center">Copyright &copy; 2013 Ecolotic project</p>');
                       //footer.setHtml('<p style="text-align:center">Mohamed Fekih Ahmed</p>');
			var platformLogo = new qx.ui.basic.Image("admin.png").set({
				alignX : "center"
			});
                        platformLogo.setScale(true);
                        platformLogo.setWidth(250);
                        platformLogo.setHeight(100); 
			this.add(new qx.ui.container.Composite(), {
				flex : 1
			});
			this.add(platformLogo);

                        /*var synchromedia = new qx.ui.basic.Image("sponsor.png").set({
				alignX : "center"
			});
                        synchromedia.setScale(true);
                        synchromedia.setWidth(370);
                        synchromedia.setHeight(55); 
			this.add(new qx.ui.container.Composite(), {
				flex : 2
			});
			this.add(synchromedia);*/

			this.add(footer);
                        this.setBackgroundColor("white");
		}
	}
});
