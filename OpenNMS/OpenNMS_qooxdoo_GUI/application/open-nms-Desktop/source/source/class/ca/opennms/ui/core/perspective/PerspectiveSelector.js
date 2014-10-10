/**
 * Widget allowing to select the proper perspective/mode for the Management Console application
 * @author Mathieu Lemay (IT)
 */

qx.Class.define("ca.opennms.ui.core.perspective.PerspectiveSelector", {
	extend : qx.ui.container.Composite,

	events : {
		"changePerspective" : "qx.event.type.Data"
	},

	construct : function() {

		//Initialize base constructor
		this.base(arguments, new qx.ui.layout.HBox(5));
		this.__perspectiveRadio = new qx.ui.form.RadioGroup();
		this.__buildPerspectiveButtons();
		// Handle event and fire to parent widget
		this.__perspectiveRadio.addListener("changeSelection", function(e) {
			this.fireDataEvent("changePerspective", e.getData()[0].getPerspectiveData());
		}, this);
	},
	properties : {
		perspectives : {
			check : "Array",
			apply : "_applyPerspectives"
		}
	},
	members : {
		__perspectiveRadio : null,
		__applyPerspectives : function(value, old) {
			this.perspectives = value;
			this.__buildPerspectiveButtons();
		},
		__createButtons : function(perspectiveData) {
			
		},
		__buildPerspectiveButtons : function() {
			var perspectivesUrl = qx.util.ResourceManager.getInstance().toUri("ca/opennms/core/perspectives.json");
			var jsonStore = new qx.data.store.Json(perspectivesUrl);

			jsonStore.addListener("loaded", function(e) {
				var perspectives = e.getData().getPerspectives();
				//.toArray();
				for (var i = 0; i < perspectives.getLength(); i++) {
					var perspective = perspectives.getItem(i);
	//				console.log(perspective);
					var button = new ca.opennms.ui.core.perspective.PerspectiveSelectorButton(perspective.getTitle(), perspective.getIcon());
					button.setToolTipText(perspective.getTooltip());
					button.setPerspectiveData(perspective);
					this.__perspectiveRadio.add(button);
					this.add(button);
				}
			},this);
		}
	}
});
