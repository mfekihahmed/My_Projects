/**
 * A Toggle Button that is part of a RadioGroup used by the PerspectiveSelector
 * @author Mathieu Lemay (IT)
 */

qx.Class.define("ca.opennms.ui.core.perspective.PerspectiveSelectorButton", {
	extend : qx.ui.form.ToggleButton,
	implement : [qx.ui.form.IRadioItem],
	members : {
		__perspectiveData : null,
		
		setPerspectiveData : function(data) {
		this.__perspectiveData = data;//qx.lang.Object.clone(data);
		},
		
		getPerspectiveData : function() {
			return this.__perspectiveData;
		}
	}
	/** properties : {
	 group : {
	 refine: true
	 }
	 }**/

});
