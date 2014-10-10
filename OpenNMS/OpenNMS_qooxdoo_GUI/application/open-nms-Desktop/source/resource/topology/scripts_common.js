/*
 * This file is part of Canviz. See http://www.canviz.org/
 * $Id: scripts_common.js 256 2009-01-08 11:14:07Z ryandesign.com $
 */
function click_opennms(opennms) {
	$('click_output').update('<h2>Open NMS Agent : </h2>"' + opennms + '"');
}

function click_cfcfs() {
	$('click_output').update('<h2>CFCFS Configuration : </h2><table border="1"> <tr> <td><span style="font-weight:bold;">Key</span></td> <td><span style="font-weight:bold;">Value</span></td> </tr><tr><td>Mac Address</td><td>00:11:11:11:11:01</td></tr><tr><td>IP address</td><td>172.16.0.15/16</td></tr><tr><td>Opem NMS Allocated vPort</td><td>dp1-br1</td></tr><tr><td>Manufacturer</td><td>Ubuntu 12.04 LTS</td></tr></table>');
}
function click_hss1() {
	$('click_output').update('<h2>HSS1 Configuration : </h2><table border="1"> <tr> <td><span style="font-weight:bold;">Key</span></td> <td><span style="font-weight:bold;">Value</span></td> </tr><tr><td>Mac Address</td><td>00:11:11:11:11:01</td></tr><tr><td>IP address</td><td>172.16.0.16/16</td></tr><tr><td>Opem NMS Allocated vPort</td><td>dp1-br2</td></tr><tr><td>Manufacturer</td><td>Ubuntu 12.04 LTS</td></tr></table>');
}
function click_hss2() {
	$('click_output').update('<h2>HSS2 Configuration : </h2><table border="1"> <tr> <td><span style="font-weight:bold;">Key</span></td> <td><span style="font-weight:bold;">Value</span></td> </tr><tr><td>Mac Address</td><td>00:11:11:11:11:01</td></tr><tr><td>IP address</td><td>172.16.0.16/16</td></tr><tr><td>Opem NMS Allocated vPort</td><td>dp1-br2</td></tr><tr><td>Manufacturer</td><td>Ubuntu 12.04 LTS</td></tr></table>');
}
function click_hss3() {
	$('click_output').update('<h2>HSS3 Configuration : </h2><table border="1"> <tr> <td><span style="font-weight:bold;">Key</span></td> <td><span style="font-weight:bold;">Value</span></td> </tr><tr><td>Mac Address</td><td>00:11:11:11:11:01</td></tr><tr><td>IP address</td><td>172.16.0.16/16</td></tr><tr><td>Opem NMS Allocated vPort</td><td>dp1-br2</td></tr><tr><td>Manufacturer</td><td>Ubuntu 12.04 LTS</td></tr></table>');
}
function click_hss4() {
	$('click_output').update('<h2>HSS4 Configuration : </h2><table border="1"> <tr> <td><span style="font-weight:bold;">Key</span></td> <td><span style="font-weight:bold;">Value</span></td> </tr><tr><td>Mac Address</td><td>00:11:11:11:11:01</td></tr><tr><td>IP address</td><td>172.16.0.16/16</td></tr><tr><td>Opem NMS Allocated vPort</td><td>dp1-br2</td></tr><tr><td>Manufacturer</td><td>Ubuntu 12.04 LTS</td></tr></table>');
}
function click_hss5() {
	$('click_output').update('<h2>HSS5 Configuration : </h2><table border="1"> <tr> <td><span style="font-weight:bold;">Key</span></td> <td><span style="font-weight:bold;">Value</span></td> </tr><tr><td>Mac Address</td><td>00:11:11:11:11:01</td></tr><tr><td>IP address</td><td>172.16.0.16/16</td></tr><tr><td>Opem NMS Allocated vPort</td><td>dp1-br2</td></tr><tr><td>Manufacturer</td><td>Ubuntu 12.04 LTS</td></tr></table>');
}
function click_hss6() {
	$('click_output').update('<h2>HSS6 Configuration : </h2><table border="1"> <tr> <td><span style="font-weight:bold;">Key</span></td> <td><span style="font-weight:bold;">Value</span></td> </tr><tr><td>Mac Address</td><td>00:11:11:11:11:01</td></tr><tr><td>IP address</td><td>172.16.0.16/16</td></tr><tr><td>Opem NMS Allocated vPort</td><td>dp1-br2</td></tr><tr><td>Manufacturer</td><td>Ubuntu 12.04 LTS</td></tr></table>');
}

