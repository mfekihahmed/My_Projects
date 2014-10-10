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
 * A workbench part is used to represent a Widget or set of widgets provided to different
 * areas of the the Workbench based on the perspective definition.
 */
qx.Interface.define("ca.opennms.ui.core.workbench.IWorkbenchPart", {
	properties: {
		"title" : "Unknown Title",
		"titleImage" : null,
		"titleTooltip": null
	}
});
