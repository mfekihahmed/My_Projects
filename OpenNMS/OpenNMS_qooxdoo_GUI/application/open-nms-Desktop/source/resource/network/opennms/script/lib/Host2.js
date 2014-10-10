
Host2 = draw2d.shape.basic.Image.extend({

    NAME : "Host2",
    
    init : function(path,  width, height)
    {
        this._super(path, width, height);
        this.listVm = Array();
        this.setResizeable(false);
        this.width = width;
        this.height = height;
        this.rightStats = $('#rightStats');
        this.rightContainer = $('#rightStatsContentContainer');
        this.bareMetal = $('#bareMetalEle');
    },
    onMouseEnter: function(){
        this.bareMetal.empty();
        this.bareMetal.css({
            "top": this.getY(),
            "left": this.getX()+50
        });
        if(this.listVm.length < 1){
            this.bareMetal.append('<div><b>EBS3</b></div>');
           // this.bareMetal.append('<div><b> '+this.listVm.length+' Server Node</b></div>');
        }else{
            for(var i = 0; i < this.listVm.length; i++){
                this.bareMetal.append('<div> '+(i+1)+'. '+this.listVm[i]+'</div>');
            }
        }
        this.bareMetal.show();
    },
    onMouseLeave: function(){  
        this.bareMetal.hide();
    },

    onClick: function(){            
        //add stuff to rightStatsContentContainer
        this.rightContainer.empty();
        var leString = "";
        leString += "<table>" +
                                            "<thead>" +
                                                "<tr>" +
                                                    "<th>Ericsson Server</th>" +
                                                "</tr>" +

                                             "</thead>"+
"<tbody>" +
"<tr>" +
"<td>Name</td>" +
"<td>EBS3</td>" +
"<tr>" +
"<tr>" +
"<td>Description</td>" +
"<td>Ericsson Blade System</td>" +
"<tr>" +
"<tr>" +
"<td>IP address</td>" +
"<td>172.16.0.64/16</td>" +
"<tr>" +
"<tr>" +
"<td>Type</td>" +
"<td>Server</td>" +
"<tr>" ;
        if(this.listVm.length > 0){
            leString += "<tbody>";
            for(var i = 0; i < this.listVm.length; i++){
               leString += "<tr>"+
                                                "<td>"+(i+1)+". "+this.listVm[i]+"</td>" +
                                          "</tr>"; 
            }
        }
        leString +="</tbody></table>";
        this.rightContainer.append(leString);
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
