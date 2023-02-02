<?php
// dependences
include ('../../library-php/crossOrigin.php');
include ('../../library-php/database.class.php');
// connextion a la bdd et recuperer les infos de l'utilisateur
$charToEncode =[ ['=', 'xxx'], ['?', 'qqq'], ['&', 'ddd'] ];
$array =[
	'category'		=> $_GET['category'],
	'subcategory'	=> $_GET['subcategory'],
	'name'			=> $_GET['name'],
	'link'			=> $_GET['link'],
	'idus'			=> $_GET['idus']
];
foreach ($charToEncode as $charPair) $array['link'] = str_replace ($charPair[1], $charPair[0], $array['link']);
$id= intval ($_GET['id']);
// connextion a la bdd
$db= new database();
$result = $db->updateObjById ('links', $array, $id);
echo $result;
?>
