<?php 
$vmslice = $_GET["vmslice"];
$pieces = explode(",", $vmslice);
$status="fail";
echo $status;
if (count($pieces)==2) { 
  $vm=$pieces[0];
  $slice=$pieces[1];

  $status="success";
  echo $status;
}
else {
  $status="fail";
}
?>

