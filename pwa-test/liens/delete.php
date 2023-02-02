<?php
include ('../../library-php/crossOrigin.php');
include ('../../library-php/database.class.php');
// recuperer les infos de l'utilisateur
$id= intval ($_GET['id']);
// connextion a la bdd
$db= new database();
$result = $db->deleteObjById ('links', $id);
echo json_encode ($result);
?>