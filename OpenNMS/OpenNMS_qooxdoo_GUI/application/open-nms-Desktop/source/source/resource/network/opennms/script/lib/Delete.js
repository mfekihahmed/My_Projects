Delete = draw2d.shape.basic.Label.extend({

    NAME : "Delete",
    
    init : function(canvas)
    {
        this._super("Delete");
        this.view = canvas;
        this.setSelectable(false);
    },
    onClick: function(){
        //loop through all selections ?
        if(typeof this.view.getSelection().all.data[0] === 'undefined' || this.view.getSelection().all.data[0] == 'null'){
            // undefined
        }else{
            this.view.removeFigure(this.view.getFigure(this.view.getSelection().all.data[0].id));
        }
        // toggle from virtual view to physical view 
        // ajax calls to get drawings
        // load(jsonDocument) to get it drawn
    }
});
