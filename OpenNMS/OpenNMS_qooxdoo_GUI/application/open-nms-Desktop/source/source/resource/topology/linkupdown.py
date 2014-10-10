import os
import subprocess
import StringIO

import sys

import zmq
import json 
import demjson    #sudo easy_install demjson  #handles unquoted keys while decoding

import time

dpid_socketfile={}
#dpid_socketfile["0x1"]="unix:/tmp/scx1"
#dpid_socketfile["0xb"]="unix:/tmp/scx11"
#dpid_socketfile["0x15"]="unix:/tmp/scx21"
#dpid_socketfile["0x1f"]="unix:/tmp/nwi31"
#dpid_socketfile["0x65"]="unix:/tmp/scx101"
#dpid_socketfile["0x6f"]="unix:/tmp/scx111"
#dpid_socketfile["0x79"]="unix:/tmp/scx121"
#dpid_socketfile["0x83"]="unix:/tmp/nwi131"
#dpid_socketfile["0xc9"]="unix:/tmp/h201"
#dpid_socketfile["0xd3"]="unix:/tmp/h211"
#dpid_socketfile["0xdf"]="unix:/tmp/h223"
f=open('dpid_socketfile.txt','r')   #each line as:   0x1=unix:/tmp/scx1           or          0x1=tcp:switchhostip:switchport
for line in f.readlines():
   dpid_socket=line.strip("\n").split("=")
   #print dpid_socket[0], dpid_socket[1]
   dpid_socketfile[dpid_socket[0]] = dpid_socket[1]



def macaddr_port_desc(dpid,port):
      port_desc_command="%s%s%s" % ("dpctl ",dpid_socketfile[dpid]," port-desc")
      stat_reply=execute_command(port_desc_command)   #stat_reply="{type:\"port-desc\", flags:\"0x0\"{no="1", hw_addr="42:57:b3:e4:75:b8",..},{no="2", hw_addr="e2:5e:69:41:33:ec",..}}}"
      if stat_reply!="":
          #rcv=json.loads(stat_reply)     #json module cant handle unquoted keys, strict format
          # repair::
          stat_reply=stat_reply.replace("flags:\"0x0\"{","flags:\"0x0\",ports:[{")
          stat_reply=stat_reply.replace("}}}","}]}")   #stat_reply="{type:\"port-desc\", flags:\"0x0\",ports:[{no="1", hw_addr="42:57:b3:e4:75:b8",..},{no="2", hw_addr="e2:5e:69:41:33:ec",..}]}"
          #print stat_reply 
          stat=demjson.decode(stat_reply)
          for portstat in stat["ports"]:
              if port==portstat["no"]:
                   return portstat["hw_addr"]

      return ""

'''

SENDING:
stat_req{type="port-desc", flags="0x0"}


RECEIVED:
stat_repl{type="port-desc", flags="0x0"{no="1", hw_addr="42:57:b3:e4:75:b8", name="h201-eth1", config="0x0", state="0x4", curr="0x840", adv="0x0", supp="0x0", peer="0x0", curr_spd="10485760kbps", max_spd="0kbps"}, {no="2", hw_addr="e2:5e:69:41:33:ec", name="h201-eth2", config="0x0", state="0x4", curr="0x840", adv="0x0", supp="0x0", peer="0x0", curr_spd="10485760kbps", max_spd="0kbps"}, {no="3", hw_addr="a2:78:4f:d9:7c:5c", name="h201-eth3", config="0x0", state="0x4", curr="0x840", adv="0x0", supp="0x0", peer="0x0", curr_spd="10485760kbps", max_spd="0kbps"}, {no="local", hw_addr="00:00:00:00:00:c9", name="tap:", config="0x0", state="0x4", curr="0x802", adv="0x0", supp="0x0", peer="0x0", curr_spd="10240kbps", max_spd="0kbps"}}}

'''

def execute_command(command):
      #os.system(command)
      
      #proc = subprocess.Popen(["cat", "/etc/services"], stdout=subprocess.PIPE, shell=True)
      #(output, err) = proc.communicate()
      try:
          output = subprocess.check_output(command, shell=True)  # error check TODO
          buf = StringIO.StringIO(output)

          linecount=1
          for line in buf.readlines():
               if linecount==7 and line[:9]=="stat_repl":
                    return line[9:].strip("\n").replace('=',':')
               linecount+=1

          return ""
      except subprocess.CalledProcessError,e:
          #print "stdout output:\n", e.output
          #pass
          return ""



#srcdpid="0xc9"
#srcport="1"
#dstdpid="0x1"
#dstport="2"
#todo="down"

#if len(sys.argv)<6:
#   return -1

#else :
#   argv=str(sys.argv)

srcdpid=sys.argv[1]
srcport=sys.argv[2]
dstdpid=sys.argv[3]
dstport=sys.argv[4]
todo=sys.argv[5]

#down:: dpctl unix:/tmp/h201 port-mod port=1,addr=42:57:b3:e4:75:b8,conf=0x1,mask=0xffffffff
#up ::  dpctl unix:/tmp/h201 port-mod port=1,addr=42:57:b3:e4:75:b8,conf=0x0,mask=0xffffffff

if todo=="up":
  conf_val="0x0"
elif todo=="down":
  conf_val="0x1"

s_macaddr=macaddr_port_desc(srcdpid,srcport)
d_macaddr=macaddr_port_desc(dstdpid,dstport)
print s_macaddr;
print d_macaddr;

if s_macaddr!="" and d_macaddr!="" :
   command="%s%s%s%s%s%s%s%s%s" % ("dpctl ",dpid_socketfile[srcdpid]," port-mod port=",srcport,",addr=",s_macaddr,",conf=",conf_val,",mask=0xffffffff")
   stat_reply=execute_command(command)

   command="%s%s%s%s%s%s%s%s%s" % ("dpctl ",dpid_socketfile[dstdpid]," port-mod port=",dstport,",addr=",d_macaddr,",conf=",conf_val,",mask=0xffffffff")
   stat_reply=execute_command(command)
   print "ok"

else:
   print "err"