function click_ovs9() {
	$('click_output').update('<h2>OpenVswitch 9 Configuration : </h2><table border="1"> <tr> <td><span style="font-weight:bold;">Key</span></td> <td><span style="font-weight:bold;">Value</span></td> </tr><tr><td>Resource Type</td><td>Open vSwitch</td></tr><tr><td>manufacturerDescription</td><td>Ericsson, PqDp</td></tr><tr><td>Open Flow version</td><td>1.3</td></tr><tr><td>datapath ID</td><td>000000000011</td></tr><tr><td>maxFlowperTable</td><td>1024</td></tr><tr><td>Ports</td><td>dp1-br0, dp1-br1, dp1-br2, dp1-br3, dp1-br4</td></tr></table>');
}
function click_ovs10() {
	$('click_output').update('<h2>OpenVswitch 10 Configuration : </h2><table border="1"> <tr> <td><span style="font-weight:bold;">Key</span></td> <td><span style="font-weight:bold;">Value</span></td> </tr><tr><td>Resource Type</td><td>Open vSwitch</td></tr><tr><td>manufacturerDescription</td><td>Ericsson, PqDp</td></tr><tr><td>Open Flow version</td><td>1.3</td></tr><tr><td>datapath ID</td><td>000000000012</td></tr><tr><td>maxFlowperTable</td><td>1024</td></tr><tr><td>Ports</td><td>dp2-br0, dp2-br1, dp2-br2, dp2-br3, dp2-br4</td></tr></table>');
}
function click_ovs11() {
	$('click_output').update('<h2>OpenVswitch 11 Configuration : </h2><table border="1"> <tr> <td><span style="font-weight:bold;">Key</span></td> <td><span style="font-weight:bold;">Value</span></td> </tr><tr><td>Resource Type</td><td>Open vSwitch</td></tr><tr><td>manufacturerDescription</td><td>Ericsson, PqDp</td></tr><tr><td>Open Flow version</td><td>1.3</td></tr><tr><td>datapath ID</td><td>000000000013</td></tr><tr><td>maxFlowperTable</td><td>1024</td></tr><tr><td>Ports</td><td>dp3-br0, dp3-br1, dp3-br2, dp3-br3, dp3-br4</td></tr></table>');
}
function click_legend() {
	$('click_output').update('<h2>Legend Table :</h2><table border="1"><tr><td><span style="font-weight:bold;"> Line/Color</span></td><td><span style="font-weight:bold;"> Signification</span></td></tr><tr><td><hr style="width: 75%; background:#32CD32; height: 5px;"> </td><td>Up Link</td></tr><tr><td><hr style="width: 75%; background:#DCDCDC; height: 5px;"> </td><td>Downed Link</td></tr><tr><td><hr style="width: 75%; background:#00008B; height: 5px;"> </td><td>[1-2] Mbps</td></tr><tr><td><hr style="width: 75%; background:#FF0000; height: 5px;"> </td><td>> 2 Mbps</td></tr><tr><td><hr style="width: 75%; background:#00008B; height: 1px;"> </td><td>[100-1000] Kbps</td></tr><tr><td><hr style="width: 75%; border: 1px dotted #32CD32; height: 1px"></td><td>&lt 5 Kbps</td></tr><tr><td><hr style="width: 75%; border: 1px dotted #00008B; height: 1px"></td><td>[5-10] Kbps</td></tr><tr><td>NoFlow</h4></td><td>No Flow Between Network Node</td></tr><tr><td>Permitted</h4></td><td>Open NMS Permitted Flow</td></tr><tr><td>Denied</h4></td><td>Open NMS Denied Flow</td></tr><tr><td><hr style="width: 75%; background:#228B22; height: 5px;"> </td><td>Permitted Open NMS FLow</td></tr><tr><td><hr style="width: 75%; background:#FF0000; height: 5px;"> </td><td>Denied Open NMS FLow</td></tr></table><h2></h2>');
}
function click_slice1() {
	$('click_output').update('<h2>Open NMS Tenant Zone 1 Configuration : </h2><table border="1"> <tr> <td><span style="font-weight:bold;">Key</span></td> <td><span style="font-weight:bold;">Value</span></td> </tr><tr><td>Resource Type</td><td>Open NMS Slice</td></tr><tr><td>manufacturerDescription</td><td>Ericsson, Synchromedia</td></tr><tr><td>Open Flow version</td><td>1.3</td></tr><tr><td>datapath ID</td><td>0000000000c9</td></tr><tr><td>Allocated vTables</td><td>1</td></tr><tr><td>Allocated vPorts</td><td>dp1-br1, dp1-br2</td></tr><tr><td>Shared vTables</td><td>54</td></tr><tr><td>Shared vPorts</td><td>1</td></tr></table>');
}
function click_slice2() {
	$('click_output').update('<h2>Open NMS Tenant Zone 2 Configuration : </h2><table border="1"> <tr> <td><span style="font-weight:bold;">Key</span></td> <td><span style="font-weight:bold;">Value</span></td> </tr><tr><td>Resource Type</td><td>Open NMS Slice</td></tr><tr><td>manufacturerDescription</td><td>Ericsson, Synchromedia</td></tr><tr><td>Open Flow version</td><td>1.3</td></tr><tr><td>datapath ID</td><td>0000000000c9</td></tr><tr><td>Allocated vTables</td><td>1</td></tr><tr><td>Allocated vPorts</td><td>dp1-br1, dp1-br2</td></tr><tr><td>Shared vTables</td><td>54</td></tr><tr><td>Shared vPorts</td><td>1</td></tr></table>');
}

