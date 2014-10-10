/* ************************************************************************

   qxe - qooxdoo extension framework

   Copyright:
     2010-2011 Cost Savers, http://www.cost-savers.net

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Stefan Andersson (sand)

************************************************************************ */

/* ************************************************************************

#asset(qxe/demo/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "qxe OptionPane"
 */
qx.Class.define("qxe.demo.Application",
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

      // Document is the application root
      var doc = this.getRoot();

      var window;

      var button = new qx.ui.form.Button("Press!");
      button.addListener("execute", function(e) {
        if(!window)
        {
          var label = new qx.ui.basic.Label("Just a label");

          window = new qxe.ui.window.Window();
          window.setLayout(new qx.ui.layout.Canvas());
          window.setHeight(100);
          window.setWidth(100);
          window.add(label);
          window.moveTo(110, 60);
          window.show();
        }
      }, this);

      doc.add(button, {left: 100, top: 50});
    }
  }
});

