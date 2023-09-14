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
/* variables fixées par l'utilisateur
les angles ont une valeur comprise entre [0, 60]
*/
const cote =100;
const posX =150;
const posY =150;
var anglex =60;
var angley =0;

SVGCircleElement.prototype.setPos = function (posX, posY){
	this.setAttributeNb ('cx', posX);
	this.setAttributeNb ('cy', posY);
}
SVGCircleElement.prototype.move = function (posX, posY){
	posX = posX + this.getAttributeFloat ('cx');
	this.setAttributeNb ('cx', posX);
	posY = posY + this.getAttributeFloat ('cy');
	this.setAttributeNb ('cy', posY);
}
function setAngle (angle){
	// vérifier les valeurs des angles
	if (angle <0) angle =0;
	else if (angle >60) angle =60;
	// return angle /60;
	return angle;
}
// vérifier les valeurs des angles
anglex = setAngle (anglex);
angley = setAngle (angley);

/* constantes utiles pour les calculs
x /120 = x /2 /60
*/
const diagDemi = cote * Math.sqrt(2) /2;
const pasGauch = (cote - diagDemi) /60;
const pasDroit = (cote + diagDemi) /60;
const pasQuartDroit = cote /60 - diagDemi /120;
const pasQuartGauch = diagDemi /120;
var animationNbSec =0;
// récupérer les points. cubes[0] est fixe
const cubes = document.getElementsByTagName ('circle');
cubes[0].setPos (posX, posY);

