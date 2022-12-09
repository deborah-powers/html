const svgNs = 'http://www.w3.org/2000/svg';
const xlinkNs = 'http://www.w3.org/1999/xlink';
var svg = document.getElementsByTagName ('svg')[0];

const couleurs =[ 'vert', 'rose', 'bleu', 'orange' ];
var positions =[
	[ 'rose', 'bleu', 'bleu', 'vert' ],
	[ 'rose', 'orange', 'rose', 'bleu' ],
	[ 'vert', 'bleu', 'orange', 'vert' ],
	[ 'vide', 'bleu', 'bleu', 'vert' ],
];
function creer (posX){
	var bulle = document.createElementNS (svgNs, 'circle');
	bulle.addEventListener ('click', detruire)
	// couleur de la bulle
	const colid = Math.floor (Math.random() *4);
	const couleur = couleurs [colid];
	bulle.setAttribute ('class', couleur);
	// position de la bulle
	bulle.setAttribute ('cy', '20');
	bulle.setAttributeNb ('cx', posX);
	svg.appendChild (bulle);
}
function bouger(){
	var bulles = document.getElementsByTagName ('circle');
	var posy =0;
	for (var b=0; b< bulles.length; b++){
		posy = bulles[b].getAttributeNb ('cy');
		posy +=40;
		if (posy >160) bulles[b].parentElement.removeChild (bulles[b]);
		else bulles[b].setAttributeNb ('cy', posy);
	}
	creer (60); creer (100);
	creer (140); creer (180);
}
function detruire (event){
	console.log (event.target);
	event.target.parentElement.removeChild (event.target);
}
SVGGraphicsElement.prototype.getAttribute = function (name){
	var attribute = this.getAttributeNS (null, name);
	if (! attribute || attribute == undefined){
		var styles = window.getComputedStyle (this, null);
		attribute = styles[name];
	}
	if (! attribute || attribute == undefined) attribute = null;
	return attribute;
}
SVGGraphicsElement.prototype.getAttributeNb = function (name){
	var attributeStr = this.getAttribute (name);
	return parseInt (attributeStr);
}
SVGGraphicsElement.prototype.setAttributeNb = function (name, value){ this.setAttributeNS (null, name, value.toString()); }
SVGGraphicsElement.prototype.setAttribute = function (name, value){ this.setAttributeNS (null, name, value); }
