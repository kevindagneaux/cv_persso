<?php 
/* ----------------------------- */
/*         Configuration BDD     */
/* ----------------------------- */


// local
$servername = "localhost";
$serv_username = "root";
$serv_password = "admin";  
$dbname = "cv_persso";


//OVH
// $servername = "plamsitexkbdplam.mysql.db";
// $serv_username = "plamsitexkbdplam";
// $serv_password = "Plam16Bdd";
// $dbname = "plamsitexkbdplam";


$mysqli = new mysqli($servername, $serv_username, $serv_password, $dbname) OR DIE ($mysqli->error);
?>