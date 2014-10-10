
/* ************************************************************************

   Copyright:
     2013 Inocybe Technologies inc., http://www.inocybe.ca

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Mathieu Lemay (mlemay)

************************************************************************ */

/* ************************************************************************

#asset(raphael/*)
#ignore(Raphael)

************************************************************************ */

/**
 * A qooxdoo wrapper for the Raphael SVG library.
 * The wrapper assumes to find a copy of raphael-min.js
 * in the resource/raphael directory. See the <a href="http://www.raphaeljs.com" / target="_blank">Raphael</a> website
 * for further information.
 *
 */
qx.Class.define("qxraphael.Raphael",
{
  extend : qx.ui.core.Widget,


  /**
   * @param data {Any} a csv file requestable via XHR, a csv file in string format, an array pointer or a GViz object.
   * @param options {Map} the option map.
   */
  construct : function(data, options)
  {
    this.base(arguments);
    var min = '.min';
    if (qx.core.Environment.get("qx.debug")) {
      min = '';
    }
    var codeArr = [];


    /*  if ( ! qx.core.Environment.get('html.canvas') && qx.core.Environment.get('engine.name') == 'mshtml'){
          this.__useExCanvas = true;
          if (!window.G_vmlCanvasManager){
              codeArr.push("excanvas"+min+".js");
          }
     } */
    codeArr.push("raphael-min.js");
    this.__loadScriptArr(codeArr, qx.lang.Function.bind(this.__addRaphael, this, data, options));
  },
  
  statics :
  {


    /**
     * map of loaded scripts
     */
    LOADED : {

    },


    /**
     * map of objects in the process of loading a particular script
     */
    LOADING : {

    }

    
  },
  events :
  {


    /**
     * returns the plot object
     */
    paperCreated : 'qx.event.type.Event',


    /**
     * fires when a script is loaded
     */
    scriptLoaded : 'qx.event.type.Event'
  },
  members :
  {
  
    getPaper : function() {
      return this.__paperObject;
    },


    /**
     * Chain loading scripts.
     */
    __loadScriptArr : function(codeArr, handler)
    {
      var script = codeArr.shift();
      if (script) {
        if (qxraphael.Raphael.LOADING[script]) {
          qxraphael.Raphael.LOADING[script].addListenerOnce('scriptLoaded', function() {
            this.__loadScriptArr(codeArr, handler);
          }, this);
        } else if (qxraphael.Raphael.LOADED[script]) {
          this.__loadScriptArr(codeArr, handler);
        } else {
          qxraphael.Raphael.LOADING[script] = this;
          var sl = new qx.io.ScriptLoader();
          var src = qx.util.ResourceManager.getInstance().toUri("raphael/" + script);
          sl.load(src, function(status)
          {
            if (status == 'success')
            {

              // this.debug("Dynamically loaded "+src+": "+status);
              this.__loadScriptArr(codeArr, handler);
              qxraphael.Raphael.LOADED[script] = true;
            }
            qxraphael.Raphael.LOADING[script] = null;
            this.fireDataEvent('scriptLoaded', script);
          }, this);
        }

      } else {
        handler();
      }
    },


    /**
     * our copy of the plot object
     */
    __paperObject : null,


    /**
     * Create the raphael object once everything is loaded
     *
     * @lint ignoreUndefined(Raphael)
     */
    __addRaphael : function(data, options)
    {
      var el = this.getContentElement().getDomElement();

      /* make sure the element is here yet. Else wait until things show up */
      if (el == null) {
        this.addListenerOnce('appear', qx.lang.Function.bind(this.__addRaphael, this, data, options), this);
      } else {

        // make it use theme fonts
        qx.bom.element.Style.setStyles(this.getContentElement().getDomElement(), qx.theme.manager.Font.getInstance().resolve('default').getStyles(), true);
        //qx.lang.Object.mergeWith(options, qxdygraphs.Plot.DEFAULT_OPTIONS, false);
        var paper = this.__paperObject = new Raphael(el);
        //paper.setViewBox(0,0,1500,1500,true);
        //paper.setSize(400, 600);
    
        this.addListener('resize', function(e)
        {
          qx.html.Element.flush();
          console.log(e.getData());
          var newWidth = e.getData().width;
          var newHeight = e.getData().height;
          paper.setSize(newWidth,newHeight);
        });
        this.fireDataEvent('paperCreated', paper);
      }
    }
  }
});
