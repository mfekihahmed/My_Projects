
Openstack = draw2d.shape.basic.Image.extend({

    NAME : "Openstack",
    
    init : function(path,  width, height)
    {
        this._super(path, width, height);
        this.listVm = Array();
        this.setResizeable(false);
        this.width = width;
        this.height = height;
        this.rightStats = $('#rightStats');
    },

    onClick: function(){            
        //add stuff to rightStatsContentContainer
        this.rightContainer.text(this.listVm.toString());
        this.rightStats.show();
    },
    
    addVm: function(newVm){
        this.listVm.push(newVm);
    },
    isCoordInEle: function(coord){
        if(coord[0] > this.getX() && coord[0] < (this.getX()+this.width)){
            if(coord[1] > this.getY() && coord[1] < (this.getY()+this.height)){
                return true;
            }
        }
        return false;
    },
    getVms: function(){
        return this.listVm;
    }

});