function click_slice3() {
	$('click_output').update('<h2>Open NMS Tenant Zone 3 Configuration : </h2><table border="1"> <tr> <td><span style="font-weight:bold;">Key</span></td> <td><span style="font-weight:bold;">Value</span></td> </tr><tr><td>Resource Type</td><td>Open NMS Slice</td></tr><tr><td>manufacturerDescription</td><td>Ericsson, Synchromedia</td></tr><tr><td>Open Flow version</td><td>1.3</td></tr><tr><td>datapath ID</td><td>0000000000c9</td></tr><tr><td>Allocated vTables</td><td>1</td></tr><tr><td>Allocated vPorts</td><td>dp1-br1, dp1-br2</td></tr><tr><td>Shared vTables</td><td>54</td></tr><tr><td>Shared vPorts</td><td>1</td></tr></table>');
}
function click_slice4() {
	$('click_output').update('<h2>Open NMS Tenant Zone 4 Configuration : </h2><table border="1"> <tr> <td><span style="font-weight:bold;">Key</span></td> <td><span style="font-weight:bold;">Value</span></td> </tr><tr><td>Resource Type</td><td>Open NMS Slice</td></tr><tr><td>manufacturerDescription</td><td>Ericsson, Synchromedia</td></tr><tr><td>Open Flow version</td><td>1.3</td></tr><tr><td>datapath ID</td><td>0000000000c9</td></tr><tr><td>Allocated vTables</td><td>1</td></tr><tr><td>Allocated vPorts</td><td>dp1-br1, dp1-br2</td></tr><tr><td>Shared vTables</td><td>54</td></tr><tr><td>Shared vPorts</td><td>1</td></tr></table>');
}
function click_slice5() {
	$('click_output').update('<h2>Open NMS Tenant Zone 5 Configuration : </h2><table border="1"> <tr> <td><span style="font-weight:bold;">Key</span></td> <td><span style="font-weight:bold;">Value</span></td> </tr><tr><td>Resource Type</td><td>Open NMS Slice</td></tr><tr><td>manufacturerDescription</td><td>Ericsson, Synchromedia</td></tr><tr><td>Open Flow version</td><td>1.3</td></tr><tr><td>datapath ID</td><td>0000000000c9</td></tr><tr><td>Allocated vTables</td><td>1</td></tr><tr><td>Allocated vPorts</td><td>dp1-br1, dp1-br2</td></tr><tr><td>Shared vTables</td><td>54</td></tr><tr><td>Shared vPorts</td><td>1</td></tr></table>');
}
function click_node(node) {
	$('click_output').update('<h2>Open NMS Agent : </h2>' + node + '');
if (node == "CFCFS") {click_cfcfs();}
if (node == "HSS1") {click_hss1();}
if (node == "HSS2") {click_hss2();}
if (node == "HSS3") {click_hss3();}
if (node == "HSS4") {click_hss4();}
if (node == "HSS5") {click_hss5();}
if (node == "HSS6") {click_hss6();}
if (node == "0x11") {click_ovs9();}
if (node == "0x12") {click_ovs10();}
if (node == "0x13") {click_ovs11();}
if (node == "Legend") {click_legend();}
if (node == "1") {click_slice1();}
if (node == "2") {click_slice2();}
if (node == "3") {click_slice3();}
if (node == "4") {click_slice4();}
if (node == "5") {click_slice5();}
}
function click_edge(edge) {
	$('click_output').update('Edge Updated "' + edge + '"');
	var xmlhttp;
	if (window.XMLHttpRequest)
	  {// code for IE7+, Firefox, Chrome, Opera, Safari
	  xmlhttp=new XMLHttpRequest();
	  }
	else
	  {// code for IE6, IE5
	  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	  }


        xmlhttp.onreadystatechange=function()
 	  {
	  if (xmlhttp.readyState==4 && xmlhttp.status==200)
	    {
	    $('click_response').update(xmlhttp.responseText);
	    }
	  }


        //xmlhttp.open("GET","topology_edge.php?edge="+edge,true);
        //xmlhttp.send();
	xmlhttp.open("POST","topology_edge.php",true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send("edge="+edge);




}

//setTimeout(function(){
setInterval(function(){
$('click_response').update("");
//this should be generated in timely manner.  dot graph.gv -Txdot -ograph-xdot.gv
canviz.load('graph-xdot.gv');
}, 5000);
