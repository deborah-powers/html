/* pas de alert
document fait référence à la popup
*/
var fileJson = 'links-perso.json';

document.body.init();
debbyPlay.optionList =[];
debbyPlay.dataList =[];
debbyPlay.jsonList ={};
const linkRef ={
	"name": "",
	"link": "",
	"username": "",
	"email": "",
	"password": "",
	"infos": ""
};
function openLink (event){ window.open (event.target.getAttribute ('href')); }
function chooseOption (option){
	debbyPlay.dataList =[];
	debbyPlay.dataList = debbyPlay.jsonList [option];
	document.body.load();
	showSelectionTitle (document.getElementsByTagName('selection')[0], option);
	// ouvrir les liens de la popup, en chrome
	var linkList = document.getElementsByTagName ('a');
	for (var l=0; l< linkList.length; l++) linkList[l].addEventListener ('click', openLink);
}
// récupérer les données
debbyPlay.jsonList = useJson (fileJson);
// les noms des catégories
for (var j in debbyPlay.jsonList) if (debbyPlay.jsonList.hasOwnProperty (j)){
	console.log (j, debbyPlay.jsonList[j]);
	debbyPlay.optionList.push (j);
	for (var k=0; k< debbyPlay.jsonList[j].length; k++) debbyPlay.jsonList[j][k].fill (linkRef);
}
debbyPlay.optionList.sort();
// la première option choisie
var pos = debbyPlay.optionList.indexOf ('important');
debbyPlay.optionList.splice (pos, 1);
debbyPlay.optionList.unshift ('important');
chooseOption ('important');