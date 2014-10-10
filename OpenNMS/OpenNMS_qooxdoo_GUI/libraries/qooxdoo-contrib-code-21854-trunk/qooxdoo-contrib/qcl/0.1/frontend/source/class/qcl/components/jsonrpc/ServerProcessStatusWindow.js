/* ************************************************************************


    Widget class 'qcl.components.jsonrpc.ServerProcessStatusWindow'.
    This file is auto-generated. Do not edit, manual changes will be overwritten.


    qooxdoo v.0.7 code generated by QxTransformer v.

************************************************************************ */


/* ************************************************************************
#embed(qx.icontheme/16/actions/dialog-cancel.png)


************************************************************************ */

/**
 * @todo: add documentation here auto-generated from qxml file
 */
qx.Class.define("qcl.components.jsonrpc.ServerProcessStatusWindow",
{
  extend : qx.ui.window.Window,

  include : [ qcl.components.jsonrpc.ServerProcessStatus ],

    
  /**
   * widget property, is deprecated and will be removed
   * @deprecated
   */
  properties : {
        widget : { check : "Object" }
  },
    
  /**
   * Constructor
   */
  construct : function()
  {
    // call parent class
    this.base(arguments);

    //call paint method to draw widget
    this.paint();
  },


  members :
  {

    /**
     * Draw widget
     */
    paint: function ()
    {
      // Client document object
      var qx_id97166 = qx.ui.core.ClientDocument.getInstance();

/** begin auto-generated gui code **/

this.setWidth(400);
this.setHeight("auto");
this.setCaption(this.tr("Server Process"));
this.setShowMinimize(false);
this.setShowMaximize(false);
this.setShowClose(false);

this.addEventListener("appear",function(event)
{
this.centerToBrowser()
},this);

this.addEventListener("displayServerMessage", function(event){this.handleDisplayServerMessage(event,this);},this);

this.addEventListener("endProcess", function(event){this.handleEnd(event,this);},this);

var qx_id98299 = new qx.ui.layout.VerticalBoxLayout();
qx_id98299.setSpacing(5);
qx_id98299.setPadding(10);
qx_id98299.setWidth("100%");
qx_id98299.setHeight("100%");
this.add(qx_id98299);

var qx_id100300 = new qx.ui.layout.HorizontalBoxLayout();
qx_id100300.setWidth("100%");
qx_id100300.setHeight("1*");
qx_id100300.setSpacing(10);
qx_id100300.setVerticalChildrenAlign("middle");
qx_id98299.add(qx_id100300);

this.displayLabel = new qx.ui.basic.Label(this.tr(" "));
this.displayLabel.setWrap(true);
this.displayLabel.setHeight("100%");
this.displayLabel.setWidth("1*");
this.displayLabel.setMode("html");
qx_id100300.add(this.displayLabel);

var qx_id100322 = new qx.ui.layout.HorizontalBoxLayout();
qx_id100322.setWidth("100%");
qx_id100322.setHeight("auto");
qx_id100322.setHorizontalChildrenAlign("center");
qx_id100322.setSpacing(10);
qx_id98299.add(qx_id100322);

var qx_id100331 = new qx.ui.form.Button(this.tr("Cancel"),"icon/16/actions/dialog-cancel.png");
qx_id100331.setWidth("auto");
qx_id100331.setHeight(25);
qx_id100322.add(qx_id100331);

qx_id100331.addEventListener("execute", function(event){this.handleEnd(event,qx_id100331);},this);

/** end auto-generated gui code **/

      // set widget object, deprecated, will be removed
      this.setWidget(this);
    }

  }

});


