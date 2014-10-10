/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(ca/inocybe/neteditor/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "diagram"
 */
qx.Class.define("ca.inocybe.neteditor.Application",
{
  extend : qx.application.Standalone,



  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * This method contains the initial application code and gets called 
     * during startup of the application
     * 
     * @lint ignoreDeprecated(alert)
     */
    main : function()
    {
      // Call super class
      this.base(arguments);

      // Enable logging in debug variant
      if (qx.core.Environment.get("qx.debug"))
      {
        // support native logging capabilities, e.g. Firebug for Firefox
        qx.log.appender.Native;
        // support additional cross-browser console. Press F7 to toggle visibility
        qx.log.appender.Console;
      }

      /*
      -------------------------------------------------------------------------
        Below is your actual application code...
      -------------------------------------------------------------------------
      */


	  var canvas = new ca.inocybe.neteditor.Canvas(300,300);
      // Document is the application root
      var doc = this.getRoot();

      // Add button to document at fixed coordinates
      doc.add(canvas, {left: 100, top: 50});


    }
  }
});
