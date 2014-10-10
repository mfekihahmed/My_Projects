<?php 
$newdefense = $_GET['newdefense'];
$pieces = explode(",", $newdefense);

if (count($pieces)==2) { 
  $defenseN=$pieces[0];
  $vide=$pieces[1];

  $command='mkdir ' .$defenseN; 
  $output = shell_exec($command);
  $status=$output . "success";
}
else {
  $status="fail";
}
?>

<html>
 <head>
  <title>New Defense</title>
 </head>
 <body>
<p> <?php echo $status; ?></p>
 </body>
</html>

