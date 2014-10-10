< ?php
    //
    $file = "opennms.txt";
    $f = fopen($file, "r");
    while ( $line = fgets($f, 2) ) {
    print $line;
    }
?>