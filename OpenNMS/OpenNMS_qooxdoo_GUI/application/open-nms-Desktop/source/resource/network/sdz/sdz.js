function drawVisualization() {
        // Create a data table with nodes.
        var activevxlan = "false";
		var activegre = "false";
		var newnode1 = 1000;
		var newnode2 = 1000;
		var newnode3 = 1000;
		var newnode4 = 1000;
		var newnode5 = 1000;
		var newnode6 = 1000;
		var newnode7 = 1000;
		var newnode8 = 1000;
		var newnode9 = 1000;
		
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
		linksTable.addColumn('string', 'text');   // optional
        linksTable.addColumn('string', 'title');   // optional
		linksTable.addColumn('string', 'action');
		linksTable.addColumn('number', 'id');
        var length1 = 450;
        var length2 = 350;
        var length3 = 150;
        var length4 = 140;
        var length5 = 150;
        nodesTable.addRow([1, 'INTERNET', DIR + 'internet.png', 'image', undefined]);
        nodesTable.addRow([2, 'CLOUD CONTROLLER', DIR + 'cdo.png', 'image', undefined]);
        nodesTable.addRow([3, 'SDZ 1: eri-gep-0-11', DIR + 'sdz.png', 'image', undefined]);
        nodesTable.addRow([4, 'SDZ 2: eri-gep-0-13', DIR + 'sdz.png', 'image', undefined]);
        nodesTable.addRow([5, 'SDZ 3: eri-gep-0-15', DIR + 'sdz.png', 'image', undefined]);
        nodesTable.addRow([6, 'SDZ 4: eri-gep-0-19', DIR + 'sdz.png', 'image', undefined]); 
		
        linksTable.addRow([3, 4, length2, 7, undefined, '210', '<TEXTAREA name="adresse" rows="2" cols="30"> Distance Cost: 210 \n Bandwidth Available: 800Mb </TEXTAREA>', undefined, 1]);
        linksTable.addRow([3, 5, length2, 7, undefined, '110', '<TEXTAREA name="adresse" rows="2" cols="30"> Distance Cost: 110 \n Bandwidth Available: 900Mb </TEXTAREA>', undefined, 2]);
        linksTable.addRow([3, 6, length2, 7, undefined, '10', '<TEXTAREA name="adresse" rows="2" cols="30"> Distance Cost: 10 \n Bandwidth Available: 1Gb </TEXTAREA>', undefined, 3]);
        linksTable.addRow([4, 5, length2, 7, undefined, '10', '<TEXTAREA name="adresse" rows="2" cols="30"> Distance Cost: 10 \n Bandwidth Available: 1Gb </TEXTAREA>', undefined, 4]);
        linksTable.addRow([4, 6, length2, 7, undefined, '110', '<TEXTAREA name="adresse" rows="2" cols="30"> Distance Cost: 110 \n Bandwidth Available: 900Mb </TEXTAREA>', undefined, 5]);
        linksTable.addRow([5, 6, length2, 7, undefined, '10', '<TEXTAREA name="adresse" rows="2" cols="30"> Distance Cost: 10 \n Bandwidth Available: 1Gb </TEXTAREA>', undefined, 6]);
 
        nodesTable.addRow([7, 'Open vSwitch: br-tun', DIR + 'openvswitch.png', 'image', undefined]);
        nodesTable.addRow([8, 'Open vSwitch: br-tun', DIR + 'openvswitch.png', 'image', undefined]);
        nodesTable.addRow([9, 'Open vSwitch: br-tun', DIR + 'openvswitch.png', 'image', undefined]);
		nodesTable.addRow([10, 'Open vSwitch: br-tun', DIR + 'openvswitch.png', 'image', undefined]);
		nodesTable.addRow([11, 'Open vSwitch: br-ex', DIR + 'openvswitch.png', 'image', undefined]);
		nodesTable.addRow([12, 'Open vSwitch: br-int', DIR + 'openvswitch.png', 'image', undefined]);
        nodesTable.addRow([13, 'Open vSwitch: br-int', DIR + 'openvswitch.png', 'image', undefined]);
        nodesTable.addRow([14, 'Open vSwitch: br-int', DIR + 'openvswitch.png', 'image', undefined]);
		nodesTable.addRow([15, 'Open vSwitch: br-int', DIR + 'openvswitch.png', 'image', undefined]);
		linksTable.addRow([1, 11, length3, 10, undefined, '100', undefined, undefined, undefined]);
        linksTable.addRow([11, 3, length3, 5, undefined, undefined, undefined, undefined, undefined]);
		linksTable.addRow([3, 7, length3, 5, undefined, undefined, undefined, undefined, undefined]);
        linksTable.addRow([4, 8, length3, 5, undefined, undefined, undefined, undefined, undefined]);
        linksTable.addRow([5, 9, length3, 5, undefined, undefined, undefined, undefined, undefined]);
		linksTable.addRow([6, 10, length3, 5, undefined, undefined, undefined, undefined, undefined]);
		linksTable.addRow([7, 12, length3, 5, undefined, undefined, undefined, undefined, undefined]);
        linksTable.addRow([8, 13, length3, 5, undefined, undefined, undefined, undefined, undefined]);
        linksTable.addRow([9, 14, length3, 5, undefined, undefined, undefined, undefined, undefined]);
		linksTable.addRow([10, 15, length3, 5, undefined, undefined, undefined, undefined, undefined]);
       
        nodesTable.addRow([16, 'VxLAN-net1', undefined, undefined, 1]);
        linksTable.addRow([16, 12, length5, 3, undefined, undefined, undefined, undefined, undefined]);
        nodesTable.addRow([17, 'VxLAN-net2', undefined, undefined, 2]);
        linksTable.addRow([17, 12, length5, 3, undefined, undefined, undefined, undefined, undefined]);
		nodesTable.addRow([18, 'GRE-net1', undefined, undefined, 3]);
        linksTable.addRow([18, 12, length5, 3, undefined, undefined, undefined, undefined, undefined]);
		
		nodesTable.addRow([19, 'VxLAN-net1', undefined, undefined, 1]);
        linksTable.addRow([19, 13, length5, 3, undefined, undefined, undefined, undefined, undefined]);
		nodesTable.addRow([20, 'GRE-net1', undefined, undefined, 3]);
        linksTable.addRow([20, 13, length5, 3, undefined, undefined, undefined, undefined, undefined]);
		
		nodesTable.addRow([21, 'VxLAN-net1', undefined, undefined, 1]);
        linksTable.addRow([21, 14, length5, 3, undefined, undefined, undefined, undefined, undefined]);
        nodesTable.addRow([22, 'VxLAN-net2', undefined, undefined, 2]);
        linksTable.addRow([22, 14, length5, 3, undefined, undefined, undefined, undefined, undefined]);
		nodesTable.addRow([31, 'GRE-net1', undefined, undefined, 3]);
        linksTable.addRow([31, 14, length5, 3, undefined, undefined, undefined, undefined, undefined]);
		
		nodesTable.addRow([23, 'VxLAN-net1', undefined, undefined, 1]);
        linksTable.addRow([23, 15, length5, 3, undefined, undefined, undefined, undefined, undefined]);
		nodesTable.addRow([32, 'GRE-net1', undefined, undefined, 3]);
        linksTable.addRow([32, 15, length5, 3, undefined, undefined, undefined, undefined, undefined]);
		
		nodesTable.addRow([24, 'VxLAN1-Host0', DIR + 'device.png', 'image', undefined]);
        linksTable.addRow([24, 16, length5, 3, undefined, '10', undefined, undefined, undefined]);
		nodesTable.addRow([25, 'VxLAN1-Host1', DIR + 'device.png', 'image', undefined]);
        linksTable.addRow([25, 19, length5, 3, undefined, '10', undefined, undefined, undefined]);
		nodesTable.addRow([26, 'VxLAN1-Host2', DIR + 'device.png', 'image', undefined]);
        linksTable.addRow([26, 23, length5, 3, undefined, '10', undefined, undefined, undefined]);
		
		
		nodesTable.addRow([27, 'VxLAN2-Host0', DIR + 'device.png', 'image', undefined]);
        linksTable.addRow([27, 17, length5, 3, undefined, '10', undefined, undefined, undefined]);
		nodesTable.addRow([28, 'VxLAN2-Host1', DIR + 'device.png', 'image', undefined]);
        linksTable.addRow([28, 22, length5, 3, undefined, '10', undefined, undefined, undefined]);
		
		nodesTable.addRow([29, 'GRE1-Host0', DIR + 'device.png', 'image', undefined]);
        linksTable.addRow([29, 18, length5, 3, undefined, '10', undefined, undefined, undefined]);
		nodesTable.addRow([30, 'GRE1-Host1', DIR + 'device.png', 'image', undefined]);
        linksTable.addRow([30, 20, length5, 3, undefined, '10', undefined, undefined, undefined]);
		//var newnode = 33;
		
        // specify options
        var options = {
          'width': '1500px', 
          'height': '1000px',
          'stabilize': true,
		  'freezeForStabilization': true,
          'configurePhysics': true		  // stabilize positions before displaying
        };

        // Instantiate our graph object.
        network = new links.Network(document.getElementById('sdz'));
        // Add event listeners
        google.visualization.events.addListener(network, 'select', onselect);
		
        // Draw our graph with the created data and options 
        // Draw our graph with the created data and options 
        network.draw(nodesTable, linksTable, packagesTable, options);
		
		
		//setTimeout(function(){Ajax();},3000);
		
		setTimeout(function() {
		Ajax();
		
		}, 1000);
		
		obj = JSON.parse(txt);

        //document.getElementById("statut").innerHTML=obj.sdz[0].statut
		console.log("Startup statut: " + obj.sdz[0].statut);
		
		
		//packagesTable.addRow([2, 8, undefined, 10, 'Open NMS Flow Controller', DIR + 'msg.png', 'image']);
		//packagesTable.addRow([2, 9, undefined, 10, 'Open NMS Flow Controller', DIR + 'msg.png', 'image']);
		//packagesTable.addRow([2, 10, undefined, 10, 'Open NMS Flow Controller', DIR + 'msg.png', 'image']);
        //network.addPackages(packagesTable);
		if (obj.sdz[0].statut == "on")
		{  
		  linksTable.addRow([2, 3, length1, 1, 'gold', undefined, undefined, undefined, undefined]);
		  network.addLinks(linksTable);
		  
		}
		var i = 0;
		//var defenseN = 0;
		setInterval(function() {
		if (obj.sdz[0].statut == "on")
		{  
		 
		  
		 //if (i<15) {
		  packagesTable1 = new google.visualization.DataTable();
          packagesTable1.addColumn('number', 'from');
          packagesTable1.addColumn('number', 'to');
          packagesTable1.addColumn('number', 'progress');
          packagesTable1.addColumn('number', 'duration');
          packagesTable1.addColumn('string', 'title');   // optional	 'style': 'image'
		  packagesTable1.addColumn('string', 'image');  // optional
          packagesTable1.addColumn('string', 'style');
		  //packagesTable1.addColumn('number', 'timestamp');
		  
		  packagesTable1.addRow([2, 3, undefined, 10, '<font style="color:#000000;  font-family:verdana;" size="4">CLOUD Managment and Control Message</front>', DIR + 'msg.png', 'image']);
		  
          network.addPackages(packagesTable1);
		  //i++;
		  //}
		  console.log("flow: " + obj.sdz[0].flow);
		  //document.getElementById("flow").innerHTML=obj.sdz[0].flow
		if (obj.sdz[0].flow == "yes")
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
          console.log("net: " + obj.sdz[0].net);
		  console.log("defense: " + obj.sdz[0].defense);
		  console.log("msg: " + obj.sdz[0].msg);
		  console.log("image: " + obj.sdz[0].image);
		  console.log("DefenseNumber of current defense is : " + obj.sdz[0].activedefense);
		
		  
		nodesTable1 = new google.visualization.DataTable();
        nodesTable1.addColumn('number', 'id');
        nodesTable1.addColumn('string', 'text');   // optional
        nodesTable1.addColumn('string', 'image');  // optional
        nodesTable1.addColumn('string', 'style');   // optional
		nodesTable1.addColumn('number', 'group');
		//nodesTable1.addColumn('string', 'action');
        
        // Create a data table with links.
        linksTable1 = new google.visualization.DataTable();
        linksTable1.addColumn('number', 'from');
        linksTable1.addColumn('number', 'to');
        linksTable1.addColumn('number', 'length'); // optional
		linksTable1.addColumn('number', 'width');
		linksTable1.addColumn('string', 'color');
		linksTable1.addColumn('string', 'text');   // optional
        linksTable1.addColumn('string', 'title');   // optional
		linksTable1.addColumn('string', 'action');
		linksTable1.addColumn('number', 'id');
		
		//defense of vxlan1  
		if ((obj.sdz[0].defense == "yes") && (obj.sdz[0].activedefense == 0))
		{
		var sm =0;
		console.log("DefenseNumber is 1: " + obj.sdz[0].activedefense);
		//newnode++;
		if (activevxlan == "false")
		{
		nodesTable1.addRow([newnode, 'D1-Security-Module-' + sm, DIR + 'fw.png', 'image', undefined]);
		linksTable1.addRow([newnode, 21, 150, 3, undefined, '10', undefined, undefined, undefined]);
		newnode1 = newnode;
		
		newnode++;
		sm++;
		nodesTable1.addRow([newnode, 'D1-Security-Module-' + sm, DIR + 'fw.png', 'image', undefined]);
		linksTable1.addRow([newnode, 21, 150, 3, undefined, '10', undefined, undefined, undefined]);
		newnode2 = newnode;
		
		newnode++;
		sm++;
		nodesTable1.addRow([newnode, 'D1-Security-Module-' + sm, DIR + 'fw.png', 'image', undefined]);
		linksTable1.addRow([newnode, 21, 150, 3, undefined, '10', undefined, undefined, undefined]); 
		newnode3 = newnode;
		
		newnode++;
		nodesTable1.addRow([newnode, 'D2-Security-Module- 0', DIR + 'fw.png', 'image', undefined]);
		linksTable1.addRow([newnode, 19, 150, 3, undefined, '10', undefined, undefined, undefined]);  
		newnode4 = newnode;
		
		newnode++;
		sm = 0;
		nodesTable1.addRow([newnode, 'D3-Security-Module-' + sm, DIR + 'fw.png', 'image', undefined]);
		linksTable1.addRow([newnode, 19, 150, 3, undefined, '10', undefined, undefined, undefined]);
		var newnode5 = newnode;		
		
		sm++;
		newnode++;
	    nodesTable1.addRow([newnode, 'D3-Security-Module-' + sm, DIR + 'fw.png', 'image', undefined]);
		linksTable1.addRow([newnode, 21, 150, 3, undefined, '10', undefined, undefined, undefined]); 
		var newnode6 = newnode;
		
		sm++;
		newnode++;
		var newnode7 = newnode;
		nodesTable1.addRow([newnode, 'D3-Security-Module-' + sm, DIR + 'fw.png', 'image', undefined]);
		linksTable1.addRow([newnode, 21, 150, 3, undefined, '10', undefined, undefined, undefined]); 
		
		linksTable1.addRow([3, 4, 350, 7, undefined, '310', '<TEXTAREA name="adresse" rows="2" cols="30"> Distance Cost: 310 \n Bandwidth Available: 700Mb </TEXTAREA>', 'update', 1]);
        linksTable1.addRow([3, 5, 350, 7, undefined, '210', '<TEXTAREA name="adresse" rows="2" cols="30"> Distance Cost: 210 \n Bandwidth Available: 800Mb </TEXTAREA>', 'update', 2]);
        linksTable1.addRow([3, 6, 350, 7, undefined, '110', '<TEXTAREA name="adresse" rows="2" cols="30"> Distance Cost: 110 \n Bandwidth Available: 900mb </TEXTAREA>', 'update', 3]);
        linksTable1.addRow([4, 5, 350, 7, undefined, '210', '<TEXTAREA name="adresse" rows="2" cols="30"> Distance Cost: 210 \n Bandwidth Available: 800mb </TEXTAREA>', 'update', 4]);
        linksTable1.addRow([4, 6, 350, 7, undefined, '210', '<TEXTAREA name="adresse" rows="2" cols="30"> Distance Cost: 210 \n Bandwidth Available: 800Mb </TEXTAREA>', 'update', 5]);
        linksTable1.addRow([5, 6, 350, 7, undefined, '210', '<TEXTAREA name="adresse" rows="2" cols="30"> Distance Cost: 210 \n Bandwidth Available: 800mb </TEXTAREA>', 'update', 6]);
 
		network.addNodes(nodesTable1);
		network.addLinks(linksTable1);
		activevxlan = "true";
		}
		
		packagesTable.addRow([1, 11, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);
		packagesTable.addRow([11, 3, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);
		packagesTable.addRow([3, 5, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);
		packagesTable.addRow([5, 9, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);
		packagesTable.addRow([9, 14, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);
        packagesTable.addRow([14, 33, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);
		packagesTable.addRow([33, 14, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);
		
		
		packagesTable.addRow([14, 34, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);
        packagesTable.addRow([34, 14, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);		
		
        
		packagesTable.addRow([14, 35, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);
        packagesTable.addRow([35, 14, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);		
		packagesTable.addRow([14, 9, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);		
		packagesTable.addRow([9, 5, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);		
		packagesTable.addRow([5, 4, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);
		packagesTable.addRow([4, 3, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);		
		packagesTable.addRow([3, 7, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);		
		packagesTable.addRow([7, 12, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);		
		packagesTable.addRow([12, 24, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);
		packagesTable.addRow([24, 12, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);
		packagesTable.addRow([12, 7, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']); 
		packagesTable.addRow([7, 3, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);
        packagesTable.addRow([3, 6, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);
	    packagesTable.addRow([6, 4, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);  		  
		packagesTable.addRow([4, 8, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);  
		packagesTable.addRow([8, 13, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);  
		
		
		packagesTable.addRow([13, 36, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);
		packagesTable.addRow([36, 13, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);
		
		
		packagesTable.addRow([13, 25, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);
		packagesTable.addRow([25, 13, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);
		packagesTable.addRow([25, 37, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);
		packagesTable.addRow([37, 13, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);
		
		packagesTable.addRow([13, 8, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);
		packagesTable.addRow([8, 4, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);
		packagesTable.addRow([4, 5, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);
		packagesTable.addRow([5, 9, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);
		packagesTable.addRow([9, 14, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);
		
		packagesTable.addRow([14, 38, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);
		packagesTable.addRow([38, 14, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);
		
		packagesTable.addRow([14, 39, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);
		packagesTable.addRow([39, 14, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);
		packagesTable.addRow([14, 9, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);
		packagesTable.addRow([9, 5, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);
		packagesTable.addRow([5, 6, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);
		packagesTable.addRow([6, 10, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);
		packagesTable.addRow([10, 15, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);
		packagesTable.addRow([15, 26, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);
		
		
		//defenseN++;
		
		};
		
		
		if ((obj.sdz[1].defense == "yes") && (obj.sdz[0].activedefense == 1))
		{
		
		
		var sm =0;
		console.log("DefenseNumber is 1: " + obj.sdz[0].activedefense);
		//newnode++;
		if (activegre == "false")
		{
		var sm =0;
		console.log("DefenseNumber is 1: " + obj.sdz[0].activedefense);
		//newnode++;
		nodesTable1.addRow([38, 'D4-Security-Module-' + sm, DIR + 'fw.png', 'image', undefined]);
		linksTable1.addRow([38, 32, 150, 3, undefined, '10', undefined, undefined, undefined]);;  
		newnode8 = newnode;
		
		//newnode++;
		sm++;
		nodesTable1.addRow([39, 'D4-Security-Module-' + sm, DIR + 'fw.png', 'image', undefined]);
		linksTable1.addRow([39, 32, 150, 3, undefined, '10', undefined, undefined, undefined]);
		newnode9 = newnode;
		
		linksTable1.addRow([3, 4, 350, 7, undefined, '310', '<TEXTAREA name="adresse" rows="2" cols="30"> Distance Cost: 310 \n Bandwidth Available: 700Mb </TEXTAREA>', 'update', 1]);
        linksTable1.addRow([3, 5, 350, 7, undefined, '210', '<TEXTAREA name="adresse" rows="2" cols="30"> Distance Cost: 210 \n Bandwidth Available: 800Mb </TEXTAREA>', 'update', 2]);
        linksTable1.addRow([3, 6, 350, 7, undefined, '210', '<TEXTAREA name="adresse" rows="2" cols="30"> Distance Cost: 210 \n Bandwidth Available: 800mb </TEXTAREA>', 'update', 3]);
        linksTable1.addRow([4, 5, 350, 7, undefined, '210', '<TEXTAREA name="adresse" rows="2" cols="30"> Distance Cost: 210 \n Bandwidth Available: 800mb </TEXTAREA>', 'update', 4]);
        linksTable1.addRow([4, 6, 350, 7, undefined, '310', '<TEXTAREA name="adresse" rows="2" cols="30"> Distance Cost: 310 \n Bandwidth Available: 700Mb </TEXTAREA>', 'update', 5]);
        linksTable1.addRow([5, 6, 350, 7, undefined, '210', '<TEXTAREA name="adresse" rows="2" cols="30"> Distance Cost: 210 \n Bandwidth Available: 800mb </TEXTAREA>', 'update', 6]);
 
		network.addNodes(nodesTable1);
		network.addLinks(linksTable1);
		activegre = "true";
		}
		
		
		  packagesTable.addRow([29, 12, undefined, 10, '<font style="color:#FF0066;  font-family:verdana;" size="4">' + obj.sdz[1].msg + '</front>', DIR + obj.sdz[1].image, 'image']);
		  packagesTable.addRow([12, 7, undefined, 10, '<font style="color:#FF0066;  font-family:verdana;" size="4">' + obj.sdz[1].msg + '</front>', DIR + obj.sdz[1].image, 'image']);
		  packagesTable.addRow([7, 3, undefined, 10, '<font style="color:#FF0066;  font-family:verdana;" size="4">' + obj.sdz[1].msg + '</front>', DIR + obj.sdz[1].image, 'image']);
		  packagesTable.addRow([3, 6, undefined, 10, '<font style="color:#FF0066;  font-family:verdana;" size="4">' + obj.sdz[1].msg + '</front>', DIR + obj.sdz[1].image, 'image']);
		  packagesTable.addRow([6, 10, undefined, 10, '<font style="color:#FF0066;  font-family:verdana;" size="4">' + obj.sdz[1].msg + '</front>', DIR + obj.sdz[1].image, 'image']);
		  packagesTable.addRow([10, 15, undefined, 10, '<font style="color:#FF0066;  font-family:verdana;" size="4">' + obj.sdz[1].msg + '</front>', DIR + obj.sdz[1].image, 'image']);
		  packagesTable.addRow([15, 38, undefined, 10, '<font style="color:#FF0066;  font-family:verdana;" size="4">' + obj.sdz[1].msg + '</front>', DIR + obj.sdz[1].image, 'image']);
		  packagesTable.addRow([38, 15, undefined, 10, '<font style="color:#FF0066;  font-family:verdana;" size="4">' + obj.sdz[1].msg + '</front>', DIR + obj.sdz[1].image, 'image']);
		  packagesTable.addRow([15, 39, undefined, 10, '<font style="color:#FF0066;  font-family:verdana;" size="4">' + obj.sdz[1].msg + '</front>', DIR + obj.sdz[1].image, 'image']);
		  packagesTable.addRow([39, 15, undefined, 10, '<font style="color:#FF0066;  font-family:verdana;" size="4">' + obj.sdz[1].msg + '</front>', DIR + obj.sdz[1].image, 'image']);
		  packagesTable.addRow([15, 10, undefined, 10, '<font style="color:#FF0066;  font-family:verdana;" size="4">' + obj.sdz[1].msg + '</front>', DIR + obj.sdz[1].image, 'image']);
		  packagesTable.addRow([10, 6, undefined, 10, '<font style="color:#FF0066;  font-family:verdana;" size="4">' + obj.sdz[1].msg + '</front>', DIR + obj.sdz[1].image, 'image']);
		  packagesTable.addRow([6, 4, undefined, 10, '<font style="color:#FF0066;  font-family:verdana;" size="4">' + obj.sdz[1].msg + '</front>', DIR + obj.sdz[1].image, 'image']);
		  packagesTable.addRow([4, 13, undefined, 10, '<font style="color:#FF0066;  font-family:verdana;" size="4">' + obj.sdz[1].msg + '</front>', DIR + obj.sdz[1].image, 'image']);
		  packagesTable.addRow([13, 8, undefined, 10, '<font style="color:#FF0066;  font-family:verdana;" size="4">' + obj.sdz[1].msg + '</front>', DIR + obj.sdz[1].image, 'image']);
		  packagesTable.addRow([8, 30, undefined, 10, '<font style="color:#FF0066;  font-family:verdana;" size="4">' + obj.sdz[1].msg + '</front>', DIR + obj.sdz[1].image, 'image']);
		 

		};
		  
		  
		  //if(obj.sdz[0].defense == "internet") obj.sdz[0].defense = 1;
		  //if(obj.sdz[0].defense == "vxlan1-host0") obj.sdz[0].defense = 24;
		  //if(obj.sdz[0].defense == "vxlan1-host1") obj.sdz[0].defense = 25;
		  //if(obj.sdz[0].defense == "vxlan1-host2") obj.sdz[0].defense = 26;
		  //if(obj.sdz[0].defense == "vxlan1-SM1") obj.sdz[0].defense = 25;
		  //if(obj.sdz[0].defense == "vxlan1-SM2") obj.sdz[0].defense = 26;
		  //if(obj.sdz[0].defense == "vxlan1-SM3") obj.sdz[0].defense = 27;
		  //if(obj.sdz[0].defense == "vxlan1-SM4") obj.sdz[0].defense = 28;
		  //if(obj.sdz[0].defense == "vxlan1-SM5") obj.sdz[0].defense = 26;
		  //if(obj.sdz[0].defense == "vxlan1-SM6") obj.sdz[0].defense = 27;
		  //if(obj.sdz[0].defense == "vxlan1-SM7") obj.sdz[0].defense = 28;
		  
		  //if(obj.sdz[0].net == "internet") obj.sdz[0].net= 1;
		  //if(obj.sdz[0].net == "vxlan1-host0") obj.sdz[0].net= 24;
		  //if(obj.sdz[0].net == "vxlan1-host1") obj.sdz[0].net = 25;
		  //if(obj.sdz[0].net == "vxlan1-host2") obj.sdz[0].net = 26;
		  //if(obj.sdz[0].net == "vxlan1-SM1") obj.sdz[0].net = 25;
		  //if(obj.sdz[0].net == "vxlan1-SM2") obj.sdz[0].net = 26;
		  //if(obj.sdz[0].net == "vxlan1-SM3") obj.sdz[0].net = 27;
		  //if(obj.sdz[0].net == "vxlan1-SM4") obj.sdz[0].net = 28;
		  //if(obj.sdz[0].net == "vxlan1-SM5") obj.sdz[0].net = 26;
		  //if(obj.sdz[0].net == "vxlan1-SM6") obj.sdz[0].net = 27;
		  //if(obj.sdz[0].net == "vxlan1-SM7") obj.sdz[0].net = 28;
		  
		  //add link entre net VM slice OVS if green
		  if ((obj.sdz[0].flow == "yes") && (obj.sdz[0].net == "vxlan1") && (obj.sdz[0].image == "bluemsg.png") && (obj.sdz[0].defense == "off") ) 
		  {
		  packagesTable.addRow([1, 11, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);
		  packagesTable.addRow([11, 3, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);
		  
		  packagesTable.addRow([24, 12, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);
		  packagesTable.addRow([12, 7, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);
		  packagesTable.addRow([7, 3, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);
		  
		  packagesTable.addRow([25, 13, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);
		  packagesTable.addRow([13, 8, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);
		  packagesTable.addRow([8, 4, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);
		
		  //packagesTable.addRow([26, 15, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);
		  //packagesTable.addRow([15, 10, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);
		  //packagesTable.addRow([10, 6, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);
		  }
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  //add link entre ovs slice vm if green
		  if ((obj.sdz[0].flow == "yes") && (obj.sdz[0].net == "vxlan1") && (obj.sdz[0].image == "bluemsg.png") && (obj.sdz[0].defense == "off")) 
		  {
		  //packagesTable.addRow([3, 11, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);
		  //packagesTable.addRow([11, 1, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);
		  
		  packagesTable.addRow([3, 7, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);
		  packagesTable.addRow([7, 12, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);
		  packagesTable.addRow([12, 24, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);  
		  
		  packagesTable.addRow([4, 8, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);
		  packagesTable.addRow([8, 13, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);
		  packagesTable.addRow([13, 25, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);  
		  
		   packagesTable.addRow([6, 10, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);
		  packagesTable.addRow([10, 15, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);
		  packagesTable.addRow([15, 26, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);  
		  
		  }
		  
		  
		  
		  
		  //ping betwwen Gep
		  //net host 0 defense host 1
		  if ((obj.sdz[0].flow == "yes") && (obj.sdz[0].net == "vxlan1") && (obj.sdz[0].image == "bluemsg.png") && (obj.sdz[0].defense == "off")) 
		  {
		  packagesTable.addRow([3, 4, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);
		  
		  packagesTable.addRow([4, 6, undefined, 10, '<font style="color:#66CCFF;  font-family:verdana;" size="4">' + obj.sdz[0].msg + '</front>', DIR + obj.sdz[0].image, 'image']);
		  }
		  
		  
		  
		  if ((obj.sdz[1].flow == "yes") && (obj.sdz[1].net == "gre1") && (obj.sdz[1].image == "pinkmsg.png") && (obj.sdz[1].defense == "off")) 
		  {
		  /*packagesTable.addRow([1, 11, undefined, 10, '<font style="color:#FF0066;  font-family:verdana;" size="4">' + obj.sdz[1].msg + '</front>', DIR + obj.sdz[1].image, 'image']);
		  packagesTable.addRow([11, 3, undefined, 10, '<font style="color:#FF0066;  font-family:verdana;" size="4">' + obj.sdz[1].msg + '</front>', DIR + obj.sdz[1].image, 'image']);
		  packagesTable.addRow([3, 7, undefined, 10, '<font style="color:#FF0066;  font-family:verdana;" size="4">' + obj.sdz[1].msg + '</front>', DIR + obj.sdz[1].image, 'image']);
		  packagesTable.addRow([7, 12, undefined, 10, '<font style="color:#FF0066;  font-family:verdana;" size="4">' + obj.sdz[1].msg + '</front>', DIR + obj.sdz[1].image, 'image']);
		  packagesTable.addRow([12, 29, undefined, 10, '<font style="color:#FF0066;  font-family:verdana;" size="4">' + obj.sdz[1].msg + '</front>', DIR + obj.sdz[1].image, 'image']);
		  */
		  packagesTable.addRow([29, 12, undefined, 10, '<font style="color:#FF0066;  font-family:verdana;" size="4">' + obj.sdz[1].msg + '</front>', DIR + obj.sdz[1].image, 'image']);
		  packagesTable.addRow([12, 7, undefined, 10, '<font style="color:#FF0066;  font-family:verdana;" size="4">' + obj.sdz[1].msg + '</front>', DIR + obj.sdz[1].image, 'image']);
		  packagesTable.addRow([7, 3, undefined, 10, '<font style="color:#FF0066;  font-family:verdana;" size="4">' + obj.sdz[1].msg + '</front>', DIR + obj.sdz[1].image, 'image']);
		  packagesTable.addRow([3, 4, undefined, 10, '<font style="color:#FF0066;  font-family:verdana;" size="4">' + obj.sdz[1].msg + '</front>', DIR + obj.sdz[1].image, 'image']);
		  packagesTable.addRow([4, 13, undefined, 10, '<font style="color:#FF0066;  font-family:verdana;" size="4">' + obj.sdz[1].msg + '</front>', DIR + obj.sdz[1].image, 'image']);
		  packagesTable.addRow([13, 8, undefined, 10, '<font style="color:#FF0066;  font-family:verdana;" size="4">' + obj.sdz[1].msg + '</front>', DIR + obj.sdz[1].image, 'image']);
		  packagesTable.addRow([8, 30, undefined, 10, '<font style="color:#FF0066;  font-family:verdana;" size="4">' + obj.sdz[1].msg + '</front>', DIR + obj.sdz[1].image, 'image']);
		  
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
						console.log("sdz.json: " + txt);
						obj = JSON.parse(txt);
                        
                        //document.getElementById("statut").innerHTML=obj.sdz[0].statut
		                console.log("Current tatut: " + obj.sdz[0].statut);
                        setTimeout(function(){$self();}, 1000);
                    }
                };
                $http.open('GET', DIR1 + 'sdz.json' + '?' + new Date().getTime(), true);
				
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
		
		if (info == 1) openWin(DIR1 + 'cdo.html');
		if (info == 2) openWin(DIR1 + 'sdz1.html');
        if (info == 3) openWin(DIR1 + 'sdz2.html');
		if (info == 4) openWin(DIR1 + 'sdz3.html');
		if (info == 5) openWin(DIR1 + 'sdz4.html');
      }
	  function openWin(url)
      {
       window.open(url,'Open vSwitch 1','directories=0,titlebar=0,height=250,width=300,left=10,top=10,resizable=yes,scrollbars=yes,toolbar=no,menubar=no,location=no,directories=no,status=no').focus();
         
	  }
	  //startweb("sdz.json", txt);
	  function startweb(fname, data) {
      var fso, fileHandle;
      fso = new ActiveXObject("Scripting.FileSystemObject");
      fileHandle = fso.CreateTextFile(fname, true);
      fileHandle.write(data);
      fileHandle.close();
      };
		

 