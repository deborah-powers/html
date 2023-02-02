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
$db= new database();
$result = $db->postObj ('links', $array);
// nettoyer la bdd
$trash = $db->fromRequest ("delete from links where id in (select id from (select id from links where category is null or category in ('', ' ')) as emptiesRows);");
echo $result;
?>