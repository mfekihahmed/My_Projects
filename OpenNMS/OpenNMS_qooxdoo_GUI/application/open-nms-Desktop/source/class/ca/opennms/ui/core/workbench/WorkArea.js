/**
  The WorkArea is the main section of the interface. It loads the desired perspective.
 */

/* ************************************************************************

 All potential perspective viewparts must be listed here or compiler won't load it.
 this should be improved via partloading / toolchaining if possible. I have no idea how.
 

#require(ca.opennms.ui.sections.AdminSection)
#require(ca.opennms.ui.sections.AlarmsSection)
#require(ca.opennms.ui.sections.BlueprintSection)
#require(ca.opennms.ui.sections.BrowseSection)
#require(ca.opennms.ui.sections.EventsSection)
#require(ca.opennms.ui.sections.LibrarySection)
#require(ca.opennms.ui.sections.OrgSection)
#require(ca.opennms.ui.sections.ReportsSection)
#require(ca.opennms.ui.sections.ProjectsSection)
#require(ca.opennms.ui.sections.ReportsSection)
#require(ca.opennms.ui.sections.SearchSection)
#require(ca.opennms.ui.sections.SecuritySection)
#require(ca.opennms.ui.sections.SubstrateSection)

************************************************************************ */

qx.Class.define("ca.opennms.ui.core.workbench.WorkArea", {
	extend : qx.ui.container.Composite,
	construct : function() {
		this.base(arguments);
		this.setLayout(new qx.ui.layout.Dock());
		this.__area = new qx.ui.tabview.TabView();
                //this.__area.setScale(true);
		this.__area.setWidth(1100);
                this.__area.setHeight(800);
                this.__area.setBarPosition("left");
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
                        //this.__leftContainer.setWidth(400);
			// this.__leftRadio.add(widget); // could not open more than one menu with this 
		},
		__createWidgetContent : function() {
			this.__leftContainer = new qx.ui.container.Composite(new qx.ui.layout.VBox(0)).set({
        decorator: "main",
        backgroundColor: "blue"
      });
			// this.__leftRadio = new qx.ui.form.RadioGroup();
                        //this.__leftContainer.setWidth(400);
			
                       //this.add(new ca.opennms.ui.sections.LibrarySection(), {edge: "west"});
			this.add(this.__leftContainer, {
				edge : "west"
			});
			this.add(this.__area, {
				edge : "center"
			});
                       /*this.add(this.__area, {
				edge : "west"
			},  {left: 250, right: 150});*/
		}
	}

});
