/*
script pour animer un cube en svg.
le cube à des cotés de 100 unités.

coté = 100
diag = coté * r(2)
r(2) = 1.4142135623730951 = Math.sqrt(2)
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
function posDepart (sens, anglex, angley){
	/* fixer la position de départ
	sens = x ou y
	angle = un entier de 0 à 60
	*/
	if (anglex <0) anglex =0;
	else if (anglex >60) anglex =60;
	if (angley <0) angley =0;
	else if (angley >60) angley =60;
	anglexGauch = anglex * pasGauch - cote;
	anglexDroit = anglex * pasDroit - cote;
	angleyGauch = posX + angley * pasQuartGauch - cote;
	angleyDroit = posX + angley * pasQuartDroit - diagDemi;
	cubes[0].setPos (posX, posY);
	if ('x' === sens){
		cubes[1].setPos (posX, posY - cote + pasGauch * angley);
		cubes[2].setPos (posX, posY - cote + pasDroit * angley);
		cubes[3].setPos (anglexGauch, posY);
		cubes[4].setPos (anglexDroit, posY + pasQuartDroit * angley);
		cubes[5].setPos (anglexGauch, posY + pasQuartGauch * angley);
		cubes[6].setPos (anglexDroit, posY + pasQuartGauch * angley);
		/*
		cubes[3].moveAll (pasGauch, pasQuartGauch);
		cubes[4].moveAll (pasDroit, pasQuartGauch);
		cubes[5].moveAll (pasGauch, pasQuartDroit);
		cubes[6].moveAll (pasDroit, pasQuartDroit);
		*/
	}
	else if ('y' === sens){
		cubes[1].setPos (posX, posY + anglexGauch);
		cubes[2].setPos (posX, posY + anglexDroit);
		cubes[3].setPos (posX - cote, posY);
		cubes[4].setPos (posX - cote, posY);
		cubes[5].setPos (posX - cote, posY + anglexGauch);
		cubes[6].setPos (posX - cote, posY + anglexDroit);
	}
}
function posCube (sens, angle){
	posDepart (sens, angle);
	animationNbSec = angle;
	if (sens ==='x') animateX();
	else if (sens ==='y') animateY();
	else animateXall();
}
posDepart ('x', 60, 60);
