/**
  The WorkArea is the main section of the interface. It loads the desired perspective.
 */

/* ************************************************************************

 All potential perspective viewparts must be listed here or compiler won't load it.
 this should be improved via partloading / toolchaining if possible. I have no idea how.
 

#require(ca.inocybe.ui.sections.AdminSection)
#require(ca.inocybe.ui.sections.AlarmsSection)
#require(ca.inocybe.ui.sections.BlueprintSection)
#require(ca.inocybe.ui.sections.BrowseSection)
#require(ca.inocybe.ui.sections.EventsSection)
#require(ca.inocybe.ui.sections.LibrarySection)
#require(ca.inocybe.ui.sections.OrgSection)
#require(ca.inocybe.ui.sections.ReportsSection)
#require(ca.inocybe.ui.sections.ProjectsSection)
#require(ca.inocybe.ui.sections.ReportsSection)
#require(ca.inocybe.ui.sections.SearchSection)
#require(ca.inocybe.ui.sections.SecuritySection)
#require(ca.inocybe.ui.sections.SubstrateSection)

************************************************************************ */

qx.Class.define("ca.inocybe.ui.core.workbench.WorkArea", {
	extend : qx.ui.container.Composite,
	construct : function() {
		this.base(arguments);
		this.setLayout(new qx.ui.layout.Dock());
		this.__area = new qx.ui.tabview.TabView();
		this.__area.setWidth(500);
		this.__createWidgetContent();
	},
	members : {

		__area : null,
		__leftContainer : null,
		__leftRadio : null,

		launchView : function(p) {
			this.__area.add(p);
		},

		loadPerspective : function(perspective) {
			this.__leftContainer.removeAll();
			// this.__leftRadio.dispose();
			// this.__leftRadio = new qx.ui.form.RadioGroup();

			var parts = perspective.getDesktopParts();
            for (var i = 0; i < parts.getLength(); i++) {
				var part = parts.getItem(i);
				var partClass = qx.Class.getByName(part.getClassName());
				// console.log(partClass);
				var widget = new partClass();
				if (part.getLocation() == "west"){
					this.__addLeft(widget);
				}
			}
			// console.log("this: "+this.__leftRadio.getChildren());
			// console.log("this: "+this.getChildren()[0]);
		},
		__addLeft : function(widget) {
			this.__leftContainer.add(widget);
			// this.__leftRadio.add(widget); // could not open more than one menu with this 
		},
		__createWidgetContent : function() {
			this.__leftContainer = new qx.ui.container.Composite(new qx.ui.layout.VBox(0));
			// this.__leftRadio = new qx.ui.form.RadioGroup();

			//this.add(new ca.inocybe.ui.sections.LibrarySection(), {edge: "north"});
			this.add(this.__leftContainer, {
				edge : "west"
			});
			this.add(this.__area, {
				edge : "center"
			});
		}
	}

});
