<?php
// dependences
include ('../../library-php/crossOrigin.php');
include ('../../library-php/database.class.php');
// recuperer l'id de l'utilisateur
$rawData = file_get_contents ('php://input');
// recuperer les categories de la table table links
$request = "SELECT DISTINCT category FROM links";
$db= new database();
$result = $db->fromRequest ($request);
$resultList =[];
foreach ($result as $category){
  $resultList[] = $category['category'];
}
echo json_encode ($resultList);
?>
