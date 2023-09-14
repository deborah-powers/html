/*
script pour animer un cube en svg.
le cube à des cotés de 100 unités.

coté = 100
diag = coté * r(2)
r(2) = 1.4142135623730951 = Math.sqrt(2)

3,4 ___ 1,2
|        |
|        |
|        |
5,6 ____ 0

3 _____ 1,2 _____ 4
|        |        |
|        |        |
|        |        |
5 ______ 0 ______ 6

3 ______ 1
|        |
|        |
|        |
5,6 ____ 0
|        |
|        |
|        |
4 ______ 2

*/
const cote =100;
const diag = cote * Math.sqrt(2);
const diagDemi = (diag /2);
const diagQuart = (diag /4);
const posX =150;
const posY =150;
var animationNbSec =0;

// animation, faire tourner le cube comme un manège
var pasGauch = (cote - diagDemi) /60;
var pasDroit = (cote + diagDemi) /60;
var pasQuartDroit = (cote - diagQuart) /60;
var pasQuartGauch = (diagDemi - diagQuart) /60;
// pasDroit = pasDroit.toFixed (2);

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

function animateX(){
	animationNbSec +=1;
	if (animationNbSec <61){
		cubes[3].moveX (pasGauch);
		cubes[5].moveX (pasGauch);
		cubes[4].moveX (pasDroit);
		cubes[6].moveX (pasDroit);
		requestAnimationFrame (animateX);
	}
	else if (animationNbSec <121){
		cubes[3].moveX (pasDroit);
		cubes[5].moveX (pasDroit);
		cubes[4].moveX (pasGauch);
		cubes[6].moveX (pasGauch);
		requestAnimationFrame (animateX);
	}
	else if (animationNbSec <181){
		cubes[3].moveX (- pasDroit);
		cubes[5].moveX (- pasDroit);
		cubes[4].moveX (- pasGauch);
		cubes[6].moveX (- pasGauch);
		requestAnimationFrame (animateX);
	}
	else if (animationNbSec <241){
		cubes[3].moveX (- pasGauch);
		cubes[5].moveX (- pasGauch);
		cubes[4].moveX (- pasDroit);
		cubes[6].moveX (- pasDroit);
		requestAnimationFrame (animateX);
	}
}
function animateY(){
	animationNbSec +=1;
	if (animationNbSec <61){
		cubes[1].moveY (pasGauch);
		cubes[5].moveY (pasGauch);
		cubes[2].moveY (pasDroit);
		cubes[6].moveY (pasDroit);
		requestAnimationFrame (animateY);
	}
	else if (animationNbSec <121){
		cubes[1].moveY (pasDroit);
		cubes[5].moveY (pasDroit);
		cubes[2].moveY (pasGauch);
		cubes[6].moveY (pasGauch);
		requestAnimationFrame (animateY);
	}
	else if (animationNbSec <181){
		cubes[1].moveY (- pasDroit);
		cubes[5].moveY (- pasDroit);
		cubes[2].moveY (- pasGauch);
		cubes[6].moveY (- pasGauch);
		requestAnimationFrame (animateY);
	}
	else if (animationNbSec <241){
		cubes[1].moveY (- pasGauch);
		cubes[5].moveY (- pasGauch);
		cubes[2].moveY (- pasDroit);
		cubes[6].moveY (- pasDroit);
		requestAnimationFrame (animateY);
	}
}
function animateXall(){
	animationNbSec +=1;
	if (animationNbSec <61){
		cubes[3].moveAll (pasGauch, pasQuartGauch);
		cubes[4].moveAll (pasDroit, pasQuartGauch);
		cubes[5].moveAll (pasGauch, pasQuartDroit);
		cubes[6].moveAll (pasDroit, pasQuartDroit);
		cubes[1].moveY (pasGauch);
		cubes[2].moveY (pasDroit);
		requestAnimationFrame (animateXall);
	}
	else if (animationNbSec <121){
		cubes[3].moveAll (- pasGauch, - pasQuartGauch);
		cubes[5].moveAll (- pasGauch, - pasQuartDroit);
		cubes[4].moveAll (- pasDroit, - pasQuartGauch);
		cubes[6].moveAll (- pasDroit, - pasQuartDroit);
		cubes[1].moveY (- pasGauch);
		cubes[2].moveY (- pasDroit);
		requestAnimationFrame (animateXall);
	}
}
function animateYall(){
	animationNbSec +=1;
	if (animationNbSec <61){
		cubes[1].moveAll (pasQuartGauch, pasGauch);
		cubes[5].moveAll (pasQuartDroit, pasGauch);
		cubes[2].moveAll (pasQuartGauch, pasDroit);
		cubes[6].moveAll (pasQuartDroit, pasDroit);
		cubes[3].moveX (pasGauch);
		cubes[4].moveX (pasDroit);
		requestAnimationFrame (animateYall);
	}
	else if (animationNbSec <121){
		cubes[1].moveAll (- pasQuartGauch, - pasGauch);
		cubes[5].moveAll (- pasQuartDroit, - pasGauch);
		cubes[2].moveAll (- pasQuartGauch, - pasDroit);
		cubes[6].moveAll (- pasQuartDroit, - pasDroit);
		cubes[3].moveX (- pasGauch);
		cubes[4].moveX (- pasDroit);
		requestAnimationFrame (animateYall);
	}
}
function posDepart_0 (sens, anglex, angley){
	/* fixer la position de départ
	sens = x ou y
	angle = un entier de 0 à 60
	*/
	if (anglex <0) anglex =0;
	else if (anglex >60) anglex =60;
	if (angley <0) angley =0;
	else if (angley >60) angley =60;
	anglexGauch = posX + anglex * pasGauch - cote;
	anglexDroit = posX + anglex * pasDroit - cote;
	angleyGauch = posY + pasQuartGauch * angley;
	angleyDroit = posY + pasQuartDroit * angley - cote;
	cubes[0].setPos (posX, posY);
	if ('x' === sens){
		cubes[1].setPos (posX, posY - cote);
		cubes[2].setPos (posX, posY - cote);
		cubes[3].setPos (anglexGauch, posY);
		cubes[4].setPos (anglexDroit, posY);
		cubes[5].setPos (anglexGauch, posY - cote);
		cubes[6].setPos (anglexDroit, posY - cote);
	}
	else if ('y' === sens){
		cubes[1].setPos (posX, posY - cote);
		cubes[2].setPos (posX, posY - cote);
		cubes[3].setPos (posX - cote, posY);
		cubes[4].setPos (posX - cote, posY);
		cubes[5].setPos (posX - cote, posY - cote);
		cubes[6].setPos (posX - cote, posY - cote);
	}
}
function posDepart (sens, anglex, angley){
	/* fixer la position de départ
	sens = x ou y
	angle = un entier de 0 à 60
	*/
	if (anglex <0) anglex =0;
	else if (anglex >60) anglex =60;
	if (angley <0) angley =0;
	else if (angley >60) angley =60;
	cubes[0].setPos (posX, posY);
	if ('x' === sens){
		if (angley > anglex) angley = anglex;
		var anglexGauch = posX + anglex * pasGauch - cote;
		var anglexDroit = posX + anglex * pasDroit - cote;
		var angleyGauch = posY + angley * pasQuartGauch;
		var angleyDroit = posY - cote + angley * pasQuartDroit;
		cubes[1].setPos (posX, posY - cote + angley * pasGauch);
		cubes[2].setPos (posX, posY - cote + angley * pasDroit);
		cubes[3].setPos (anglexGauch, angleyGauch);
		cubes[4].setPos (anglexDroit, angleyGauch);
		cubes[5].setPos (anglexGauch, angleyDroit);
		cubes[6].setPos (anglexDroit, angleyDroit);
	}
	else if ('y' === sens){
		if (angley < anglex) anglex = angley;
		// supposition
		var angleyGauch = posY + angley * pasGauch - cote;
		var angleyDroit = posY + angley * pasDroit - cote;
		var anglexGauch = posX + anglex * pasQuartGauch;
		var anglexDroit = posX - cote + anglex * pasQuartDroit;
		cubes[1].setPos (anglexDroit, angleyGauch);
		cubes[2].setPos (anglexGauch, angleyGauch);
		cubes[3].setPos (posX - cote + anglex * pasGauch, posY);
		cubes[4].setPos (posX - cote + anglex * pasDroit, posY);
		cubes[5].setPos (anglexGauch, angleyDroit);
		cubes[6].setPos (anglexDroit, angleyDroit);
	}
}
function posCube (sens, angle){
	posDepart (sens, angle);
	animationNbSec = angle;
	if (sens ==='x') animateXall();
	else if (sens ==='y') animateYall();
}
posDepart ('y', 60, 60);
var c0x =0;
var c0y =0;
var c1x =0;
var c1y =0;
var c2x =0;
var c2y =0;
var c3x =0;
var c3y =0;
var c4x =0;
var c4y =0;
var c5x =0;
var c5y =0;
var c6x =0;
var c6y =0;