/* pas de alert
document fait référence à la popup
*/
function newText(){
	document.getElementsByTagName ('p')[0].innerHTML = 'un nouveau texte';
}
document.getElementsByTagName ('button')[0].addEventListener ('click', newText);
