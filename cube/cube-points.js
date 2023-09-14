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

// constantes utiles pour les calculs
const diagDemi = cote * Math.sqrt(2) /2;
const diagQuart = diagDemi /2;
const pasGauch = (cote - diagDemi) /60;
const pasDroit = (cote + diagDemi) /60;

const pasQuartDroit = (cote - diagQuart) /60;
const pasQuartGauch = diagQuart /60;

var animationNbSec =0;
// récupérer les points. cube[0] est fixe
const cube = document.getElementsByTagName ('circle');
cube[0].setPos (posX, posY);

function setPosX (anglex, angley){
	/* fixer la position des points. elle varie entre le carré et les deux faces côte à côte
	de   cube[5].setPos (posX - cote, posY);
	à    cube[5].setPos (posX - diagDemi, posY);
	puis cube[5].setPos (posX - cote + anglex * pasGauch, pas5);
	angle entre 0 et 60
	*/
	anglex = setAngle (anglex);
	angley = setAngle (angley);
	if (angley > anglex) angley = anglex;
	cube[1].setPos (posX, posY - cote + angley * pasGauch);
	cube[2].setPos (posX, posY - cote + angley * pasDroit);
	cube[3].setPos (posX - cote + anglex * pasGauch, posY - cote + angley * pasQuartDroit);
	cube[4].setPos (posX - cote + anglex * pasDroit, posY - cote + angley * pasQuartDroit);
	cube[5].setPos (posX - cote + anglex * pasGauch, posY + angley * pasQuartGauch);
	cube[6].setPos (posX - cote + anglex * pasDroit, posY + angley * pasQuartGauch);
}
function setPosY (anglex, angley){
	/* fixer la position des points. elle varie entre le carré et les deux faces supperposées
	de cube[1].setPos (posX, posY - cote);
	à  cube[1].setPos (posX, posY - diagDemi);
	angle entre 0 et 60
	*/
	anglex = setAngle (anglex);
	angley = setAngle (angley);
	if (angley < anglex) anglex = angley;
	cube[1].setPos (posX + anglex * pasQuartGauch, posY - cote + angley * pasGauch);
	cube[2].setPos (posX + anglex * pasQuartGauch, posY - cote + angley * pasDroit);
	cube[3].setPos (posX - cote + anglex * pasQuartDroit, posY - cote + angley * pasGauch);
	cube[4].setPos (posX - cote + anglex * pasQuartDroit, posY - cote + angley * pasDroit);
	cube[5].setPos (posX - cote + anglex * pasGauch, posY);
	cube[6].setPos (posX - cote + anglex * pasDroit, posY);
}
function moveX2D(){
	// mouvement simple, comme un manège
	animationNbSec +=1;
	if (animationNbSec <61){
		cube[3].move (pasGauch, 0);
		cube[4].move (pasDroit, 0);
		cube[5].move (pasGauch, 0);
		cube[6].move (pasDroit, 0);
		requestAnimationFrame (moveX2D);
	}
	else if (animationNbSec <121){
		cube[3].move (pasDroit, 0);
		cube[4].move (pasGauch, 0);
		cube[5].move (pasDroit, 0);
		cube[6].move (pasGauch, 0);
		requestAnimationFrame (moveX2D);
	}
	else if (animationNbSec <181){
		cube[3].move (- pasDroit, 0);
		cube[4].move (- pasGauch, 0);
		cube[5].move (- pasDroit, 0);
		cube[6].move (- pasGauch, 0);
		requestAnimationFrame (moveX2D);
	}
	else if (animationNbSec <241){
		cube[3].move (- pasGauch, 0);
		cube[4].move (- pasDroit, 0);
		cube[5].move (- pasGauch, 0);
		cube[6].move (- pasDroit, 0);
		requestAnimationFrame (moveX2D);
	}
}
function moveY2D(){
	animationNbSec +=1;
	if (animationNbSec <61){
		cube[1].move (0, pasGauch);
		cube[2].move (0, pasDroit);
		cube[3].move (0, pasGauch);
		cube[4].move (0, pasDroit);
		requestAnimationFrame (moveY2D);
	}
	else if (animationNbSec <121){
		cube[1].move (0, pasDroit);
		cube[2].move (0, pasGauch);
		cube[3].move (0, pasDroit);
		cube[4].move (0, pasGauch);
		requestAnimationFrame (moveY2D);
	}
	else if (animationNbSec <181){
		cube[1].move (0, - pasDroit);
		cube[2].move (0, - pasGauch);
		cube[3].move (0, - pasDroit);
		cube[4].move (0, - pasGauch);
		requestAnimationFrame (moveY2D);
	}
	else if (animationNbSec <241){
		cube[1].move (0, - pasGauch);
		cube[2].move (0, - pasDroit);
		cube[3].move (0, - pasGauch);
		cube[4].move (0, - pasDroit);
		requestAnimationFrame (moveY2D);
	}
}
function moveX3D(){
	animationNbSec +=1;
	if (animationNbSec <61){
		cube[1].move (0, pasGauch);
		cube[2].move (0, pasDroit);
		cube[3].move (pasGauch, pasQuartDroit);
		cube[4].move (pasDroit, pasQuartDroit);
		cube[5].move (pasGauch, pasQuartGauch);
		cube[6].move (pasDroit, pasQuartGauch);
		requestAnimationFrame (moveX3D);
	}
	else if (animationNbSec <121){
		cube[1].move (0, - pasGauch);
		cube[2].move (0, - pasDroit);
		cube[3].move (- pasGauch, - pasQuartDroit);
		cube[4].move (- pasDroit, - pasQuartDroit);
		cube[5].move (- pasGauch, - pasQuartGauch);
		cube[6].move (- pasDroit, - pasQuartGauch);
		requestAnimationFrame (moveX3D);
	}
}
function moveY3D(){
	animationNbSec +=1;
	if (animationNbSec <61){
		cube[1].move (pasQuartGauch, pasGauch);
		cube[2].move (pasQuartGauch, pasDroit);
		cube[3].move (pasQuartDroit, pasGauch);
		cube[4].move (pasQuartDroit, pasDroit);
		cube[5].move (pasGauch, 0);
		cube[6].move (pasDroit, 0);
		requestAnimationFrame (moveY3D);
	}
	else if (animationNbSec <121){
		cube[1].move (- pasQuartGauch, - pasGauch);
		cube[2].move (- pasQuartGauch, - pasDroit);
		cube[3].move (- pasQuartDroit, - pasGauch);
		cube[4].move (- pasQuartDroit, - pasDroit);
		cube[5].move (- pasGauch, 0);
		cube[6].move (- pasDroit, 0);
		requestAnimationFrame (moveY3D);
	}
}
setPosX (60,60);
