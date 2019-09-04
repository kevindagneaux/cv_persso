<?php

include_once "config.php";

function debug($var, $mode = 1) {

    echo '<div style="background: #ff0000; padding: 5px; float: right; clear: both; ">';
  
    $trace = debug_backtrace();
  
    $trace = array_shift($trace);
  
    echo 'debug demandé dans le fichier : ' . $trace['file'] . ' à la ligne ' . $trace['line'] . '.<hr>';
  
    if ($mode == 1) {
  
      echo '<pre>';
      print_r($var);
      echo '</pre>';
  
    } else {
  
      echo '<pre>';
      var_dump($var);
      echo '</pre>';
  
    }
  
    echo '</div>';
  
  }


function executeRequete($req) {
    global $mysqli;
    $resultat = $mysqli->query($req);
    if (!$resultat) {
      die('Erreur sur la requete sql.<br />Message : ' . $mysqli->error . "<br />Code :" . $req . "");
    }
    return $resultat; 
  }

?>