//
//  Hello World client in C++
//  Connects REQ socket to tcp://localhost:5555
//  Sends "Hello" to server, expects "World" back
//
#include <zmq.hpp>
#include <string>
#include <iostream>

int main ()
{
    //  Prepare our context and socket
    zmq::context_t context (1);
    zmq::socket_t socket (context, ZMQ_REQ);

    std::cout << "Connecting to hello world server…" << std::endl;
    socket.connect ("tcp://localhost:5555");
    //create json object
	
	char webjson[250]=""; //for zmq
    char ethAddrSrc[40]="10.21.100.33";
	char ethAddrDst[40]="10.21.100.34";
	char img="redmsg.png";
	bool verifEthSrc = true;
	bool permitted = true;
	if (verifEthSrc == true) {
    //snprintf(ethAddr, 40, "%02x:%02x:%02x:%02x:%02x:%02x", eth_src[0], eth_src[1], eth_src[2], eth_src[3], eth_src[4], eth_src[5]);
    //printf("> slice allowed ethAddr: %s \n", strdup(ethAddr));
	if (permitted == true) {img="greenmsg.png";}
    //sprintf (webjson, "{\"type\":\"node_up\",\"node\":\"0x%"PRIx64"\"}",dpj.dpid.as_host());
	sprintf (webjson, "{\"opennms\":[{\"statut\":\"on\",\"flow\":\"yes\",\"from\":%s,\"to\":%s,\"msg\":\"permitted Flow\",\"image\":%s}]}",ethAddrSrc, ethAddrDst, img);
	printf("> webjson: %s \n", webjson);
    printf("> webjson lenght: %d \n", strlen(webjson));

    
    
	
    //  Do 10 requests, waiting each time for a response
    //for (int request_nbr = 0; request_nbr != 10; request_nbr++) {
        //VLOG_DBG(log,"webjson %s",webjson);
        zmq::message_t request (strlen(webjson));
        memcpy ((void *) request.data (), webjson, strlen(webjson) );
        std::cout << "Sending : " << std::endl;
        socket.send (request);

        //  Get the reply.
        zmq::message_t reply;
        socket.recv (&reply);
        std::cout << "Received : " << std::endl;
    //endfor
	}//fin verif ==true
    return 0;
}