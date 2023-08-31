/*
script pour animer un cube en svg.
le cube à des cotés de 100 unités.

coté = 100
diag = coté * r(2)
r(2) = 1.4142135623730951 = Math.sqrt(2)

position des points
5,6 ___ 3,4
|         |
|         |
|         |
1,2 ___ 0,0
*/
const cote =100;
const diag = cote * Math.sqrt(2);
const diagDemi = diag /2;
const retrait =150;
var animationNbSec =0;

// animation, faire tourner le cube comme un manège
var pasGauche = (diag - cote) /60;
var pasDroit = (diagDemi + cote) /60;


SVGCircleElement.prototype.setPos = function (posX, posY){
	this.setAttributeNb ('cx', posX);
	this.setAttributeNb ('cy', posY);
}
SVGCircleElement.prototype.moveX = function (pos){
	pos = pos + this.getAttributeFloat ('cx');
	this.setAttributeNb ('cx', pos);
}
SVGCircleElement.prototype.moveY = function (pos){
	pos = pos + this.getAttributeFloat ('cy');
	this.setAttributeNb ('cy', pos);
}
SVGCircleElement.prototype.moveAll = function (posX, posY){
	posX = posX + this.getAttributeFloat ('cx');
	this.setAttributeNb ('cx', posX);
	posY = posY + this.getAttributeFloat ('cy');
	this.setAttributeNb ('cy', posY);
}
const cubes = document.getElementsByTagName ('circle');

function posOneVisibleFaceAnimateX(){
	animationNbSec +=1;
	cubes[3].moveX (pasGauche);
	cubes[5].moveX (pasGauche);
	cubes[4].moveX (pasDroit);
	cubes[6].moveX (pasDroit);
	if (animationNbSec <60) requestAnimationFrame (posOneVisibleFaceAnimateX);
}
function posOneVisibleFaceAnimateY(){
	animationNbSec +=1;
	cubes[1].moveY (pasGauche);
	cubes[5].moveY (pasGauche);
	cubes[2].moveY (pasDroit);
	cubes[6].moveY (pasDroit);
	if (animationNbSec <60) requestAnimationFrame (posOneVisibleFaceAnimateY);
}
function posOneVisibleFace (sens='x'){
	/* position de départ, une face visible
	5,6 ___ 1,2		5 ______ 1,2 _____ 6
	|         |		|         |         |
	|         |	-->	|         |         |
	|         |	-->	|         |         |
	3,4 _____ 0		3 _______ 0 _______ 4
	*/
	cubes[0].setPos (retrait, retrait);
	cubes[1].setPos (retrait, retrait - cote);
	cubes[2].setPos (retrait, retrait - cote);
	cubes[3].setPos (retrait - cote, retrait);
	cubes[4].setPos (retrait - cote, retrait);
	cubes[5].setPos (retrait - cote, retrait - cote);
	cubes[6].setPos (retrait - cote, retrait - cote);
	pasGauche = (diag - cote) /60;
	pasDroit = (diagDemi + cote) /60;
	animationNbSec =0;
	if (sens ==='x') posOneVisibleFaceAnimateX();
	else posOneVisibleFaceAnimateY();
}
function posTwoVisibleFaceHorizontal(){
	/* position de départ, deux faces visibles
	5 ______ 1,2 _____ 6
	|         |         |
	|         |         |
	|         |         |
	3 _______ 0 _______ 4
	*/
	cubes[0].setPos (retrait, retrait);
	cubes[1].setPos (retrait, retrait - cote);
	cubes[2].setPos (retrait, retrait - cote);
	cubes[3].setPos (retrait - diagDemi, retrait);
	cubes[4].setPos (retrait + diagDemi, retrait);
	cubes[5].setPos (retrait - diagDemi, retrait - cote);
	cubes[6].setPos (retrait + diagDemi, retrait - cote);
}
function posTwoVisibleFaceVertical(){
	/* position de départ, deux faces visibles
	5 _______ 1
	|         |
	|         |
	|         |
	3,4 _____ 0
	|         |
	|         |
	|         |
	6 _______ 2
	*/
	cubes[0].setPos (retrait, retrait);
	cubes[1].setPos (retrait, retrait - diagDemi);
	cubes[2].setPos (retrait, retrait + diagDemi);
	cubes[3].setPos (retrait - cote, retrait);
	cubes[4].setPos (retrait - cote, retrait);
	cubes[5].setPos (retrait - cote, retrait - diagDemi);
	cubes[6].setPos (retrait - cote, retrait + diagDemi);
}
function animateAll(){
	animationNbSec +=1;
	cubes[5].moveAll (pasGauche, pasGauche);
	cubes[6].moveAll (pasretrait - cote, pasDroit);
	cubes[1].moveY (pasGauche);
	cubes[2].moveY (pasDroit);
	cubes[3].moveX (pasGauche);
	cubes[4].moveX (pasDroit);
	if (animationNbSec <60) requestAnimationFrame (animateAll);
}
posOneVisibleFace ('x');
