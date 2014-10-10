
OVS6 = draw2d.shape.basic.Image.extend({

    NAME : "OVS6",
    
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
            this.bareMetal.append('<div><b>OVS 7</b></div>');
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
        var color = "";
        function portEnterCallback(domElement){
            var _port = domElement;
            return function(){
                color = _port.css("backgroundColor");
                console.log(color);
                _port.css("backgroundColor", "rgb(150, 150, 150)");
                $('#portSpan').css("backgroundColor", "rgb(255,255,255)");
            }
        }
        function portLeaveCallback(domElement){
            var _port = domElement;
            return function(){
                _port.css("backgroundColor", color);
            }
        }
        function portCallback(i, port, domElement){
            var _self = domElement;
            var lePort = port;
            return function(){
                var htmladvertised  = ""; // features
                var htmlconfig      = "";
                var htmlcurr        = "";
                var htmlpeer        = "";
                var htmlstate       = "";
                var htmlsupported   = "";

                for(var i = 0; i < lePort.advertised.length; i++){
                    if(i == 0){
                        htmladvertised = '<tr>' +
                                        '<td rowspan="'+lePort.advertised.length+'">Advertised Features</td>' +
                                        '<td>'+lePort.advertised[i]+'</td>' +
                                    '</tr>';
                    }else{
                        htmladvertised +=  '<tr>' +
                                        '<td>'+lePort.advertised[i]+'</td>' +
                                    '</tr>'
                    }
                }
                for(var i = 0; i < lePort.config.length; i++){
                    if(i == 0){
                        htmlconfig = '<tr>' +
                                        '<td rowspan="'+lePort.config.length+'">Configuration</td>' +
                                        '<td>'+lePort.config[i]+'</td>' +
                                    '</tr>';
                    }else{
                        htmlconfig +=  '<tr>' +
                                        '<td>'+lePort.config[i]+'</td>' +
                                    '</tr>'
                    }
                }
                for(var i = 0; i < lePort.curr.length; i++){
                    if(i == 0){
                        hmtlcurr = '<tr>' +
                                        '<td rowspan="'+lePort.curr.length+'">Current Features</td>' +
                                        '<td>'+lePort.curr[i]+'</td>' +
                                    '</tr>';
                    }else{
                        hmtlcurr +=  '<tr>' +
                                        '<td>'+lePort.curr[i]+'</td>' +
                                    '</tr>'
                    }
                }
                for(var i = 0; i < lePort.peer.length; i++){
                    if(i == 0){
                        hmtlpeer = '<tr>' +
                                        '<td rowspan="'+lePort.peer.length+'">Peer</td>' +
                                        '<td>'+lePort.peer[i]+'</td>' +
                                    '</tr>';
                    }else{
                        hmtlpeer +=  '<tr>' +
                                        '<td>'+lePort.peer[i]+'</td>' +
                                    '</tr>'
                    }
                }
                for(var i = 0; i < lePort.state.length; i++){
                    if(i == 0){
                        hmtlstate = '<tr>' +
                                        '<td rowspan="'+lePort.state.length+'">State</td>' +
                                        '<td>'+lePort.state[i]+'</td>' +
                                    '</tr>';
                    }else{
                        hmtlstate +=  '<tr>' +
                                        '<td>'+lePort.state[i]+'</td>' +
                                    '</tr>'
                    }
                }
                for(var i = 0; i < lePort.supported .length; i++){
                    if(i == 0){
                        htmlsupported = '<tr>' +
                                        '<td rowspan="'+lePort.supported .length+'">Supported Features</td>' +
                                        '<td>'+lePort.supported [i]+'</td>' +
                                    '</tr>';
                    }else{
                        htmlsupported +=  '<tr>' +
                                        '<td>'+lePort.supported [i]+'</td>' +
                                    '</tr>'
                    }
                }

                _self.rightContainer.empty();
                _self.rightContainer.html('<table>' + 
                                                '<thead>' + 
                                                    '<tr>' +
                                                        '<th>Key</th>'+
                                                        '<th>Value</th>'+
                                                    '</tr>' +
                                                '</thead>' +
                                                '<tbody>' +
                                                    '<tr>' +
                                                        '<td>Port Number</td>' +
                                                        '<td>' + lePort.portNo + '</td>' +
                                                    '</tr>' +
                                                    '<tr>' +
                                                        '<td>Hardware Address</td>' +
                                                        '<td>' + lePort.hwAddr + '</td>' +
                                                    '</tr>' +
                                                    '<tr>' +
                                                        '<td>Name</td>' +
                                                        '<td>' + lePort.name + '</td>' +
                                                    '</tr>' +
                                                    '<tr>' +
                                                        '<td>Current Speed</td>' +
                                                        '<td>' + lePort.currSpeed + '</td>' +
                                                    '</tr>' +
                                                    '<tr>' +
                                                        '<td>Max Speed</td>' +
                                                        '<td>' + lePort.maxSpeed + '</td>' +
                                                    '</tr>' +
                                                '</tbody>' +
                                                    htmladvertised +
                                                    htmlconfig +
                                                    htmlcurr +
                                                    htmlpeer +
                                                    htmlstate +
                                                    htmlsupported +
                                            '</table>');
                    
                _self.rightContainer.append('<button id="backButton""><-</button>');
                $('#backButton').on('click', function(){
                    return _self.onClick();
                });
            }
        }          
        //add stuff to rightStatsContentContainer
        this.rightContainer.empty();
        var id = "";
        var resourceType = "";
        var manuDesc = "";
        var hwDesc = "";
        var swDesc = "";
        var serialNb = "";
        var humanDesc = "";
        var datapathId = "";
        var maxFlowperTable = "";
        var nbTables = "";
        var htmlCapa = "";
        var htmlPorts = "";
        var htmlConnectedTo = "";

        // $.getJSON('ajax/test.json', function(data) {

            var data = {"resourceType": "Open vSwitch","manufacturerDescription": "Ericsson, PqDp","hardwareDescription": "Open vSwitch","softwareDescription": "1.3","serialNumber": "","humanDescription": "OPENSWITCH","dataPathId": "000000000079","maxFlowperTable": 1024,"nbTables": 256,"capabilities": ["OFPC_FLOW_STATS", "OFPC_TABLE_STATS", "OFPC_PORT_STATS"],"ports": [
{"portNo": "PORT_2","hwAddr": "08:9e:01:93:5e:26","name": "ge-1/1/2","config": [],"state": [],"curr": ["OFPPF_1GB_FD", "OFPPF_COPPER", "OFPPF_AUTONEG"],"advertised": ["OFPPF_10MB_HD", "OFPPF_10MB_FD", "OFPPF_100MB_HD", "OFPPF_100MB_FD", "OFPPF_1GB_FD", "OFPPF_COPPER", "OFPPF_AUTONEG"],"supported": ["OFPPF_10MB_HD", "OFPPF_10MB_FD", "OFPPF_100MB_HD", "OFPPF_100MB_FD", "OFPPF_1GB_FD", "OFPPF_COPPER", "OFPPF_AUTONEG"],"peer": ["OFPPF_10MB_HD", "OFPPF_10MB_FD", "OFPPF_100MB_HD", "OFPPF_100MB_FD", "OFPPF_1GB_HD", "OFPPF_1GB_FD", "OFPPF_COPPER"],"currSpeed": 1000000,"maxSpeed": 1000000},
 
{"portNo": "PORT_4","hwAddr": "08:9e:01:93:5e:26","name": "ge-1/1/3","config": [],"state": [],"curr": ["OFPPF_1GB_FD", "OFPPF_COPPER", "OFPPF_AUTONEG"],"advertised": ["OFPPF_10MB_HD", "OFPPF_10MB_FD", "OFPPF_100MB_HD", "OFPPF_100MB_FD", "OFPPF_1GB_FD", "OFPPF_COPPER", "OFPPF_AUTONEG"],"supported": ["OFPPF_10MB_HD", "OFPPF_10MB_FD", "OFPPF_100MB_HD", "OFPPF_100MB_FD", "OFPPF_1GB_FD", "OFPPF_COPPER", "OFPPF_AUTONEG"],"peer": ["OFPPF_10MB_HD", "OFPPF_10MB_FD", "OFPPF_100MB_HD", "OFPPF_100MB_FD", "OFPPF_1GB_FD", "OFPPF_COPPER"],"currSpeed": 1000000,"maxSpeed": 1000000}, 

{"portNo": "PORT_3","hwAddr": "08:9e:01:93:5e:26","name": "ge-1/1/3","config": [],"state": [],"curr": ["OFPPF_1GB_FD", "OFPPF_COPPER", "OFPPF_AUTONEG"],"advertised": ["OFPPF_10MB_HD", "OFPPF_10MB_FD", "OFPPF_100MB_HD", "OFPPF_100MB_FD", "OFPPF_1GB_FD", "OFPPF_COPPER", "OFPPF_AUTONEG"],"supported": ["OFPPF_10MB_HD", "OFPPF_10MB_FD", "OFPPF_100MB_HD", "OFPPF_100MB_FD", "OFPPF_1GB_FD", "OFPPF_COPPER", "OFPPF_AUTONEG"],"peer": ["OFPPF_10MB_HD", "OFPPF_10MB_FD", "OFPPF_100MB_HD", "OFPPF_100MB_FD", "OFPPF_1GB_FD", "OFPPF_COPPER"],"currSpeed": 1000000,"maxSpeed": 1000000}, 

{"portNo": "PORT_1","hwAddr": "08:9e:01:93:5e:26","name": "ge-1/1/1","config": [],"state": [],"curr": ["OFPPF_1GB_FD", "OFPPF_COPPER", "OFPPF_AUTONEG"],"advertised": ["OFPPF_10MB_HD", "OFPPF_10MB_FD", "OFPPF_100MB_HD", "OFPPF_100MB_FD", "OFPPF_1GB_FD", "OFPPF_COPPER", "OFPPF_AUTONEG"],"supported": ["OFPPF_10MB_HD", "OFPPF_10MB_FD", "OFPPF_100MB_HD", "OFPPF_100MB_FD", "OFPPF_1GB_FD", "OFPPF_COPPER", "OFPPF_AUTONEG"],"peer": ["OFPPF_10MB_HD", "OFPPF_10MB_FD", "OFPPF_100MB_HD", "OFPPF_100MB_FD", "OFPPF_1GB_HD", "OFPPF_1GB_FD", "OFPPF_COPPER"],"currSpeed": 1000000,"maxSpeed": 1000000}, 

{"portNo": "OFPP_LOCAL","hwAddr": "08:9e:01:93:5e:26","name": "br0","config": [],"state": [],"curr": ["OFPPF_10MB_FD", "OFPPF_COPPER"],"advertised": [],"supported": ["OFPPF_10MB_FD", "OFPPF_COPPER"],"peer": [],"currSpeed": 10000,"maxSpeed": 10000}],"connectedTo": []};

            //id                  = data.id;
            resourceType        = data.resourceType;
            manuDesc            = data.manufacturerDescription;
            hwDesc              = data.hardwareDescription;
            swDesc              = data.softwareDescription;
            serialNb            = data.serialNumber;
            humanDesc           = data.humanDescription;
            datapathId          = data.dataPathId;
            maxFlowperTable  = data.maxFlowperTable;
            nbTables            = data.nbTables;

            for(var i = 0; i < data.capabilities.length; i++){
                if(i == 0){
                    htmlCapa = '<tr>' +
                                    '<td rowspan="'+data.capabilities.length+'">Capabilities</td>' +
                                    '<td>'+data.capabilities[i]+'</td>' +
                                '</tr>';
                }else{
                    htmlCapa +=  '<tr>' +
                                    '<td>'+data.capabilities[i]+'</td>' +
                                '</tr>'
                }
            }
            for(var i = 0; i < data.ports.length; i++){
                if(i == 0){
                    htmlPorts = '<tr>' +
                                    '<td id="portSpan" rowspan="'+data.ports.length+'">Ports</td>' +
                                    '<td id=port'+i+'>'+data.ports[i].portNo+'</td>' +
                                '</tr>';
                }else{
                    htmlPorts +=  '<tr>' +
                                    '<td id=port'+i+'>'+data.ports[i].portNo+'</td>' +
                                '</tr>'
                }
            }
            for(var i = 0; i < data.connectedTo.length; i++){
                if(i == 0){
                    htmlConnectedTo = '<tr>' +
                                    '<td rowspan="'+data.connectedTo.length+'">Connected to</td>' +
                                    '<td>'+data.connectedTo[i]+'</td>' +
                                '</tr>';
                }else{
                    htmlConnectedTo +=  '<tr>' +
                                    '<td>'+data.connectedTo[i]+'</td>' +
                                '</tr>'
                }
            }

        // });
        this.rightContainer.html('<table>' +
                                        '<thead>' +
                                            '<tr>' +
                                                '<th>Key</th>' +
                                                '<th>Value</th>' +
                                            '</tr>' +
                                        '</thead>' +
                                        '<tbody>' +
                                            '<tr>' +
                                                '<td>Id</td>' +
                                                '<td>'+data.dataPathId+'</td>' +
                                            '</tr>' +
                                            '<tr>' +
                                                '<td>Type</td>' +
                                                '<td>'+resourceType+'</td>' +
                                            '</tr>' +
                                            '<tr>' +
                                                '<td>Manufacturer Description</td>' +
                                                '<td>'+manuDesc+'</td>' +
                                            '</tr>' +
                                            '<tr>' +
                                                '<td>Open Flow version</td>' +
                                                '<td>'+swDesc+'</td>' +
                                            '</tr>' +
                                            '<tr>' +
                                                '<td>maxFlowperTable</td>' +
                                                '<td>'+maxFlowperTable+'</td>' +
                                            '</tr>' +
                                            '<tr>' +
                                                '<td>Number of Tables</td>' +
                                                '<td>'+nbTables+'</td>' +
                                            '</tr>' + 
                                                htmlCapa +
                                                htmlPorts +
                                                htmlConnectedTo +
                                        '</tbody>' +
                                    '</table>');
                            for(var i = 0; i < data.ports.length; i++){
                                var _port = $('#port'+i);
                                _port.on('click', portCallback(i, data.ports[i], this));
                                _port.on(
                                {   
                                    mouseenter: portEnterCallback(_port.parent()),
                                    mouseleave: portLeaveCallback(_port.parent())
                                });
                            }
        this.rightStats.show();
    },

    addVm: function(newVm){
        this.listVm.push(newVm);
    },
    isCoordInEle: function(coord){
        if(coord[0] > this.getX() && coord[0] < (this.getX()+this.width)){
            if(coord[1]> this.getY() && coord[1] < (this.getY()+this.height)){
                return true;
            }
        }
        return false;
    },
    getVms: function(){
        return this.listVm;
    }

});
