<?php 
$edge = $_POST['edge'];
//"0x1f" -- "0x15"
//0x1f,3,0xb,4,up/down

$pieces = explode(",", $edge);
/*
$srcdpid="0xc9";
$srcport="1";
$dstdpid="0x1";
$dstport="2";
$todo="down";
*/

$file = 'test.txt';

if (count($pieces)==5) { 
$srcdpid=$pieces[0];
$srcport=$pieces[1];
$dstdpid=$pieces[2];
$dstport=$pieces[3];
$todo=$pieces[4];

//$command='sudo python linkupdown.py "' . $srcdpid . '" "' .$srcport.'" "'. $dstdpid .'" "'. $dstport .'" "'. $todo.'"'; // error.log shows notty and askme program for sudo
//$command='echo computer | sudo -S python linkupdown.py "' . $srcdpid . '" "' .$srcport.'" "'. $dstdpid .'" "'. $dstport .'" "'. $todo.'"'; //computer is not password for www-data
//visudo : www-data ALL=NOPASSWD: /var/www/topology/linkupdown.py	is also not working for sudo ./linkupdown.py

//finally works for : chmod u+s /usr/local/bin/dpctl    .. as linkupdown.py only needs sudo access to dpctl
$command='python linkupdown.py "' . $srcdpid . '" "' .$srcport.'" "'. $dstdpid .'" "'. $dstport .'" "'. $todo.'"'; //sudo dpctl needed. setuid on dpctl

$output = shell_exec($command);

file_put_contents($file, "\nedge: " . $edge . " output: ". $output, FILE_APPEND | LOCK_EX);

$status="success";
}
else {
$status="fail";
file_put_contents($file, "\nedge: " . $edge . " status:fail ", FILE_APPEND | LOCK_EX);
}
?>

<html>
 <head>
  <title>PHP Test</title>
 </head>
 <body>
<p> <?php echo $edge ."ed ". $status; ?></p>
 </body>
</html>

