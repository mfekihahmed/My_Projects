qx.Class.define("ca.opennms.boot.ProgressiveLoader", {
	extend : dialog.Dialog,
	
	members : {
		_progressive : null,
		
		setDataModel:function(datamodel){
			this._progressive.setDataModel(datamodel);
		},
		render : function() {
			this._progressive.render();
		},
		_createWidgetContent : function() {
			// We'll use the progressive table's progress footer.  For that, we
			// need to define column widths as if we were a table.
			var columnWidths = new qx.ui.progressive.renderer.table.Widths(1);
			columnWidths.setWidth(0, "100%");

			// Instantiate a Progressive
			var footer = new qx.ui.progressive.headfoot.Progress(columnWidths);
			var structure = new qx.ui.progressive.structure.Default(null, footer);
			this._progressive = new qx.ui.progressive.Progressive(structure);

			// We definitely want to see each progress as we're loading.  Ensure
			// that the widget queue gets flushed
			this._progressive.setFlushWidgetQueueAfterBatch(true);

			var addFunc = function(func) {
				var ret = {
					renderer : "func",
					data : func
				};
				return ret;
			};

			// Instantiate a Function Caller
			var functionCaller = new qx.ui.progressive.renderer.FunctionCaller();

			// Give Progressive the renderer, and assign a name
			this._progressive.addRenderer("func", functionCaller);

			var qooxdooUrl = "images/open_nms.png";
			var qooxdoo = new qx.ui.basic.Image(qooxdooUrl, "100%", "100%");
			this._progressive.add(qooxdoo);

			// Make the Progressive fairly small
			this._progressive.set({
				height : 120,
				width : 300,
				zIndex : 99999,
				backgroundColor : "white",
				opacity : 1,
				batchSize : 10
			});

			this.add(this._progressive);

			this._progressive.addListener("renderStart", function(e) {
				// Our event data is an object containing the 'state' object and
				// the number of elements to be rendered.
				var state = e.getData().state;
				var initialNum = e.getData().initial;

				// Save our context in the userData field of the state object.
				state.getUserData().context = this.context;
				qx.event.Timer.once(function() {
					
				},this,10)
				// Also save the number of elements for our progress bar usage.
				state.getUserData().initialNum = initialNum;
			}, this);

			this._progressive.addListener("renderEnd", function(e) {
				// We don't need the Progressive any longer.  Arrange for it to be
				// destroyed.
				qx.event.Timer.once(function() {
					this.getLayoutParent().remove(this);
					this.dispose();
				}, this, 0);
			});
		}
	}
});
