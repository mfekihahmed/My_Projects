function drawVisualization() {
        // Create a data table with nodes.
        nodesTable = new google.visualization.DataTable();
        nodesTable.addColumn('number', 'id');
        nodesTable.addColumn('string', 'text');   // optional
        nodesTable.addColumn('string', 'image');  // optional
        nodesTable.addColumn('string', 'style');   // optional
		nodesTable.addColumn('number', 'group');
        
        // Create a data table with links.
        linksTable = new google.visualization.DataTable();
        linksTable.addColumn('number', 'from');
        linksTable.addColumn('number', 'to');
        linksTable.addColumn('number', 'length'); // optional
		linksTable.addColumn('number', 'width');
		linksTable.addColumn('string', 'color');
        var length1 = 150;
        var length2 = 150;
        var length3 = 400;
        var length4 = 100;
        var length5 = 100;
        nodesTable.addRow([1, 'Internet', DIR + 'internet.png', 'image', undefined]);
        nodesTable.addRow([2, 'Open NMS Controller', DIR + 'opennms.png', 'image', undefined]);
        nodesTable.addRow([3, 'EBS Hardware Switches', DIR + 'switch.png', 'image', undefined]);
        linksTable.addRow([1, 3, length1, 10, undefined]);
        
        
        nodesTable.addRow([4, 'GEP 1', DIR + 'host.png', 'image', undefined]);
        nodesTable.addRow([5, 'GEP 2', DIR + 'host.png', 'image', undefined]);
        nodesTable.addRow([6, 'GEP 3', DIR + 'host.png', 'image', undefined]);
        nodesTable.addRow([7, 'GEP 4', DIR + 'host.png', 'image', undefined]); 
        linksTable.addRow([3, 4, length2, 7, undefined]);
        linksTable.addRow([3, 5, length2, 7, undefined]);
        linksTable.addRow([3, 6, length2, 7, undefined]);
        linksTable.addRow([3, 7, length2, 7, undefined]);



        nodesTable.addRow([8, 'Open vSwitch 1', DIR + 'ovs.png', 'image', undefined]);
        nodesTable.addRow([9, 'Open vSwitch 2', DIR + 'ovs.png', 'image', undefined]);
        nodesTable.addRow([10, 'Open vSwitch 3', DIR + 'ovs.png', 'image', undefined]);
        linksTable.addRow([5, 8, length2, 5, undefined]);
        linksTable.addRow([6, 9, length2, 5, undefined]);
        linksTable.addRow([7, 10, length2, 5, undefined]);
		
		
        //nodesTable.addRow([11, 'Open NMS vDC 1', DIR + 'slice.png', 'image', undefined]); 
        nodesTable.addRow([11, 'Open NMS vDC 1', undefined, undefined, 1]);
        nodesTable.addRow([12, 'Open NMS vDC 2', undefined, undefined, 2]);
        nodesTable.addRow([13, 'Open NMS vDC 3', undefined, undefined, 3]);
        nodesTable.addRow([14, 'Open NMS vDC 4', undefined, undefined, 4]);
        nodesTable.addRow([15, 'Open NMS vDC 5', undefined, undefined, 5]);
		nodesTable.addRow([16, 'Open NMS Slice 1', DIR + 'slice.png', 'image', undefined]); 
		nodesTable.addRow([17, 'Open NMS Slice 2', DIR + 'slice.png', 'image', undefined]); 
		nodesTable.addRow([18, 'Open NMS Slice 3', DIR + 'slice.png', 'image', undefined]); 
		nodesTable.addRow([19, 'Open NMS Slice 4', DIR + 'slice.png', 'image', undefined]); 
		nodesTable.addRow([20, 'Open NMS Slice 5', DIR + 'slice.png', 'image', undefined]); 
        
         
		linksTable.addRow([11, 16, length5, 3, undefined]);
		linksTable.addRow([12, 17, length5, 3, undefined]);
		linksTable.addRow([13, 18, length5, 3, undefined]);
		linksTable.addRow([14, 19, length5, 3, undefined]);
		linksTable.addRow([15, 20, length5, 3, undefined]);


//nodesTable.addRow([17, 'HSS1', DIR + 'vm.png', 'image', undefined]);
nodesTable.addRow([22, 'CSCF', undefined, undefined, 1]);
nodesTable.addRow([23, 'HSS1', undefined, undefined, 1]);
nodesTable.addRow([24, 'HSS2', undefined, undefined, 2]);
nodesTable.addRow([25, 'HSS3', undefined, undefined, 2]);
nodesTable.addRow([26, 'HSS4', undefined, undefined, 3]);
nodesTable.addRow([27, 'HSS5', undefined, undefined, 4]);
nodesTable.addRow([28, 'HSS6', undefined, undefined, 5]);
linksTable.addRow([16, 22, length5, 3, undefined]);
linksTable.addRow([16, 23, length5, 3, undefined]);

linksTable.addRow([17, 24, length5, 3, undefined]);
linksTable.addRow([17, 25, length5, 3, undefined]);


linksTable.addRow([18, 26, length5, 3, undefined]);
linksTable.addRow([19, 27, length5, 3, undefined]);
linksTable.addRow([20, 28, length5, 3, undefined]);
         
		 
		
        // specify options
        var options = {
          'width': '1500px', 
          'height': '1000px',
          'stabilize': false   // stabilize positions before displaying
        };

        // Instantiate our graph object.
        network = new links.Network(document.getElementById('opennms'));
        // Add event listeners
        google.visualization.events.addListener(network, 'select', onselect);
		
        // Draw our graph with the created data and options 
        network.draw(nodesTable, linksTable, packagesTable, options);
		
		
		//setTimeout(function(){Ajax();},3000);
		
		setTimeout(function() {
		Ajax();
		
		}, 1000);
		
		obj = JSON.parse(txt);

        //document.getElementById("statut").innerHTML=obj.opennms[0].statut
		console.log("Startup statut: " + obj.opennms[0].statut);
		
		
		//packagesTable.addRow([2, 8, undefined, 10, 'Open NMS Flow Controller', DIR + 'msg.png', 'image']);
		//packagesTable.addRow([2, 9, undefined, 10, 'Open NMS Flow Controller', DIR + 'msg.png', 'image']);
		//packagesTable.addRow([2, 10, undefined, 10, 'Open NMS Flow Controller', DIR + 'msg.png', 'image']);
        //network.addPackages(packagesTable);
		var i = 0;
		setInterval(function() {
		if (obj.opennms[0].statut == "on")
		{  
		  linksTable.addRow([8, 2, length3, 4, 'gold']);
          linksTable.addRow([9, 2, length3, 4, 'gold']);
          linksTable.addRow([10, 2, length3, 4, 'gold']);
		  linksTable.addRow([8, 11, length4, 3, undefined]);
        linksTable.addRow([10, 12, length4, 3, undefined]);
        linksTable.addRow([10, 13, length4, 3, undefined]);
        linksTable.addRow([9, 14, length4, 3, undefined]);
        linksTable.addRow([9, 15, length4, 3, undefined]);
		  network.addLinks(linksTable);
		  
		  
		  if (i<15) {
		  packagesTable1 = new google.visualization.DataTable();
          packagesTable1.addColumn('number', 'from');
          packagesTable1.addColumn('number', 'to');
          packagesTable1.addColumn('number', 'progress');
          packagesTable1.addColumn('number', 'duration');
          packagesTable1.addColumn('string', 'title');   // optional	 'style': 'image'
		  packagesTable1.addColumn('string', 'image');  // optional
          packagesTable1.addColumn('string', 'style');
		  //packagesTable1.addColumn('number', 'timestamp');
		  
		  packagesTable1.addRow([2, 8, undefined, 10, '<font style="color:#000000;  font-family:verdana;" size="4">Open NMS Flow Controller</front>', DIR + 'msg.png', 'image']);
		  packagesTable1.addRow([2, 9, undefined, 10, '<font style="color:#000000;  font-family:verdana;" size="4"><b>Open NMS Flow Controller</font>', DIR + 'msg.png', 'image']);
		  packagesTable1.addRow([2, 10, undefined, 10, '<font style="color:#000000;  font-family:verdana;" size="4">Open NMS Flow Controller</font>', DIR + 'msg.png', 'image']);
		  
          network.addPackages(packagesTable1);
		  i++;
		  }
		  console.log("flow: " + obj.opennms[0].flow);
		  //document.getElementById("flow").innerHTML=obj.opennms[0].flow
		if (obj.opennms[0].flow == "yes")
		{
        addPackage();
		};
		};
        }, 10000);
		
		
      }
	  function addPackage() {
        try {
          packagesTable = new google.visualization.DataTable();
          packagesTable.addColumn('number', 'from');
          packagesTable.addColumn('number', 'to');
          packagesTable.addColumn('number', 'progress');
          packagesTable.addColumn('number', 'duration');
          packagesTable.addColumn('string', 'title');   // optional	 'style': 'image'
		  packagesTable.addColumn('string', 'image');  // optional
          packagesTable.addColumn('string', 'style');
		  //packagesTable.addColumn('number', 'timestamp');
 		  

          obj = JSON.parse(txt);
           console.log("from: " + obj.opennms[0].from);
		   console.log("to: " + obj.opennms[0].to);
		   console.log("msg: " + obj.opennms[0].msg);
		   console.log("image: " + obj.opennms[0].image);
          //document.getElementById("from").innerHTML=obj.opennms[0].from
          //document.getElementById("to").innerHTML=obj.opennms[0].to
		  //document.getElementById("msg").innerHTML=obj.opennms[0].msg
          //document.getElementById("image").innerHTML=obj.opennms[0].image
		  if(obj.opennms[0].to == "00:11:11:11:11:01") obj.opennms[0].to = 22;
		  if(obj.opennms[0].to == "00:11:11:11:11:03") obj.opennms[0].to = 23;
		  if(obj.opennms[0].to == "00:11:11:11:11:09") obj.opennms[0].to = 24;
		  if(obj.opennms[0].to == "00:11:11:11:05:09") obj.opennms[0].to = 25;
		  if(obj.opennms[0].to == "22:11:11:11:11:01") obj.opennms[0].to = 26;
		  if(obj.opennms[0].to == "00:11:11:11:04:01") obj.opennms[0].to = 27;
		  if(obj.opennms[0].to == "00:11:11:11:06:01") obj.opennms[0].to = 28;
		  
		  if(obj.opennms[0].from == "00:11:11:11:11:01") obj.opennms[0].from = 22;
		  if(obj.opennms[0].from == "00:11:11:11:11:03") obj.opennms[0].from = 23;
		  if(obj.opennms[0].from == "00:11:11:11:11:09") obj.opennms[0].from = 24;
		  if(obj.opennms[0].from == "00:11:11:11:05:09") obj.opennms[0].from = 25;
		  if(obj.opennms[0].from == "22:11:11:11:11:01") obj.opennms[0].from = 26;
		  if(obj.opennms[0].from == "00:11:11:11:04:01") obj.opennms[0].from = 27;
		  if(obj.opennms[0].from == "00:11:11:11:06:01") obj.opennms[0].from = 28;
		  
		  //add link entre from VM slice OVS if green
		  if ((obj.opennms[0].from == 22) && (obj.opennms[0].image == "greenmsg.png")) 
		  {
		  packagesTable.addRow([obj.opennms[0].from, 16, undefined, 10, '<font style="color:#006600;  font-family:verdana;" size="4">' + obj.opennms[0].msg + '</front>', DIR + obj.opennms[0].image, 'image']);
		  packagesTable.addRow([16, 8, undefined, 10, '<font style="color:#006600;  font-family:verdana;" size="4">' + obj.opennms[0].msg + '</front>', DIR + obj.opennms[0].image, 'image']);
		  }
		  if ((obj.opennms[0].from == 23) && (obj.opennms[0].image == "greenmsg.png"))
		  {
		  packagesTable.addRow([obj.opennms[0].from, 16, undefined, 10, '<font style="color:#006600;  font-family:verdana;" size="4">' + obj.opennms[0].msg + '</front>', DIR + obj.opennms[0].image, 'image']);
		  packagesTable.addRow([16, 8, undefined, 10, '<font style="color:#006600;  font-family:verdana;" size="4">' + obj.opennms[0].msg + '</front>', DIR + obj.opennms[0].image, 'image']);
		  }
		  if ((obj.opennms[0].from == 24) && (obj.opennms[0].image == "greenmsg.png"))
		  {
		  packagesTable.addRow([obj.opennms[0].from, 17, undefined, 10, '<font style="color:#006600;  font-family:verdana;" size="4">' + obj.opennms[0].msg + '</front>', DIR + obj.opennms[0].image, 'image']);
		  packagesTable.addRow([17, 10, undefined, 10, '<font style="color:#006600;  font-family:verdana;" size="4">' + obj.opennms[0].msg + '</front>', DIR + obj.opennms[0].image, 'image']);
		  }
		  if ((obj.opennms[0].from == 25) && (obj.opennms[0].image == "greenmsg.png"))
		  {
		  packagesTable.addRow([obj.opennms[0].from, 17, undefined, 10, '<font style="color:#006600;  font-family:verdana;" size="4">' + obj.opennms[0].msg + '</front>', DIR + obj.opennms[0].image, 'image']);
		  packagesTable.addRow([17, 10, undefined, 10, '<font style="color:#006600;  font-family:verdana;" size="4">' + obj.opennms[0].msg + '</front>', DIR + obj.opennms[0].image, 'image']);
		  }
		  if ((obj.opennms[0].from == 26) && (obj.opennms[0].image == "greenmsg.png"))
		  {
		  packagesTable.addRow([obj.opennms[0].from, 18, undefined, 10, '<font style="color:#006600;  font-family:verdana;" size="4">' + obj.opennms[0].msg + '</front>', DIR + obj.opennms[0].image, 'image']);
		  packagesTable.addRow([18, 10, undefined, 10, '<font style="color:#006600;  font-family:verdana;" size="4">' + obj.opennms[0].msg + '</front>', DIR + obj.opennms[0].image, 'image']);
		  }
		  if ((obj.opennms[0].from == 27) && (obj.opennms[0].image == "greenmsg.png"))
		  {
		  packagesTable.addRow([obj.opennms[0].from, 19, undefined, 10, '<font style="color:#006600;  font-family:verdana;" size="4">' + obj.opennms[0].msg + '</front>', DIR + obj.opennms[0].image, 'image']);
		  packagesTable.addRow([19, 9, undefined, 10, '<font style="color:#006600;  font-family:verdana;" size="4">' + obj.opennms[0].msg + '</front>', DIR + obj.opennms[0].image, 'image']);
		  }
		  if ((obj.opennms[0].from == 28) && (obj.opennms[0].image == "greenmsg.png"))
		  {
		  packagesTable.addRow([obj.opennms[0].from, 20, undefined, 10, '<font style="color:#006600;  font-family:verdana;" size="4">' + obj.opennms[0].msg + '</front>', DIR + obj.opennms[0].image, 'image']);
		  packagesTable.addRow([20, 9, undefined, 10, '<font style="color:#006600;  font-family:verdana;" size="4">' + obj.opennms[0].msg + '</front>', DIR + obj.opennms[0].image, 'image']);
		  }
		  
		  
		  
		  //add link entre from VM slice OVS if red
		  if ((obj.opennms[0].from == 22) && (obj.opennms[0].image == "redmsg.png")) 
		  {
		  packagesTable.addRow([obj.opennms[0].from, 16, undefined, 10, '<font style="color:#FF0000;  font-family:verdana;" size="4">' + obj.opennms[0].msg + '</front>', DIR + obj.opennms[0].image, 'image']);
		  packagesTable.addRow([16, 8, undefined, 10, '<font style="color:#FF0000;  font-family:verdana;" size="4">' + obj.opennms[0].msg + '</front>', DIR + obj.opennms[0].image, 'image']);
		  }
		  if ((obj.opennms[0].from == 23) && (obj.opennms[0].image == "redmsg.png"))
		  {
		  packagesTable.addRow([obj.opennms[0].from, 16, undefined, 10, '<font style="color:#FF0000;  font-family:verdana;" size="4">' + obj.opennms[0].msg + '</front>', DIR + obj.opennms[0].image, 'image']);
		  packagesTable.addRow([16, 8, undefined, 10, '<font style="color:#FF0000;  font-family:verdana;" size="4">' + obj.opennms[0].msg + '</front>', DIR + obj.opennms[0].image, 'image']);
		  }
		  if ((obj.opennms[0].from == 24) && (obj.opennms[0].image == "redmsg.png"))
		  {
		  packagesTable.addRow([obj.opennms[0].from, 17, undefined, 10, '<font style="color:#FF0000;  font-family:verdana;" size="4">' + obj.opennms[0].msg + '</front>', DIR + obj.opennms[0].image, 'image']);
		  packagesTable.addRow([17, 10, undefined, 10, '<font style="color:#FF0000;  font-family:verdana;" size="4">' + obj.opennms[0].msg + '</front>', DIR + obj.opennms[0].image, 'image']);
		  }
		  if ((obj.opennms[0].from == 25) && (obj.opennms[0].image == "redmsg.png"))
		  {
		  packagesTable.addRow([obj.opennms[0].from, 17, undefined, 10, '<font style="color:#FF0000;  font-family:verdana;" size="4">' + obj.opennms[0].msg + '</front>', DIR + obj.opennms[0].image, 'image']);
		  packagesTable.addRow([17, 10, undefined, 10, '<font style="color:#FF0000;  font-family:verdana;" size="4">' + obj.opennms[0].msg + '</front>', DIR + obj.opennms[0].image, 'image']);
		  }
		  if ((obj.opennms[0].from == 26) && (obj.opennms[0].image == "redmsg.png"))
		  {
		  packagesTable.addRow([obj.opennms[0].from, 18, undefined, 10, '<font style="color:#FF0000;  font-family:verdana;" size="4">' + obj.opennms[0].msg + '</front>', DIR + obj.opennms[0].image, 'image']);
		  packagesTable.addRow([18, 10, undefined, 10, '<font style="color:#FF0000;  font-family:verdana;" size="4">' + obj.opennms[0].msg + '</front>', DIR + obj.opennms[0].image, 'image']);
		  }
		  if ((obj.opennms[0].from == 27) && (obj.opennms[0].image == "redmsg.png"))
		  {
		  packagesTable.addRow([obj.opennms[0].from, 19, undefined, 10, '<font style="color:#FF0000;  font-family:verdana;" size="4">' + obj.opennms[0].msg + '</front>', DIR + obj.opennms[0].image, 'image']);
		  packagesTable.addRow([19, 9, undefined, 10, '<font style="color:#FF0000;  font-family:verdana;" size="4">' + obj.opennms[0].msg + '</front>', DIR + obj.opennms[0].image, 'image']);
		  }
		  if ((obj.opennms[0].from == 28) && (obj.opennms[0].image == "redmsg.png"))
		  {
		  packagesTable.addRow([obj.opennms[0].from, 20, undefined, 10, '<font style="color:#FF0000;  font-family:verdana;" size="4">' + obj.opennms[0].msg + '</front>', DIR + obj.opennms[0].image, 'image']);
		  packagesTable.addRow([20, 9, undefined, 10, '<font style="color:#FF0000;  font-family:verdana;" size="4">' + obj.opennms[0].msg + '</front>', DIR + obj.opennms[0].image, 'image']);
		  }
		  
		  
		  
		  
		  
		  
		  //add link entre ovs slice vm if green
		  if ((obj.opennms[0].to == 22) && (obj.opennms[0].image == "greenmsg.png"))
		  {
		  packagesTable.addRow([8, 16, undefined, 10, '<font style="color:#006600;  font-family:verdana;" size="4">' + obj.opennms[0].msg + '</front>', DIR + obj.opennms[0].image, 'image']);
		  packagesTable.addRow([16, obj.opennms[0].to, undefined, 10, '<font style="color:#006600;  font-family:verdana;" size="4">' + obj.opennms[0].msg + '</front>', DIR + obj.opennms[0].image, 'image']);
		  }
		  if ((obj.opennms[0].to == 23) && (obj.opennms[0].image == "greenmsg.png"))
		  {
		  packagesTable.addRow([8, 16, undefined, 10, '<font style="color:#006600;  font-family:verdana;" size="4">' + obj.opennms[0].msg + '</front>', DIR + obj.opennms[0].image, 'image']);
		  packagesTable.addRow([16, obj.opennms[0].to, undefined, 10, '<font style="color:#006600;  font-family:verdana;" size="4">' + obj.opennms[0].msg + '</front>', DIR + obj.opennms[0].image, 'image']);
		  }
		  if ((obj.opennms[0].to == 24) && (obj.opennms[0].image == "greenmsg.png"))
		  {
		  packagesTable.addRow([10, 17, undefined, 10, '<font style="color:#006600;  font-family:verdana;" size="4">' + obj.opennms[0].msg + '</front>', DIR + obj.opennms[0].image, 'image']);
		  packagesTable.addRow([17, obj.opennms[0].to, undefined, 10, '<font style="color:#006600;  font-family:verdana;" size="4">' + obj.opennms[0].msg + '</front>', DIR + obj.opennms[0].image, 'image']);  
		  }
		  if ((obj.opennms[0].to == 25) && (obj.opennms[0].image == "greenmsg.png"))
		  {
		  packagesTable.addRow([10, 17, undefined, 10, '<font style="color:#006600;  font-family:verdana;" size="4">' + obj.opennms[0].msg + '</front>', DIR + obj.opennms[0].image, 'image']);
		  packagesTable.addRow([17, obj.opennms[0].to, undefined, 10, '<font style="color:#006600;  font-family:verdana;" size="4">' + obj.opennms[0].msg + '</front>', DIR + obj.opennms[0].image, 'image']);
		  
		  }
		  if ((obj.opennms[0].to == 26) && (obj.opennms[0].image == "greenmsg.png"))
		  {
		  packagesTable.addRow([10, 18, undefined, 10, '<font style="color:#006600;  font-family:verdana;" size="4">' + obj.opennms[0].msg + '</front>', DIR + obj.opennms[0].image, 'image']);
		  packagesTable.addRow([18, obj.opennms[0].to, undefined, 10, '<font style="color:#006600;  font-family:verdana;" size="4">' + obj.opennms[0].msg + '</front>', DIR + obj.opennms[0].image, 'image']);
		  
		  }
		  if ((obj.opennms[0].to == 27) && (obj.opennms[0].image == "greenmsg.png"))
		  {
		  packagesTable.addRow([9, 19, undefined, 10, '<font style="color:#006600;  font-family:verdana;" size="4">' + obj.opennms[0].msg + '</front>', DIR + obj.opennms[0].image, 'image']);
		  packagesTable.addRow([19, obj.opennms[0].to, undefined, 10, '<font style="color:#006600;  font-family:verdana;" size="4">' + obj.opennms[0].msg + '</front>', DIR + obj.opennms[0].image, 'image']);
		  
		  }
		  if ((obj.opennms[0].to == 28) && (obj.opennms[0].image == "greenmsg.png"))
		  {
		  packagesTable.addRow([9, 20, undefined, 10, '<font style="color:#006600;  font-family:verdana;" size="4">' + obj.opennms[0].msg + '</front>', DIR + obj.opennms[0].image, 'image']);
		  packagesTable.addRow([20, obj.opennms[0].to, undefined, 10, '<font style="color:#006600;  font-family:verdana;" size="4">' + obj.opennms[0].msg + '</front>', DIR + obj.opennms[0].image, 'image']);
		  
		  }
		  
		  
		  
		  
		  
		  //from vDC1 to vDC2 or vDC3
		  if (((obj.opennms[0].from == 22) || (obj.opennms[0].from == 23)) && ((obj.opennms[0].to == 24) || (obj.opennms[0].to == 25) || (obj.opennms[0].to == 26)) && (obj.opennms[0].image == "greenmsg.png"))
		  {
		  packagesTable.addRow([8, 5, undefined, 10, '<font style="color:#006600;  font-family:verdana;" size="4">' + obj.opennms[0].msg + '</front>', DIR + obj.opennms[0].image, 'image']);
		  packagesTable.addRow([5, 3, undefined, 10, '<font style="color:#006600;  font-family:verdana;" size="4">' + obj.opennms[0].msg + '</front>', DIR + obj.opennms[0].image, 'image']);
		  packagesTable.addRow([3, 7, undefined, 10, '<font style="color:#006600;  font-family:verdana;" size="4">' + obj.opennms[0].msg + '</front>', DIR + obj.opennms[0].image, 'image']);
		  packagesTable.addRow([7, 10, undefined, 10, '<font style="color:#006600;  font-family:verdana;" size="4">' + obj.opennms[0].msg + '</front>', DIR + obj.opennms[0].image, 'image']);
		  }
		  //from vDC1 to vDC4 or vDC5
		  if (((obj.opennms[0].from == 22) || (obj.opennms[0].from == 23)) && ((obj.opennms[0].to == 27) || (obj.opennms[0].to == 28)) && (obj.opennms[0].image == "greenmsg.png"))
		  {
		  packagesTable.addRow([8, 5, undefined, 10, '<font style="color:#006600;  font-family:verdana;" size="4">' + obj.opennms[0].msg + '</front>', DIR + obj.opennms[0].image, 'image']);
		  packagesTable.addRow([5, 3, undefined, 10, '<font style="color:#006600;  font-family:verdana;" size="4">' + obj.opennms[0].msg + '</front>', DIR + obj.opennms[0].image, 'image']);
		  packagesTable.addRow([3, 6, undefined, 10, '<font style="color:#006600;  font-family:verdana;" size="4">' + obj.opennms[0].msg + '</front>', DIR + obj.opennms[0].image, 'image']);
		  packagesTable.addRow([6, 9, undefined, 10, '<font style="color:#006600;  font-family:verdana;" size="4">' + obj.opennms[0].msg + '</front>', DIR + obj.opennms[0].image, 'image']);
		  }
		  
		  
		  
		  
		  //from vDC2 or vDC3 to vDC1
		  if (((obj.opennms[0].from == 24) || (obj.opennms[0].from == 25) || (obj.opennms[0].from == 26)) && ((obj.opennms[0].to == 22) || (obj.opennms[0].to == 23)) && (obj.opennms[0].image == "greenmsg.png"))
		  {
		  packagesTable.addRow([10, 7, undefined, 10, '<font style="color:#006600;  font-family:verdana;" size="4">' + obj.opennms[0].msg + '</front>', DIR + obj.opennms[0].image, 'image']);
		  packagesTable.addRow([7, 3, undefined, 10, '<font style="color:#006600;  font-family:verdana;" size="4">' + obj.opennms[0].msg + '</front>', DIR + obj.opennms[0].image, 'image']);
		  packagesTable.addRow([3, 5, undefined, 10, '<font style="color:#006600;  font-family:verdana;" size="4">' + obj.opennms[0].msg + '</front>', DIR + obj.opennms[0].image, 'image']);
		  packagesTable.addRow([5, 8, undefined, 10, '<font style="color:#006600;  font-family:verdana;" size="4">' + obj.opennms[0].msg + '</front>', DIR + obj.opennms[0].image, 'image']);
		  }
		  //from vDC2 or vDC3 to vDC5 or vDC4
		  if (((obj.opennms[0].from == 24) || (obj.opennms[0].from == 25) || (obj.opennms[0].from == 26)) && ((obj.opennms[0].to == 27) || (obj.opennms[0].to == 28)) && (obj.opennms[0].image == "greenmsg.png"))
		  {
		  packagesTable.addRow([10, 7, undefined, 10, '<font style="color:#006600;  font-family:verdana;" size="4">' + obj.opennms[0].msg + '</front>', DIR + obj.opennms[0].image, 'image']);
		  packagesTable.addRow([7, 3, undefined, 10, '<font style="color:#006600;  font-family:verdana;" size="4">' + obj.opennms[0].msg + '</front>', DIR + obj.opennms[0].image, 'image']);
		  packagesTable.addRow([3, 6, undefined, 10, '<font style="color:#006600;  font-family:verdana;" size="4">' + obj.opennms[0].msg + '</front>', DIR + obj.opennms[0].image, 'image']);
		  packagesTable.addRow([6, 9, undefined, 10, '<font style="color:#006600;  font-family:verdana;" size="4">' + obj.opennms[0].msg + '</front>', DIR + obj.opennms[0].image, 'image']);
		  }
		  
		  
		  //from vDC4 or vDC5 to vDC1
		  if (((obj.opennms[0].from == 27) || (obj.opennms[0].from == 28)) && ((obj.opennms[0].to == 22) || (obj.opennms[0].to == 23)) && (obj.opennms[0].image == "greenmsg.png"))
		  {
		  packagesTable.addRow([9, 6, undefined, 10, '<font style="color:#006600;  font-family:verdana;" size="4">' + obj.opennms[0].msg + '</front>', DIR + obj.opennms[0].image, 'image']);
		  packagesTable.addRow([6, 3, undefined, 10, '<font style="color:#006600;  font-family:verdana;" size="4">' + obj.opennms[0].msg + '</front>', DIR + obj.opennms[0].image, 'image']);
		  packagesTable.addRow([3, 5, undefined, 10, '<font style="color:#006600;  font-family:verdana;" size="4">' + obj.opennms[0].msg + '</front>', DIR + obj.opennms[0].image, 'image']);
		  packagesTable.addRow([5, 8, undefined, 10, '<font style="color:#006600;  font-family:verdana;" size="4">' + obj.opennms[0].msg + '</front>', DIR + obj.opennms[0].image, 'image']);
		  }
		  //from vDC4 or vDC5 to vDC5 or vDC2
		  if (((obj.opennms[0].from == 27) || (obj.opennms[0].from == 28)) && ((obj.opennms[0].to == 24) || (obj.opennms[0].to == 25) || (obj.opennms[0].to == 26)) && (obj.opennms[0].image == "greenmsg.png"))
		  {
		  packagesTable.addRow([9, 6, undefined, 10, '<font style="color:#006600;  font-family:verdana;" size="4">' + obj.opennms[0].msg + '</front>', DIR + obj.opennms[0].image, 'image']);
		  packagesTable.addRow([6, 3, undefined, 10, '<font style="color:#006600;  font-family:verdana;" size="4">' + obj.opennms[0].msg + '</front>', DIR + obj.opennms[0].image, 'image']);
		  packagesTable.addRow([3, 7, undefined, 10, '<font style="color:#006600;  font-family:verdana;" size="4">' + obj.opennms[0].msg + '</front>', DIR + obj.opennms[0].image, 'image']);
		  packagesTable.addRow([7, 10, undefined, 10, '<font style="color:#006600;  font-family:verdana;" size="4">' + obj.opennms[0].msg + '</front>', DIR + obj.opennms[0].image, 'image']);
		  }
		  
		  
		  
          network.addPackages(packagesTable);
        }
        catch(err) {
          alert(err);
        }
      }
	  function Ajax()
        {
            var
                $http,
                $self = arguments.callee;

            if (window.XMLHttpRequest) {
                $http = new XMLHttpRequest();
            } else if (window.ActiveXObject) {
                try {
                    $http = new ActiveXObject('Msxml2.XMLHTTP');
                } catch(e) {
                    $http = new ActiveXObject('Microsoft.XMLHTTP');
                }
            }

            if ($http) {
                $http.onreadystatechange = function()
                {
                    if (/4|^complete$/.test($http.readyState)) {
                        //document.getElementById('ReloadThis').innerHTML = $http.responseText;
						//console.log($http.responseText);
						txt = $http.responseText;
						console.log("opennms.json: " + txt);
						obj = JSON.parse(txt);
                        
                        //document.getElementById("statut").innerHTML=obj.opennms[0].statut
		                console.log("Current tatut: " + obj.opennms[0].statut);
                        setTimeout(function(){$self();}, 1000);
                    }
                };
                $http.open('GET', 'opennms.json' + '?' + new Date().getTime(), true);
				
                $http.send(null);
            }

        }
		function Config(file)
        {
            var
                $http,
                $self = arguments.callee;

            if (window.XMLHttpRequest) {
                $http = new XMLHttpRequest();
            } else if (window.ActiveXObject) {
                try {
                    $http = new ActiveXObject('Msxml2.XMLHTTP');
                } catch(e) {
                    $http = new ActiveXObject('Microsoft.XMLHTTP');
                }
            }

            if ($http) {
                $http.onreadystatechange = function()
                {
                    if (/4|^complete$/.test($http.readyState)) {
						config = $http.responseText;
						console.log("config: " + config);
                        setTimeout(function(){$self();}, 1000);
                    }
                };
                $http.open('GET', file + '?' + new Date().getTime(), true);
				
                $http.send(null);
            }

        }
		function onselect() {
        var sel = network.getSelection();

        var info = null;  
		
        for (var i = 0; i < sel.length; i++) {
            info = sel[i].row;
        }
		
		
		//console.log("info: " + info);
		//setTimeout(function() {
		//Config(info);
		//}, 1000);
		
		
		if (info == 1) openWin('node1.html');
        if (info == 7) openWin('node7.html');
		if (info == 8) openWin('node8.html');
		if (info == 9) openWin('node9.html');
		if (info == 15) openWin('node15.html');
		if (info == 16) openWin('node16.html');
		if (info == 17) openWin('node17.html');
		if (info == 18) openWin('node18.html');
		if (info == 19) openWin('node19.html');
		if (info == 20) openWin('node21.html');
		if (info == 21) openWin('node22.html');
		if (info == 22) openWin('node23.html');
		if (info == 23) openWin('node24.html');
		if (info == 24) openWin('node25.html');
		if (info == 25) openWin('node26.html');
		if (info == 26) openWin('node27.html');
      }
	  function openWin(url)
      {
       window.open(url,'Open vSwitch 1','directories=0,titlebar=0,height=250,width=300,left=10,top=10,resizable=yes,scrollbars=yes,toolbar=no,menubar=no,location=no,directories=no,status=no').focus();
         
	  }
	  //startweb("opennms.json", txt);
	  function startweb(fname, data) {
      var fso, fileHandle;
      fso = new ActiveXObject("Scripting.FileSystemObject");
      fileHandle = fso.CreateTextFile(fname, true);
      fileHandle.write(data);
      fileHandle.close();
      };
		

 