function setPosX (anglex, angley){
	/* fixer la position des points. elle varie entre le carré et les deux faces côte à côte
	de   cubes[5].setPos (posX - cote, posY);
	à    cubes[5].setPos (posX - diagDemi, posY);
	puis cubes[5].setPos (posX - cote + anglex * pasGauch, pas5);
	angle entre 0 et 60
	*/
	anglex = setAngle (anglex);
	angley = setAngle (angley);
	if (angley > anglex) angley = anglex;
	const pas3 = posY - cote + angley * pasQuartDroit;
	const pas5 = posY + angley * pasQuartGauch;
	cubes[1].setPos (posX, posY - cote + angley * pasGauch);
	cubes[2].setPos (posX, posY - cote + angley * pasDroit);
	cubes[3].setPos (posX - cote + anglex * pasGauch, pas3);
	cubes[4].setPos (posX - cote + anglex * pasDroit, pas3);
	cubes[5].setPos (posX - cote + anglex * pasGauch, pas5);
	cubes[6].setPos (posX - cote + anglex * pasDroit, pas5);
}
function setPosY (anglex, angley){
	/* fixer la position des points. elle varie entre le carré et les deux faces supperposées
	de cubes[1].setPos (posX, posY - cote);
	à  cubes[1].setPos (posX, posY - diagDemi);
	angle entre 0 et 60
	*/
	anglex = setAngle (anglex);
	angley = setAngle (angley);
	if (angley < anglex) anglex = angley;
	const pas1 = posX + anglex * pasQuartGauch;
	const pas3 = posX - cote + anglex * pasQuartDroit;
	cubes[1].setPos (pas1, posY - cote + angley * pasGauch);
	cubes[2].setPos (pas1, posY - cote + angley * pasDroit);
	cubes[3].setPos (pas3, posY - cote + angley * pasGauch);
	cubes[4].setPos (pas3, posY - cote + angley * pasDroit);
	cubes[5].setPos (posX - cote + anglex * pasGauch, posY);
	cubes[6].setPos (posX - cote + anglex * pasDroit, posY);
}
function moveX2D(){
	// mouvement simple, comme un manège
	animationNbSec +=1;
	if (animationNbSec <61){
		cubes[3].move (pasGauch, 0);
		cubes[4].move (pasDroit, 0);
		cubes[5].move (pasGauch, 0);
		cubes[6].move (pasDroit, 0);
		requestAnimationFrame (moveX2D);
	}
	else if (animationNbSec <121){
		cubes[3].move (pasDroit, 0);
		cubes[4].move (pasGauch, 0);
		cubes[5].move (pasDroit, 0);
		cubes[6].move (pasGauch, 0);
		requestAnimationFrame (moveX2D);
	}
	else if (animationNbSec <181){
		cubes[3].move (- pasDroit, 0);
		cubes[4].move (- pasGauch, 0);
		cubes[5].move (- pasDroit, 0);
		cubes[6].move (- pasGauch, 0);
		requestAnimationFrame (moveX2D);
	}
	else if (animationNbSec <241){
		cubes[3].move (- pasGauch, 0);
		cubes[4].move (- pasDroit, 0);
		cubes[5].move (- pasGauch, 0);
		cubes[6].move (- pasDroit, 0);
		requestAnimationFrame (moveX2D);
	}
}
function moveY2D(){
	animationNbSec +=1;
	if (animationNbSec <61){
		cubes[1].move (0, pasGauch);
		cubes[2].move (0, pasDroit);
		cubes[3].move (0, pasGauch);
		cubes[4].move (0, pasDroit);
		requestAnimationFrame (moveY2D);
	}
	else if (animationNbSec <121){
		cubes[1].move (0, pasDroit);
		cubes[2].move (0, pasGauch);
		cubes[3].move (0, pasDroit);
		cubes[4].move (0, pasGauch);
		requestAnimationFrame (moveY2D);
	}
	else if (animationNbSec <181){
		cubes[1].move (0, - pasDroit);
		cubes[2].move (0, - pasGauch);
		cubes[3].move (0, - pasDroit);
		cubes[4].move (0, - pasGauch);
		requestAnimationFrame (moveY2D);
	}
	else if (animationNbSec <241){
		cubes[1].move (0, - pasGauch);
		cubes[2].move (0, - pasDroit);
		cubes[3].move (0, - pasGauch);
		cubes[4].move (0, - pasDroit);
		requestAnimationFrame (moveY2D);
	}
}
function moveY3D(){
	animationNbSec +=1;
	if (animationNbSec <61){
		cubes[1].move (pasQuartGauch, pasGauch);
		cubes[2].move (pasQuartGauch, pasDroit);
		cubes[3].move (pasQuartDroit, pasGauch);
		cubes[4].move (pasQuartDroit, pasDroit);
		cubes[5].move (pasGauch, 0);
		cubes[6].move (pasDroit, 0);
		requestAnimationFrame (moveY3D);
	}
	else if (animationNbSec <121){
		cubes[1].move (- pasQuartGauch, - pasGauch);
		cubes[2].move (- pasQuartGauch, - pasDroit);
		cubes[3].move (- pasQuartDroit, - pasGauch);
		cubes[4].move (- pasQuartDroit, - pasDroit);
		cubes[5].move (- pasGauch, 0);
		cubes[6].move (- pasDroit, 0);
		requestAnimationFrame (moveY3D);
	}
}
function moveX3D(){
	animationNbSec +=1;
	if (animationNbSec <61){
		cubes[1].move (0, pasGauch);
		cubes[2].move (0, pasDroit);
		cubes[3].move (pasGauch, pasQuartDroit);
		cubes[4].move (pasDroit, pasQuartDroit);
		cubes[5].move (pasGauch, pasQuartGauch);
		cubes[6].move (pasDroit, pasQuartGauch);
		requestAnimationFrame (moveX3D);
	}
	else if (animationNbSec <121){
		cubes[1].move (0, - pasGauch);
		cubes[2].move (0, - pasDroit);
		cubes[3].move (- pasGauch, - pasQuartDroit);
		cubes[4].move (- pasDroit, - pasQuartDroit);
		cubes[5].move (- pasGauch, - pasQuartGauch);
		cubes[6].move (- pasDroit, - pasQuartGauch);
		requestAnimationFrame (moveX3D);
	}
}
setPosY (0,0);
moveY3D();
// pour plus tard
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
