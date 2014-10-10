/* ************************************************************************

   Copyright: Inocybe Technologies inc. (2012)

   License: Proprietary
 
   Authors: Mathieu Lemay

************************************************************************ */

/* ************************************************************************

#asset(ca/inocybe/neteditor/*)

************************************************************************ */

qx.Class.define("ca.inocybe.neteditor.Canvas",
{
  extend : qx.ui.core.Widget,


  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * @param canvasWidth {Integer} The internal with of the canvas coordinates.
   * @param canvasHeight {Integer} The internal height of the canvas coordinates.
   */
  construct : function(canvasWidth, canvasHeight)
  {
    this.base(arguments);

    this.__deferredDraw = new qx.util.DeferredCall(this.__redraw, this);
    this.addListener("resize", this._onResize, this);

    if (canvasWidth !== undefined) {
      this.setCanvasWidth(canvasWidth);
    }

    if (canvasHeight !== undefined) {
      this.setCanvasHeight(canvasHeight);
    }
  },



  /*
   *****************************************************************************
      EVENTS
   *****************************************************************************
   */

  events :
  {
    /**
     * The redraw event is fired each time the canvas dimension change and the
     * canvas needs to be updated. The data field contains a map containing the
     * <code>width</code> and <code>height</code> of the canvas and the
     * rendering <code>context</code>.
     */
    "redraw" : "qx.event.type.Data"
  },



  /*
   *****************************************************************************
      MEMBERS
   *****************************************************************************
   */

  properties :
  {
    /** Whether canvas and widget coordinates should be synchronized */
    syncDimension :
    {
      check : "Boolean",
      init : false
    },

    /** The internal with of the canvas coordinates */
    canvasWidth :
    {
      check : "Integer",
      init : 300,
      apply : "_applyCanvasWidth"
    },

    /** The internal height of the canvas coordinates */
    canvasHeight :
    {
      check : "Integer",
      init : 150,
      apply : "_applyCanvasHeight"
    },
     
     /** Internal Figures */
    figures :
    {
      check : "Array",
      init : [],
      apply : "_applyFigures"
    }
  },



  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /** {qx.util.DeferredCall} */
    __deferredDraw : null,

	__paper: null,
    /*
    ---------------------------------------------------------------------------
      WIDGET API
    ---------------------------------------------------------------------------
    */

    // overridden
    _createContentElement : function() {
      return new qx.html.Element();
    },


    /**
     * This methods triggers the redraw of the canvas' content
     */
    __redraw : function()
    {
      var canvas = this.getContentElement();
     // var height = canvas.getHeight();
     // var width = canvas.getWidth();
     // var context = canvas.getContext2d();
      this.__paper = Raphael(canvas.getDomElement().id, this.getWidth(), this.getHeight());

      this._draw(width, height, context);
      this.fireNonBubblingEvent(
        "redraw",
        qx.event.type.Data,
        [{
          width: width,
          height: height,
          context: context
        }]
      );
    },


    // property apply
    _applyCanvasWidth : function(value, old)
    {
      this.getContentElement().getDomElement().setWidth(value);
      this.__deferredDraw.schedule();
    },


    // property apply
    _applyCanvasHeight : function(value, old)
    {
      this.getContentElement().getDomElement().setHeight(value);
      this.__deferredDraw.schedule();
    },

    // property apply
    _applyFigures : function(value, old)
    {
      this.__deferredDraw.schedule();
    },

    /**
     * Redraw the canvas
     */
    update : function() {
      this.__deferredDraw.schedule();
    },


    /**
     * Widget resize event handler. Updates the canvas dimension if needed.
     *
     * @param e {qx.event.type.Data} The resize event object
     */
    _onResize : function(e)
    {
      var data = e.getData();

      if (this.getSyncDimension())
      {
        this.setCanvasHeight(data.height);
        this.setCanvasWidth(data.width);
      }
    },


    /**
     * Get the native canvas 2D rendering context
     * [<a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas.html#canvasrenderingcontext2d">W3C-HTML5</a>].
     * All drawing operations are performed on this context.
     *
     * @return {CanvasRenderingContext2D} The 2D rendering context.
     */
    getContext2d : function() {
      return this.getContentElement().getContext2d();
    },


    /**
     * Template method, which can be used by derived classes to redraw the
     * content. It is called each time the canvas dimension change and the
     * canvas needs to be updated.
     *
     * @param width {Integer} New canvas width
     * @param height {Integer} New canvas height
     * @param context {CanvasRenderingContext2D} The rendering context to draw to
     */
    _draw : function(width, height, context) {}
  },



  /*
   *****************************************************************************
      DESTRUCT
   *****************************************************************************
   */
  destruct : function() {
    this._disposeObjects("__deferredDraw");
  }
});
