/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(custom/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "custom"
 */
qx.Class.define("custom.Application",
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

      // Create a button
      //var button1 = new qx.ui.form.Button("", "custom/inocybe2.png");
     /*var button1= new qx.ui.form.ToggleButton("", "custom/inocybe2.png");
      button1.focus();
      button1.setBackgroundColor("white");*/
      // Document is the application root
      var doc = this.getRoot();
      doc.setBackgroundColor("white");

      // Add button to document at fixed coordinates
     // doc.add(button1, {left: 10, top: 10});

      // Add an event listener
      /*button1.addListener("execute", function(e) {
        alert("Inocybe App!");
      });*/
   var big = new qx.ui.basic.Image("custom/open_nms.png");
   
    big.setScale(true);
      big.setWidth(220);
      big.setHeight(100);
doc.add(big, {left: 20, top: 10});
   big.addListener("execute", function(e) {
        alert("Inocybe App!"); });

//
// create the tree
var tree = new qx.ui.tree.Tree();
tree.set({
  width: 250
});
this.getRoot().add(tree, {
left: 10, top: 170, bottom : 20});



// create and set the tree root
var root = new qx.ui.tree.TreeFolder("OpenFlow Switch");
root.setIcon("custom/openflow.png");
tree.setRoot(root);

// create some subitems
var f1 = new qx.ui.tree.TreeFolder("Ezsystem");
f1.setIcon("custom/ez.png");
root.add(f1);

// create a third layer
var f11 = new qx.ui.tree.TreeFile("Open Vswitch 1");
f11.setIcon("custom/activee.png");
var f12 = new qx.ui.tree.TreeFile("Open Vswitch 2");
f12.setIcon("custom/nnactivee.png");
f1.add(f11, f12);

// open the folders
root.setOpen(true);
f1.setOpen(true);
//
f11.addListener("execute", function(e) {
        alert("Inocybe App!");
      });
      //----------
      // frame
      //----------

      var frame = new qx.ui.embed.ThemedIframe();
      frame.addListener("load", function(e) {
        this.debug("Loaded: " + this.getSource());
      });

      // elastic
      
      frame.setSource("http://www.inocybe.ca");

      /*doc.add(frame, {
        top : 100,
        right : 10,
        bottom : 20,
        left : 300
      });*/
     //endframe 


 

  var buttonRemove = new qx.ui.form.Button("Remove");
      buttonRemove.set({ enabled: false });
      doc.add(buttonRemove, { top : 170,
        left : 300});


    }//fin main
  }//fin member
});//fin application.js
