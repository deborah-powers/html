<?php
// dependences
include ('../../library-php/crossOrigin.php');
include ('../../library-php/database.class.php');
include ('../../library-php/functions.php');
// recuperer les infos de l'utilisateur
$choice = $_GET['choice'];
$userId = $_GET['user'];
// connextion a la bdd
$db= new database();
// recuperer les lens
$array =[ 'category' => $choice, 'idus' =>0 ];
$listLink = $db->getList ('links', $array);
if ($userId >0){
	$array['idus'] = $userId;
	$listLinkBis = $db->getList ('links', $array);
	$listLink = array_merge($listLink, $listLinkBis);
}
// cas special, les liens doivent etre regroupes en sous-categorie
$categories =[ 'jeux', 'musique' ];
// $categories =[ 'culture', 'films', 'youtubers', 'fanfics', 'humour', 'arts', 'programmation', 'moi', 'utiles', 'divers' ];
$toCategorise = in_array ($choice, $categories);
if (! $toCategorise && count ($listLink) >0){
	// rechercher les categories
	$request = "SELECT DISTINCT subcategory FROM links WHERE category = '$choice'";
	$result = $db->fromRequest ($request);
	$listCategories =[];
	foreach ($result as $subCategory){
		$subC = $subCategory['subcategory'];
		$listCategories[$subC] =[
			'title' => $subC,
			'links' =>[]
		];
	}
	// placer les liens dans la sous-categorie correspondante
	foreach ($listLink as $link){
		$linkC = $link['subcategory'];
		$listCategories [$linkC]['links'][] = $link;
	}
	// creer la liste finale
	$listLink =[];
	foreach ($listCategories as $value)
		if (sizeof ($value['links']) >0) $listLink[] = $value;
}
echo json_encode ($listLink);
?>
