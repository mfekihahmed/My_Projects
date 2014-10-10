/**
 * Widget allowing to select the proper perspective/mode for the Management Console application
 * @author Mathieu Lemay (IT)
 */

qx.Class.define("ca.inocybe.services.PerspectiveLoader", {
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
			this.fireDataEvent("changePerspective", e.getData());
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
			var perspectivesUrl = qx.util.ResourceManager.getInstance().toUri("ca/inocybe/core/perspectives.json");
			var jsonStore = new qx.data.store.Json(perspectivesUrl);

			jsonStore.addListener("loaded", function(e) {
				var perspectives = e.getData().getPerspectives().toArray();
				for (var i = 0; i < perspectives.length; i++) {
					var perspective = perspectives[i];
					var button = new ca.inocybe.ui.core.perspective.PerspectiveSelectorButton(perspective.getTitle(), "images/icons/32/provider.png");
					button.setToolTipText(perspective.getTooltip());
					button.setPerspectiveData(perspective);
					this.__perspectiveRadio.add(button);
					this.add(button);
				}
			},this);
		}
	}
});
