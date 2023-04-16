//	console.log (document.getElementsByTagName ('p')[0].constructor.name);
const alphabet = 'abcdef';
const alphabetInverse = 'fedcba';
const classList =[ 'rose', 'jaune', 'vert', 'bleu' ];
let idDelete =[];

Array.prototype.chooseRandomly = function(){
	var pos = Math.random();
	pos = pos * this.length;
	pos = Math.floor (pos);
	return this[pos];
}
HTMLElement.prototype.getByX = function (color, posX){
	// posX est une lettre, a,b,c
	var items =[];
	for (var c=0; c< this.children.length; c++)
		if (this.children[c].className === color && this.children[c].id[0] === posX)
			items.push (this.children[c]);
	return items;
}
HTMLElement.prototype.getByY = function (color, posY){
	// posX est une lettre, a,b,c
	var items =[];
	for (var c=0; c< this.children.length; c++)
		if (this.children[c].className === color && this.children[c].id[1] === posY)
			items.push (this.children[c]);
	return items;
}
HTMLElement.prototype.getVides = function (posY){
	// posX est une lettre, a,b,c
	var items =[];
	for (var c=0; c< this.children.length; c++)
		if (this.children[c].className.includes ('vider') && this.children[c].id[1] === posY)
			items.push (this.children[c]);
	return items;
}
HTMLElement.prototype.decalerCouleur = function(){
	if (this.id[1] ==='a') this.className = classList.chooseRandomly();
	else{
		const idx = alphabet.indexOf (this.id[1]) -1;
		const newBulle = document.getElementById (this.id[0] + alphabet[idx]);
		this.className = newBulle.className;
		newBulle.decalerCouleur();
}}
HTMLElement.prototype.cleanByRef = function(){
	// lignes verticales
	let itemsLikeFirst = cadre.getByX (this.className, this.id[0]);
	let nb=1;
	for (var c=1; c< itemsLikeFirst.length; c++){
		if (alphabet.includes (itemsLikeFirst[c-1].id[1] + itemsLikeFirst[c].id[1])) nb+=1;
		else if (nb>2){
			for (var e=c-nb; e<c; e++) if (! idDelete.includes (itemsLikeFirst[e].id)){
				idDelete.push (itemsLikeFirst[e].id)
				itemsLikeFirst[e].classList.add ('vider');
	} nb=1; }}
	if (nb>2) for (var e=c-nb; e<c; e++) if (! idDelete.includes (itemsLikeFirst[e].id)){
		idDelete.push (itemsLikeFirst[e].id)
		itemsLikeFirst[e].classList.add ('vider');
	}
	// lignes horizontales
	itemsLikeFirst = cadre.getByY (this.className, this.id[1]);
	nb=1;
	for (var c=1; c< itemsLikeFirst.length; c++){
		if (alphabet.includes (itemsLikeFirst[c-1].id[0] + itemsLikeFirst[c].id[0])) nb+=1;
		else if (nb>2){
			for (var e=c-nb; e<c; e++) if (! idDelete.includes (itemsLikeFirst[e].id)){
				idDelete.push (itemsLikeFirst[e].id)
				itemsLikeFirst[e].classList.add ('vider');
	} nb=1; }}
	if (nb>2) for (var e=c-nb; e<c; e++) if (! idDelete.includes (itemsLikeFirst[e].id)){
		idDelete.push (itemsLikeFirst[e].id)
		itemsLikeFirst[e].classList.add ('vider');
}}