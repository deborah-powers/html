/* pas de alert
document fait référence à la popup
*/
var textA = 'le premier texte';
var textB = 'un nouveau texte';
function newText(){
	if (document.getElementsByTagName ('p')[0].innerHTML == textA) document.getElementsByTagName ('p')[0].innerHTML = textB;
	else document.getElementsByTagName ('p')[0].innerHTML = textA;
}
document.getElementsByTagName ('button')[0].addEventListener ('click', newText);

// ouvrir les liens de la popup, en chrome
function openLink (event){ window.open (event.target.getAttribute ('href')); }
var linkList = document.getElementsByTagName ('a');
for (var l=0; l< linkList.length; l++){
	linkList[l].addEventListener ('click', openLink);
}


