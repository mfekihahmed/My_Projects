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

#asset(noVNC/*)

************************************************************************ */

/**
 * A wrapper around noVNC. The wrapper assumes to find an unpacked copy of
 * the noVNC distribution in resource/noVNC.
 *
 **/
qx.Class.define("noVNC.Terminal", {
	extend : qx.ui.core.Widget,

	/**
	 * @param dataSeries {Array} data array to plot
	 * @param getOptions {Callback|Map} wither an option map or a function returning the option map after being called with jQuery.jqplot as an argument.
	 *
	 */

	construct : function() {
		this.base(arguments);

		var codeArr = ["util.js", "webutil.js", "base64.js", "websock.js", "des.js", "input.js", "display.js", "rfb.js", "ui.js"];

		this.__addCss("black.css");
		this.setWidth(200);
		this.__loadScriptArr(codeArr);
		this.addListenerOnce('appear', this.__addTerminal, this);
		this.addListener('scriptLoaded', function(e) {
			var script = e.getData();
			console.log("Loading Script "+script);
			if(script == "ui.js") {
				var el = this.getContentElement().getDomElement().id;
				console.log("Creating Terminal for " + el);
				UI.load(el);
			}
		}, this);
	},
	statics : {
		INSTANCE_COUNTER : 0,
		/**
		 * map of loaded scripts
		 */
		LOADED : {},
		/**
		 * map of objects in the process of loading a particular script
		 */
		LOADING : {}

	},
	events : {
		/**
		 * returns the plot object
		 */
		terminalCreated : 'qx.event.type.Event',
		/**
		 * fires when a script is loaded
		 */
		scriptLoaded : 'qx.event.type.Event'
	},
	members : {
		/**
		 * Once the jqPlot object has been created, returns a handle to the plot object
		 * use the plotCreated to learn when the plot gets created.
		 *
		 * @return {jqPlotObject}
		 */
		getTerminalObject : function() {
			return this.__TerminalObject;
		},
		/**
		 * Chain loading scripts.
		 */
		__loadScriptArr : function(codeArr, handler) {
			var script = codeArr.shift();
			if(script) {
				if(noVNC.Terminal.LOADING[script]) {
					noVNC.Terminal.LOADING[script].addListenerOnce('scriptLoaded', function() {
						this.__loadScriptArr(codeArr, handler);
					}, this);
				} else if(noVNC.Terminal.LOADED[script]) {
					this.__loadScriptArr(codeArr, handler);
				} else {
					noVNC.Terminal.LOADING[script] = this;
					var sl = new qx.io.ScriptLoader();
					var src = qx.util.ResourceManager.getInstance().toUri("noVNC/" + script);
					sl.load(src, function(status) {
						if(status == 'success') {
							// this.debug("Dynamically loaded "+src+": "+status);
							this.__loadScriptArr(codeArr, handler);
							noVNC.Terminal.LOADED[script] = true;
						}
						noVNC.Terminal.LOADING[script] = null;
						this.fireDataEvent('scriptLoaded', script);
					}, this);
				}
			} else {
				//      handler();
			}
		},
		/**
		 * Simple css loader without event support
		 */
		__addCss : function(url) {
			if(!noVNC.Terminal.LOADED[url]) {
				noVNC.Terminal.LOADED[url] = true;
				var head = document.getElementsByTagName("head")[0];
				var el = document.createElement("link");
				el.type = "text/css";
				el.rel = "stylesheet";
				el.href = qx.util.ResourceManager.getInstance().toUri("noVNC/" + url);
				setTimeout(function() {
					head.appendChild(el);
				}, 0);
			};
		},
		/**
		 * our copy of the plot object
		 */
		__plotObject : null,
		/**
		 * Create the canvas once everything is renderad
		 */
		__addTerminal : function() {
			var el = this.getContentElement().getDomElement();
			/* make sure the element is here yet. Else wait until things show up */
			if(el == null) {
			} else {

				var id = 'noVNCId' + (noVNC.Terminal.INSTANCE_COUNTER++);
				qx.bom.element.Attribute.set(el, 'id', id);
				//  this.fireDataEvent('terminalCreated', plot);
			}
		},
		__redraw : function() {
			// with out .flush() the plot div will not yet be
			// resized, causing the jqPlot not to render
			// properly
			qx.html.Element.flush();
			if(!this.isSeeable()) {
				//               // jqplot does not take kindely to being redrawn while not visible
				return;
			}

		}
	}
});
