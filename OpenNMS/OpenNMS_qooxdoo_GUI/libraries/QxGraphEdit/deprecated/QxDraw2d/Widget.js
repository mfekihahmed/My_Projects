/* ************************************************************************

Copyright:
2011 Inocybe Technologies inc.

License:
LGPL: http://www.gnu.org/licenses/lgpl.html
EPL: http://www.eclipse.org/org/documents/epl-v10.php
See the LICENSE file in the project's top-level directory for details.

Authors:
* Mathieu Lemay (IT)

************************************************************************ */

/* ************************************************************************

#asset(draw2d/*)
#require(draw2d.*)

************************************************************************ */

/**
 * A wrapper around noVNC. The wrapper assumes to find an unpacked copy of
 * the noVNC distribution in resource/noVNC.
 *
 **/
var todo = [];
qx.Class.define("QxDraw2d.Widget", {
	extend : qx.ui.core.Widget,
	/**
	 * @param dataSeries {Array} data array to plot
	 * @param getOptions {Callback|Map} wither an option map or a function returning the option map after being called with jQuery.jqplot as an argument.
	 *
	 */

	/**		codeArr.push("wz_jsgraphics.js");
	 codeArr.push("mootools.js");
	 codeArr.push("moocanvas.js");
	 codeArr.push("draw2d.js");
	 **/
	construct : function() {
		this.base(arguments);
		this.addListener('resize', this.__redraw, this);
		this.addListenerOnce('appear', this.__draw, this);
		/* load the ExtJS scripts */
		if(!window.draw2d) {
			var rm = qx.util.ResourceManager.getInstance();
			var sl = new qx.io.ScriptLoader();
			sl.load(rm.toUri('draw2d/wz_jsgraphics.js'), function(status) {
				if(status == 'success') {
					var sl2 = new qx.io.ScriptLoader();
					sl2.load(rm.toUri('draw2d/mootools.js'), function(status) {
						if(status == 'success') {
							var sl3 = new qx.io.ScriptLoader();
							sl3.load(rm.toUri('draw2d/moocanvas.js'), function(status) {
								if(status == 'success') {
									var sl4 = new qx.io.ScriptLoader();
									sl4.load(rm.toUri('draw2d/draw2d.js'), function(status) {
										if(status == 'success') {
											while(todo.length > 0) {
												todo.shift()();
											}
										} else {
											alert("Faild to load Draw2d");
										}
									});
								} else {
									alert("Faild to load MooCanvas");
								}
							});
						} else {
							alert("Faild to load MooTools");
						}
					});
				} else {
					alert("Faild to load JsGraphics");
				}
			});
		}
	},
	properties : {
		draw2dHandle : {
			init : null
		}
	},
	members : {
		__map : null,
		__dom : null,
		__draw : function(e) {
			if(window.draw2d) {
				var dom = this.__dom = this.getContentElement().getDomElement();
				qx.bom.element.Style.setStyles(dom, {
					backgroundColor : '#ffffff'
				}, true);
				var width = qx.bom.element.Dimension.getWidth(dom);
				var height = qx.bom.element.Dimension.getHeight(dom);
				if(this.getContentElement().getChild(0) == null) {
					var canvas = new qx.html.Element("div", {
						'width' : '300px',
						'height' : '200px'
					}, {
						'id' : 'draw2dCanvas2'
					});
				this.getContentElement().add(canvas);
				this.debug("First Loop");
				this.__draw();
				}
				else {
					this.debug("Second Loop");
					this.debug(this.getContentElement().getChild(0));
					this.setDraw2dHandle(new draw2d.Workflow("draw2dCanvas"));
					var node1 = new draw2d.Oval();
					node1.setDimension(100, 40);
					node1.setBackgroundColor(new draw2d.Color(255, 0, 0));
					this.getDraw2dHandle().addFigure(node1, 0, 0);
				}
			} else {
				todo.push(qx.lang.Function.bind(this.__draw, this));
			}
		},
		__redraw : function(e) {
			var hand = this.getDraw2dHandle();
			if(hand) {
				qx.html.Element.flush();
				var chart = this.getDraw2dHandle();
				var dom = this.__dom;
				var dim = qx.bom.element.Dimension;
				//	chart.setSize(dim.getWidth(dom), dim.getHeight(dom));
			}
		}
	}
});
