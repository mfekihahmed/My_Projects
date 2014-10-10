/* ************************************************************************

   Inocybe Platform Console
   http://www.inocybetechnologies.com

   Copyright:
   2010-2011 Inocybe Technologies inc. Canada, http://www.inocybetechnologies.com

   License:
   Proprietary
     
   Authors:
     * Mathieu Lemay

************************************************************************ */

/**
 * A perspective defines how the layout of the different parts will be in the workbench. 
 */
qx.Interface.define("ca.inocybe.ui.core.perspective.IPerspective", {
	properties: {
		"description" : "Unknown Title",
		"label" : null,
		"image": null
	},
	members: {
		getId: function() {},
		getWorkbenchParts: function() {}     
	}
});
