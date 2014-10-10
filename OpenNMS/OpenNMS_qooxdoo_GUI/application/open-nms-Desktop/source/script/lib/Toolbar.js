
graphApp.Toolbar = Class.extend({
	
	init:function(elementId, view){

		function physicalToJson(){
			var allFigures = view.getFigures();
			var arrayOfFigures = Array();
			var json = "";
			json+="{";
			json+='"figures" : '+'[';
			for(var i = 0; i < allFigures.size; i++){
				arrayOfFigures.push(allFigures.data[i]);
				var port = allFigures.data[i].hybridPorts.data[0];
				json+="{";
				json+='"type"'+' : '+'"'+arrayOfFigures[i].shape.type+'",';
				json+='"imagePath"'+' : '+'"'+arrayOfFigures[i].path+'",';
				json+='"x"'+' : '+'"'+arrayOfFigures[i].x+'",';
				json+='"y"'+' : '+'"'+arrayOfFigures[i].y+'",';
				json+='"id"'+' : '+'"'+arrayOfFigures[i].id+'",';
				json+='"width"'+' : '+'"'+arrayOfFigures[i].width+'",';
				json+='"height"'+' : '+'"'+arrayOfFigures[i].height+'",';
				json+='"vms" : [';
				for(var j = 0; j < arrayOfFigures[i].listVm.length; j++){
					json+='"'+arrayOfFigures[i].listVm[j]+'"';
					if(j != arrayOfFigures[i].listVm.length-1){
						json+=',';
					}
				}
				json+=']';
				json+='}';
				if(i != allFigures.size - 1){
					json+=',';
				}
			}
			json+="]";
			json+="}";
			_self.r.resolve();
			return json;
		}
		function physicalJsonToCanvas(data){
			this.portCounter = 0;
			// var data = {"figures" : [{"type" : "image","imagePath" : "resource/Switch.png","x" : "100","y" : "100","width" : "50","height" : "50","vms" : []},{"type" : "image","imagePath" : "resource/Switch.png","x" : "200","y" : "200","width" : "50","height" : "50","vms" : []}]} 
			var element = "";
			console.log(data.figures[0]);
			for(var i = 0; i < data.figures.length; i ++){
				if(data.figures[i].imagePath == "resource/Switch.png"){
					element = new Switch(data.figures[i].imagePath, parseInt(data.figures[i].width), parseInt(data.figures[i].height));
				}else if(data.figures[i].imagePath == "resource/Host.png"){
					element = new Host(data.figures[i].imagePath, parseInt(data.figures[i].width), parseInt(data.figures[i].height));
                                
				}else if(data.figures[i].imagePath == "resource/ovs.png"){
					element = new OVS(data.figures[i].imagePath, parseInt(data.figures[i].width), parseInt(data.figures[i].height));
                                
				}else if(data.figures[i].imagePath == "resource/slice.png"){
					element = new OvsSlice(data.figures[i].imagePath, parseInt(data.figures[i].width), parseInt(data.figures[i].height));
                                
				}else if(data.figures[i].imagePath == "resource/openstack.png"){
					element = new Openstack(data.figures[i].imagePath, parseInt(data.figures[i].width), parseInt(data.figures[i].height));
				}
				element.setId(data.figures[i].id);

			if($('#toggleButton').text() == "Virtual view"){ // going to physical view
		        var locator = new draw2d.layout.locator.Locator(element);
		        var port = new draw2d.HybridPort("port"+this.portCounter);
		        this.portCounter++;
		        // algo to place elements and ports
		        element.addPort(port, locator, 0, 0);
		        for(var j = 0; j < data.figures[i].vms.length; j++){
		        	element.addVm(data.figures[i].vms[j]);
		        }
		    }
		  		view.addFigure(element, parseInt(data.figures[i].x), parseInt(data.figures[i].y));
			}
			if($('#toggleButton').text() == "Virtual view"){ // going to physical view
				for(var i = 0; i < _self.physicalSource.length; i++){
					var source = view.getFigure(_self.physicalSource[i]);
					var target = view.getFigure(_self.physicalTarget[i]);
					var conn = new MyConnection();
					conn.setRouter(new draw2d.layout.connection.CircuitConnectionRouter());
					conn.setSource(source.getHybridPort(0));
					conn.setTarget(target.getHybridPort(0));
					view.addFigure(conn);
				}
			}
			return;
		}

		var _self = this;
		this.physicalTempCanvas = "";
		this.virtualTempCanvas = "";
		this.html = $("#"+elementId);
		this.view = view;
		this.physical = "";
		this.r = "";
		this.physicalSource = Array();
		this.physicalTarget = Array();
		this.virtual = "";
		this.portCounter = 0;

		
		// register this class as event listener for the canvas
		// CommandStack. This is required to update the state of 
		// the Undo/Redo Buttons.
		// 
		view.getCommandStack().addEventListener(this);

		// Register a Selection listener for the state hnadling
		// of the Delete Button
		//
		view.addSelectionListener(this);
		
		// Inject the UNDO Button and the callbacks
		//
		/*this.undoButton  = $('<button id="undoButton" style="z-index:0;position:absolute;cursor:default;left:130px;top:11px;width:29px;height:29px;"><img src="resource/icons/16/undo.png" alt="Undo" /></button>');
		this.html.append(this.undoButton);
		this.undoButton.button().on('click', $.proxy(function(){
		    this.view.getCommandStack().undo();
		}, this));
		this.undoButton.prop("disabled", true);

		// Inject the REDO Button and the callback
		//
		this.redoButton  = $('<button id="redoButton" style="z-index:0;position:absolute;cursor:default;left:170px;top:11px;width:29px;height:29px;"><img src="resource/icons/16/redo.png" alt="Redo" /></button>');
		this.html.append(this.redoButton);
		this.redoButton.button().on('click', $.proxy(function(){
		    this.view.getCommandStack().redo();
		}, this));
		this.redoButton.prop("disabled", true);*/
		
		// Inject the DELETE Button
		//
		// TODO DELETION DOESN'T WORK PROPERLY FOR MANY FIGURES
		/*this.deleteButton  = $('<button id="deleteButton" style="z-index:0;position:absolute;cursor:default;left:210px;top:11px;width:29px;height:29px;"><img src="resource/icons/16/delete.png" alt="Delete" /></button>');
		this.html.append(this.deleteButton);
		this.deleteButton.button().click($.proxy(function(){
			var node = this.view.getSelection();
			for(var i = node.all.size-1; i >= 0; i--){
				var command= new draw2d.command.CommandDelete(node.all.data[i]);
				this.view.getCommandStack().execute(command);
			}
		},this)).button( "option", "disabled", true );*/

		//this.html.append('<button id="toggleButton" style="z-index:0;position:absolute;cursor:default;left:10px;top:11px;width:100px;height:29px;">Physical view</button>');
		this.html.append('<button id="topoDisco" style="z-index:0;position:absolute;cursor:default;left:10px;top:11px;width:300px;height:29px;background: no-repeat url(\'resource/topo.png\')">Topplogy Discovery</button>');
		this.html.append('<button id="refreshDisco" title="I LIKE" type="button" style="width:150px;height:29px;position:absolute;top:11px;right:10px;background: no-repeat url(\'resource/refresh1.png\');">Reload</button>');
		this.html.append('<button id="cleanButton" title="I LIKE" type="button" style="width:150px;height:29px;position:absolute;top:11px;right:170px;background: no-repeat url(\'resource/clean.png\');">Clean</button>'); 
                //this._scrollComposite.add(new qx.ui.mobile.embed.Html(this._getScrollerHtml()));
                //this.html.enableScrolling();
		var cleanButton = $('#cleanButton');
		var topoDisco = $('#topoDisco');
		var refreshDisco = $('#refreshDisco');
		//var toggleButton = $('#toggleButton');
		//var undoButton = $('#undoButton');
		//var redoButton = $('#redoButton');
		//var deleteButton = $('#deleteButton');

		refreshDisco.hide();
		//toggleButton.hide();
		//deleteButton.hide();
		//redoButton.hide();
		//undoButton.hide();
		cleanButton.prop("disabled", true);
		
		topoDisco.on('click', function(){
			// do topology discovery and insert in jsonTopo, then add draw it on canvas
			// ajax graph/physical, store in _self.physical, draw

/*_self.physical = {"physicalGraph":[
{"id":"ID1","type":"Host", "connections":[{"id": "ID2", "type": "SWITCH"}, {"id": "ID6", "type": "OVS"}]},
{"id":"ID3","type":"Host", "connections":[{"id": "ID2", "type": "SWITCH"}]},
{"id":"ID4","type":"Host", "connections":[{"id": "ID2", "type": "SWITCH"}]},
{"id":"ID5","type":"Host", "connections":[{"id": "ID2", "type": "SWITCH"}]}, 
{"id":"ID2","type":"SWITCH", "connections" : [{"id": "ID1", "type": "Host"}, {"id": "ID3", "type": "Host"}, {"id": "ID4", "type": "Host"}, {"id": "ID5", "type": "Host"}]},
{"id":"ID6","type":"OVS", "connections":[{"id": "ID1", "type": "HOST"}]}
]//finphysical graph
};//fin topo*/




_self.physical = {"physicalGraph":[
{"id":"ID1","type":"Host", "connections":[{"id": "ID2", "type": "SWITCH"}, {"id": "ID6", "type": "OVS"}, {"id": "ID7", "type": "OVS1"}, {"id": "ID8", "type": "OVS2"}, {"id": "ID9", "type": "OVS3"}, {"id": "ID10", "type": "OVS4"}, {"id": "ID11", "type": "OVS5"}, {"id": "ID12", "type": "OVS6"}, {"id": "ID13", "type": "OVS7"}]},

{"id":"ID3","type":"Host1", "connections":[{"id": "ID2", "type": "SWITCH"}, {"id": "ID14", "type": "OVS8"}]},
{"id":"ID4","type":"Host2", "connections":[{"id": "ID2", "type": "SWITCH"}, {"id": "ID15", "type": "OVS9"}]},
{"id":"ID5","type":"Host3", "connections":[{"id": "ID2", "type": "SWITCH"}, {"id": "ID16", "type": "OVS10"}]}, 


{"id":"ID2","type":"SWITCH", "connections" : [{"id": "ID1", "type": "Host"}, {"id": "ID3", "type": "Host1"}, {"id": "ID4", "type": "Host2"}, {"id": "ID5", "type": "Host3"}]}, 


{"id":"ID6","type":"OVS", "connections":[{"id": "ID1", "type": "Host"}]}, 
{"id":"ID7","type":"OVS1", "connections":[{"id": "ID1", "type": "Host"}]},





{"id":"ID14","type":"OVS8", "connections":[{"id": "ID3", "type": "Host1"}, {"id": "ID17", "type": "OvsSlice1"}]}, 
{"id":"ID15","type":"OVS9", "connections":[{"id": "ID4", "type": "Host2"}, {"id": "ID18", "type": "OvsSlice4"}, {"id": "ID19", "type": "OvsSlice5"}]}, 
{"id":"ID16","type":"OVS10", "connections":[{"id": "ID5", "type": "Host3"}, {"id": "ID20", "type": "OvsSlice2"}, {"id": "ID21", "type": "OvsSlice3"}]}, 


{"id":"ID8","type":"OVS2", "connections":[{"id": "ID1", "type": "Host"}]},
{"id":"ID9","type":"OVS3", "connections":[{"id": "ID1", "type": "Host"}]},
{"id":"ID10","type":"OVS4", "connections":[{"id": "ID1", "type": "Host"}]},
{"id":"ID11","type":"OVS5", "connections":[{"id": "ID1", "type": "Host"}]},
{"id":"ID12","type":"OVS6", "connections":[{"id": "ID1", "type": "Host"}]},
{"id":"ID13","type":"OVS7", "connections":[{"id": "ID1", "type": "Host"}]},

 

{"id":"ID17","type":"OvsSlice1", "connections":[{"id": "ID14", "type": "OVS8"}]}, 
{"id":"ID18","type":"OvsSlice4", "connections":[{"id": "ID15", "type": "OVS9"}]}, 
{"id":"ID19","type":"OvsSlice5", "connections":[{"id": "ID15", "type": "OVS9"}]},
{"id":"ID20","type":"OvsSlice2", "connections":[{"id": "ID16", "type": "OVS10"}]},
{"id":"ID21","type":"OvsSlice3", "connections":[{"id": "ID16", "type": "OVS10"}]}]//finphysical graph
};//fin topo



			// $.getJSON('http://192.168.1.103/controller/graph/physical', function(data) {				console.log(data);
			// 	_self.physical = data;
			// }).done(function(){

				_self.draw(_self.physical, _self.view);	

				//toggleButton.show();
				refreshDisco.show();
				//deleteButton.show();
				//redoButton.show();
				//undoButton.show();			
				//topoDisco.prop("disabled", true);
				cleanButton.prop("disabled", false);
			// });
			//  _self.physical = _self.getPhysical();
			
		});
		refreshDisco.on('click', function(){
			if(confirm('Are you sure you want to clean ? there is no undo possible with this operation')){
				_self.view.clear();
				_self.physicalTempCanvas = "";
				_self.virtualTempCanvas = "";
				_self.portCounter = 0;

				//AJAX

				_self.physical = {"physicalGraph":[
{"id":"ID1","type":"Host", "connections":[{"id": "ID2", "type": "SWITCH"}, {"id": "ID6", "type": "OVS"}, {"id": "ID7", "type": "OVS1"}, {"id": "ID8", "type": "OVS2"}, {"id": "ID9", "type": "OVS3"}, {"id": "ID10", "type": "OVS4"}, {"id": "ID11", "type": "OVS5"}, {"id": "ID12", "type": "OVS6"}, {"id": "ID13", "type": "OVS7"}]},



{"id":"ID3","type":"Host1", "connections":[{"id": "ID2", "type": "SWITCH"}, {"id": "ID14", "type": "OVS8"}]},
{"id":"ID4","type":"Host2", "connections":[{"id": "ID2", "type": "SWITCH"}, {"id": "ID15", "type": "OVS9"}]},
{"id":"ID5","type":"Host3", "connections":[{"id": "ID2", "type": "SWITCH"}, {"id": "ID16", "type": "OVS10"}]}, 


{"id":"ID2","type":"SWITCH", "connections" : [{"id": "ID1", "type": "Host"}, {"id": "ID3", "type": "Host1"}, {"id": "ID4", "type": "Host2"}, {"id": "ID5", "type": "Host3"}]}, 


{"id":"ID6","type":"OVS", "connections":[{"id": "ID1", "type": "Host"}]}, 
{"id":"ID7","type":"OVS1", "connections":[{"id": "ID1", "type": "Host"}]},





{"id":"ID14","type":"OVS8", "connections":[{"id": "ID3", "type": "Host1"}, {"id": "ID17", "type": "OvsSlice1"}]}, 
{"id":"ID15","type":"OVS9", "connections":[{"id": "ID4", "type": "Host2"}, {"id": "ID18", "type": "OvsSlice4"}, {"id": "ID19", "type": "OvsSlice5"}]}, 
{"id":"ID16","type":"OVS10", "connections":[{"id": "ID5", "type": "Host3"}, {"id": "ID20", "type": "OvsSlice2"}, {"id": "ID21", "type": "OvsSlice3"}]}, 

 

{"id":"ID17","type":"OvsSlice1", "connections":[{"id": "ID14", "type": "OVS8"}]}, 
{"id":"ID18","type":"OvsSlice4", "connections":[{"id": "ID15", "type": "OVS9"}]}, 
{"id":"ID19","type":"OvsSlice5", "connections":[{"id": "ID15", "type": "OVS9"}]},
{"id":"ID20","type":"OvsSlice2", "connections":[{"id": "ID16", "type": "OVS10"}]},
{"id":"ID21","type":"OvsSlice3", "connections":[{"id": "ID16", "type": "OVS10"}]},

{"id":"ID8","type":"OVS2", "connections":[{"id": "ID1", "type": "Host"}]},
{"id":"ID9","type":"OVS3", "connections":[{"id": "ID1", "type": "Host"}]},
{"id":"ID10","type":"OVS4", "connections":[{"id": "ID1", "type": "Host"}]},
{"id":"ID11","type":"OVS5", "connections":[{"id": "ID1", "type": "Host"}]},
{"id":"ID12","type":"OVS6", "connections":[{"id": "ID1", "type": "Host"}]},
{"id":"ID13","type":"OVS7", "connections":[{"id": "ID1", "type": "Host"}]}]//finphysical graph
};//fin topo


				toggleButton.text("Physical view");
			}
		});
		cleanButton.on('click', function(){
			if(confirm('Are you sure you want to clean ? there is no undo possible with this operation')){
				_self.view.clear();
				refreshDisco.hide();
				toggleButton.hide();
				deleteButton.hide();
				redoButton.hide();
				undoButton.hide();
				_self.physicalTempCanvas = "";
				_self.virtualTempCanvas = "";
				_self.portCounter = 0;
				cleanButton.prop("disabled", true);
				topoDisco.prop("disabled", false);
			}
		});
		// TODO remember view before click !
		/*toggleButton.on('click', function(){
			if(toggleButton.text() == "Physical view"){
  				_self.r = $.Deferred();
				_self.physicalTempCanvas = $.parseJSON(physicalToJson());
				console.log("physical");
				console.log(_self.physicalTempCanvas);
				_self.view.clear();
				if(_self.virtualTempCanvas == ""){

				}else if(_self.virtualTempCanvas.figures.length == 0){

				}else{
					physicalJsonToCanvas(_self.virtualTempCanvas);
				}
				toggleButton.text("Virtual view");
			}else if(toggleButton.text() == "Virtual view"){
  				_self.r = $.Deferred();
				_self.virtualTempCanvas = $.parseJSON(physicalToJson());
				console.log("Virtual");
				console.log(_self.virtualTempCanvas);
				_self.view.clear();
				if(_self.physicalTempCanvas.figures.length == 0){

				}else{
					physicalJsonToCanvas(_self.physicalTempCanvas);
					toggleButton.text("Physical view");
				}
			}
		});*/
	},

	/**
	 * @method
	 * Called if the selection in the canvas has been changed. You must register this
	 * class on the canvas to receive this event.
	 * 
	 * @param {draw2d.Figure} figure
	 */
	onSelectionChanged : function(figure){
		//this.deleteButton.button( "option", "disabled", figure===null );
	},
	
	/**
	 * @method
	 * Sent when an event occurs on the command stack. draw2d.command.CommandStackEvent.getDetail() 
	 * can be used to identify the type of event which has occurred.
	 * 
	 * @template
	 * 
	 * @param {draw2d.command.CommandStackEvent} event
	 **/
	stackChanged:function(event){
		//this.undoButton.button( "option", "disabled", !event.getStack().canUndo() );
		//this.redoButton.button( "option", "disabled", !event.getStack().canRedo() );
	},
	getPhysical: function(){
		// ajax graph/physical
	},
	getVirtual: function(){
		// ajax graph/virtual
	},
	draw:function(jsonArray, canvas){
		// construct nodes
		// if(jsonArray.physical != null){
			this.drawPhysical(jsonArray, canvas);
		// }else if(jsonArray.virtual != null){
		// 	this.drawVirtual(jsonArray, canvas);
		// }else{
		// 	alert("Invalid graph");
		// }
	},
	drawPhysical: function(jsonArray, canvas){
		// {"physical":[{"id":"ID1","type":"OF_SWITCH", "connections":[{"id": "ID2", "type": "OF_SWITCH"}]}, {"id":"ID2","type":"OF_SWITCH", "connections" : [{"id": "ID1", "type": "OF_SWITCH"}]}]}
		for(var j = 0; j < jsonArray.physicalGraph.length; j++){
			// verify type
			var element = canvas.getFigure(jsonArray.physicalGraph[j].id);
			if(canvas.getFigure(jsonArray.physicalGraph[j].id) == null){
			switch(jsonArray.physicalGraph[j].type){
					case "SWITCH":
					element = new Switch("resource/Switch.png", 50, 58);
					break;
					case "Host":
					element = new Host("resource/Host.png", 40, 46);
					break;
case "Host1":
element = new Host1("resource/Host.png", 40, 46);
break;
case "Host2":
element = new Host2("resource/Host.png", 40, 46);
break;
case "Host3":
element = new Host3("resource/Host.png", 40, 46);
break;
                                        case "OVS":
					element = new OVS("resource/ovs.png", 34, 30);
					break;
case "OVS1":
element = new OVS1("resource/ovs.png", 34, 30);
break;
case "OVS2":
element = new OVS2("resource/ovs.png", 34, 30);
break;
case "OVS3":
element = new OVS3("resource/ovs.png", 34, 30);
break;
case "OVS4":
element = new OVS4("resource/ovs.png", 34, 30);
break;
case "OVS5":
element = new OVS5("resource/ovs.png", 34, 30);
break;
case "OVS6":
element = new OVS6("resource/ovs.png", 34, 30);
break;
case "OVS7":
element = new OVS7("resource/ovs.png", 34, 30);
break;
case "OVS8":
element = new OVS8("resource/ovs.png", 34, 30);
break;
case "OVS9":
element = new OVS9("resource/ovs.png", 34, 30);
break;
case "OVS10":
element = new OVS10("resource/ovs.png", 34, 30);
break;
                                        case "OvsSlice":
					element = new OvsSlice("resource/slice.png", 25, 22);
					break;
case "OvsSlice1":
element = new OvsSlice1("resource/slice.png", 25, 22);
break;
case "OvsSlice2":
element = new OvsSlice2("resource/slice.png", 25, 22);
break;
case "OvsSlice3":
element = new OvsSlice3("resource/slice.png", 25, 22);
break;
case "OvsSlice4":
element = new OvsSlice4("resource/slice.png", 25, 22);
break;
case "OvsSlice5":
element = new OvsSlice5("resource/slice.png", 25, 22);
break;
case "OvsSlice6":
element = new OvsSlice6("resource/slice.png", 25, 22);
break;
case "OvsSlice7":
element = new OvsSlice7("resource/slice.png", 25, 22);
break;
case "OvsSlice8":
element = new OvsSlice8("resource/slice.png", 25, 22);
break;
					default:
						alert("error");
				}
		        element.setId(jsonArray.physicalGraph[j].id);
		        this.physicalSource.push(jsonArray.physicalGraph[j].id);
		        var locator = new draw2d.layout.locator.Locator(element);
		        var port = new draw2d.HybridPort("port"+this.portCounter);
		        this.portCounter++;
		        // algo to place elements and ports
		        element.addPort(port, locator, 0, 0);
		  		canvas.addFigure(element, 50+j*105, 50+j*25);
		  	}


			// construct edges
			for(var k = 0; k < jsonArray.physicalGraph[j].connections.length; k++){
				var sourceFigure = element;
				var targetFigure = canvas.getFigure(jsonArray.physicalGraph[j].connections[k].id);

				if(targetFigure == null){
					// draw tar getFigure
					switch(jsonArray.physicalGraph[j].connections[k].type){
						case "SWITCH":
						targetFigure = new Switch("resource/Switch.png", 50, 58);
						break;
						case "Host":
						targetFigure = new Host("resource/Host.png", 40, 46);
						break;
case "Host1":
targetFigure = new Host1("resource/Host.png", 40, 46);
break;
case "Host2":
targetFigure = new Host2("resource/Host.png", 40, 46);
break;
case "Host3":
targetFigure = new Host3("resource/Host.png", 40, 46);
break;
                                                case "OVS":
						targetFigure = new OVS("resource/ovs.png", 34, 30);
						break;
case "OVS1":
targetFigure = new OVS1("resource/ovs.png", 34, 30);
break;
case "OVS2":
targetFigure = new OVS2("resource/ovs.png", 34, 30);
break;
case "OVS3":
targetFigure = new OVS3("resource/ovs.png", 34, 30);
break;
case "OVS4":
targetFigure = new OVS4("resource/ovs.png", 34, 30);
break;
case "OVS5":
targetFigure = new OVS5("resource/ovs.png", 34, 30);
break;
case "OVS6":
targetFigure = new OVS6("resource/ovs.png", 34, 30);
break;
case "OVS7":
targetFigure = new OVS7("resource/ovs.png", 34, 30);
break;
case "OVS8":
targetFigure = new OVS8("resource/ovs.png", 34, 30);
break;
case "OVS9":
targetFigure = new OVS9("resource/ovs.png", 34, 30);
break;
case "OVS10":
targetFigure = new OVS10("resource/ovs.png", 34, 30);
break;
                                                case "OvsSlice":
						targetFigure = new OvsSlice("resource/slice.png", 25, 22);
						break;
case "OvsSlice1":
targetFigure = new OvsSlice1("resource/slice.png", 25, 22);
break;
case "OvsSlice2":
targetFigure = new OvsSlice2("resource/slice.png", 25, 22);
break;
case "OvsSlice3":
targetFigure = new OvsSlice3("resource/slice.png", 25, 22);
break;
case "OvsSlice4":
targetFigure = new OvsSlice4("resource/slice.png", 25, 22);
break;
case "OvsSlice5":
targetFigure = new OvsSlice5("resource/slice.png", 25, 22);
break;
case "OvsSlice6":
targetFigure = new OvsSlice6("resource/slice.png", 25, 22);
break;
case "OvsSlice7":
targetFigure = new OvsSlice7("resource/slice.png", 25, 22);
break;
case "OvsSlice8":
targetFigure = new OvsSlice8("resource/slice.png", 25, 22);
break;
					default:
							alert("Wrong type");
					}
				targetFigure.setId(jsonArray.physicalGraph[j].connections[k].id);
			        var locator = new draw2d.layout.locator.Locator(targetFigure);
			        var port = new draw2d.HybridPort("port"+this.portCounter);
			        this.portCounter++;
			        // algo to place elements and ports
			        targetFigure.addPort(port, locator, 0, 0);
			  		canvas.addFigure(targetFigure, 150+k*75, 150-k*75);
				}
		        this.physicalTarget.push(jsonArray.physicalGraph[j].connections[k].id);

				var conn = new MyConnection();
				conn.setRouter(new draw2d.layout.connection.CircuitConnectionRouter());
				conn.setSource(sourceFigure.getHybridPort(0));
				conn.setTarget(targetFigure.getHybridPort(0));
				canvas.addFigure(conn);
			}// get id, draw it, get connections, if figure exists, connect it, if not, draw it then connect it
		}
	}
});








