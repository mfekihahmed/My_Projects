Label = draw2d.shape.basic.Label.extend({

    NAME : "Label",

    init : function(canvas, text)
    {
        this._super(text);
        this.view  = canvas;
    },
    onClick: function(){
        // toggle from virtual view to physical view 
        // ajax calls to get drawings
        // load(jsonDocument) to get it drawn
        if(this.getText() == "Virtual"){
        	this.setText("Physical");
            $.getJSON('http://localhost:8080/graph/physical', function(data) {
                console.log(data);
            });
		}else{
			this.setText("Virtual");
		}    
    }
});
