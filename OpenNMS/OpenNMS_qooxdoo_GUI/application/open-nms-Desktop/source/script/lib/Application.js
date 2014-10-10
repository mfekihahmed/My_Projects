// declare the namespace for this graphApp
var graphApp = {};

/**
 * 
 * The **GraphicalEditor** is responsible for layout and dialog handling.
 * 
 * @author Andreas Herz
 * @extends draw2d.ui.parts.GraphicalEditor
 */
graphApp.Application = Class.extend(
{
    NAME : "graphApp.Application", 

    /**
     * @constructor
     * 
     * @param {String} canvasId the id of the DOM element to use as paint container
     */
    init : function(id)
    {		
            this.defaultRouter = new draw2d.layout.connection.CircuitConnectionRouter();
            var leIdDom = $('#'+id);
            var leIdDomParent = $('#'+id).parent();

            $('<div id="toolbar'+id+'" style="z-index:0;position:absolute;cursor:default;top:0px;width:100%;height:40px;border-bottom: 1px solid black;"></div>').insertBefore(leIdDom);
            $('<div id="rightStats" style="z-index:0;position:relative;cursor:default;margin-top:50px;float:right;background:white;width:275px;height:300px;overflow-y:scroll;overflow-x:hidden;border:1px solid black;"></div>').appendTo(leIdDomParent);
            
			var rightStats = $('#rightStats');
			rightStats.append('<button id="xClose">X</button>');
			rightStats.append('<div id="rightStatsContentContainer"></div>');
			rightStats.draggable({containment: leIdDomParent});
			rightStats.hide();

	        this.view = new graphApp.View(id);
            this.toolbar = new graphApp.Toolbar("toolbar"+id, this.view);
            $('#'+id).parent().attr('id', 'content'+id);

	        this.appLayout = $('#'+id).parent().parent().layout({
	            center: {
	              resizable:false,
	              closable:false,
       	             spacing_open:0,
       	          spacing_closed:0,
	              paneSelector: "#content"+id
	            }
	        });

	       this.contentLayout = $('#'+id).parent().layout({
	   	     north: {
	              resizable:false,
	              closable:false,
                  spacing_open:0,
                  spacing_closed:0,
                  size:50,
	              paneSelector: "#toolbar"+id
	            },
	            center: {
	              resizable:false,
	              closable:false,
                  spacing_open:0,
                  spacing_closed:0,
	              paneSelector: '#'+id
	            }
	       });
	},

	load: function(jsonDocument){
	    this.view.clear();
	    
	    // unmarshal the JSON document into the canvas
	    // (load)
	    var reader = new draw2d.io.json.Reader();
	    reader.unmarshal(this.view, jsonDocument);
	    
	},

	addFigure: function(element, x, y){
		this.view.addFigure(element, x, y);
	},
	
	createConnection: function(sourcePort, targetPort){
	    var conn = new MyConnection();
	    conn.setRouter(this.defaultRouter);
	    conn.setStroke(3);
	    return conn;
	}


});