<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: POST');
include ('../../../site-dp/library-php/database.class.php');

$array =[
	'id'		=> $_POST['id'],
	'message'	=> $_POST['message'],
];
$db= new database();
$result = $db->postObj ('message', $array);
echo $result;
?>