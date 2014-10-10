/*
 * This file is part of Canviz. See http://www.canviz.org/
 * $Id: scripts_common.js 256 2009-01-08 11:14:07Z ryandesign.com $
 */
function click_opennms(opennms) {
	$('click_output').update('Open NMS Agent : "' + opennms + '"');
}

function click_node(node) {
	$('click_output').update('Node Updated "' + node + '"');
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
