/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2005-2007 by  Department of Infrastructure (DOI) State Government of Victoria

   License:
     LGPL 2.1: http://www.gnu.org/licenses/lgpl.html

   Authors:
     * Simon Bull (sbull)

************************************************************************ */

/* ************************************************************************

#module(core)

************************************************************************ */

qx.Class.define("ext.constant.Event",
{
  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */

  statics :
  {
    // ClientDocument events not externalised in qx.constant.Event
    WINDOW_RESIZE            : "windowresize",

    // Splitpane pane resized
    SPLITPANE_RESIZE         : "splitpaneresize",

    // Widget events not externalised in qx.constant.Event
    CHANGE_INNER_WIDTH       : "changeInnerWidth",
    CHANGE_INNER_HEIGHT      : "changeInnerHeight",
    APPEAR                   : "appear",

    // RadioManager events not externalised in qx.constant.Event
    CHANGE_SELECTION         : "changeSelected",
    CHANGE_CHECKED           : "changeChecked",

    // Window events
    WINDOW_CLOSED            : "window-closed",

    // MapState events
    MAPSTATE_BUSY            : "mapstate-busy",
    CHANGE_POINT             : "changePointInDBUnits",

    // This event is thrown by MapManagerStateBroker when its underlying
    // MapManager changes its MapMode.
    MAP_MODE_CHANGED         : "map-mode-changed",

    // This event is thrown by MapManagerStateBroker when its underlying
    // MapManager changes the bounds of the current viewport.
    CHANGE_VIEW_PORT         : "changeVPInDBUnits",

    // This event is generated by the Coordinate system dropdown on the status bar.
    CHANGE_COORD_SYSTEM      : "changeCoordSystem",
    CHANGE_ZOOM              : "changeSelected",
    UNDO_ANNOTATIONS         : "undoAnnotations",
    CLEAR_ANNOTATIONS        : "clearAnnotations",

    // VeiwDialog events
    VIEW_MODIFIED            : "viewOfViewStateModified",

    // Where Am I Location events
    DESCRIPTION_UPDATE_EVENT : "DescriptionUpdated"
  }
});
