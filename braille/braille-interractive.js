function writeBraille(){
	var word = document.getElementsByTagName ('input')[0].value;
	container.innerHTML ="";
	for (var l=0; l< word.length; l++){
		var letter = document.createElement ('b-letter');
		letter.setAttribute ('letter', word[l]);
		letter.connectedCallback();
		container.appendChild (letter);
}}
function randomLetter(){
	const letters = 'abcdefghijklmnopqrstuvwxyz';
	var pos = letters.length * Math.random();
	pos = Math.floor (pos);
	return letters[pos];
}
function devine (parent){
	if (parent.children[1].letter === parent.children[2].value) parent.children[4].innerHTML = 'bien trouvé !';
	else parent.children[4].innerHTML = 'erreur, vous vous êtes trompé de lettre';
	parent.children[2].value ="";
	parent.children[1].setAttribute ('letter', randomLetter());
}
// code pris sur https://www.w3schools.com/html/html5_draganddrop.asp
function allowDrop (evt){ evt.preventDefault(); }
function drag (evt){
	evt.target.parentElement.className ="";
	evt.dataTransfer.setData ('idBraille', evt.target.id);
}
function drop (evt){
	evt.preventDefault();
	var idBraille = evt.dataTransfer.getData ('idBraille');
	var letter = document.getElementById (idBraille);
	if ('HTMLParagraphElement' === evt.target.constructor.name && evt.target.innerText === letter.letter.toUpperCase()){
		evt.target.className = 'ok';
		evt.target.appendChild (letter);
	}
	else if ('HTMLParagraphElement' === evt.target.constructor.name){
		evt.target.className = 'ko';
		evt.target.appendChild (letter);
	//	openPopup ('les lettres ne correspondent pas', 'mauvaise attribution')
	}
	else evt.target.appendChild (letter);
}