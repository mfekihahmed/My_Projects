/**
 * @author Inocult
 */
qx.Class.define("ca.opennms.table.CapabilitiesRenderer",
{
  extend : qx.ui.table.cellrenderer.Html,

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    // overridden
    _getContentHtml : function(cellInfo) {
      
      return ("<img src=\"resource/icons/16/library.png\"/>");
    },

    // overridden
    _getCellClass : function(cellInfo) {
      return "qooxdoo-table-cell";
    }
  }
});
