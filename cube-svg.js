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
<<<<<<< HEAD
var anglex =60;
var angley =0;
=======
var anglex =30;
var angley =40;
>>>>>>> 2b0f2cc (boulot 09/07 17:07)

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
<<<<<<< HEAD
	// return angle /60;
	return angle;
=======
	return angle /60;
>>>>>>> 2b0f2cc (boulot 09/07 17:07)
}
// vérifier les valeurs des angles
anglex = setAngle (anglex);
angley = setAngle (angley);

// constantes utiles pour les calculs
const diagDemi = cote * Math.sqrt(2) /2;
const diagQuart = (diagDemi /2);
<<<<<<< HEAD
const pasGauch = (cote - diagDemi) /60;
const pasDroit = (cote + diagDemi) /60;
=======
>>>>>>> 2b0f2cc (boulot 09/07 17:07)
var animationNbSec =0;
// récupérer les points. cubes[0] est fixe
const cubes = document.getElementsByTagName ('circle');
cubes[0].setPos (posX, posY);

function setPosX (anglex, angley){
	/* fixer la position des points. elle varie entre le carré et les deux faces côte à côte
	de   cubes[5].setPos (posX - cote, posY);
	à    cubes[5].setPos (posX - diagDemi, posY);
<<<<<<< HEAD
	puis cubes[5].setPos (posX - cote + anglex * pasGauch, pas5);
=======
	puis cubes[5].setPos (posX - cote + anglex * (cote - diagDemi), pas5);
>>>>>>> 2b0f2cc (boulot 09/07 17:07)
	angle entre 0 et 60
	*/
	anglex = setAngle (anglex);
	angley = setAngle (angley);
	if (angley > anglex) angley = anglex;
<<<<<<< HEAD
	const pas3 = posY - cote + angley * (cote - diagQuart) /60;
	const pas5 = posY + angley * diagQuart /60;
	cubes[1].setPos (posX, posY - cote + angley * pasGauch);
	cubes[2].setPos (posX, posY - cote + angley * pasDroit);
	cubes[3].setPos (posX - cote + anglex * pasGauch, pas3);
	cubes[4].setPos (posX - cote + anglex * pasDroit, pas3);
	cubes[5].setPos (posX - cote + anglex * pasGauch, pas5);
	cubes[6].setPos (posX - cote + anglex * pasDroit, pas5);
=======
	const pas3 = posY - cote + angley * (cote - diagQuart);
	const pas5 = posY + angley * diagQuart;
	cubes[1].setPos (posX, posY - cote + angley * (cote - diagDemi));
	cubes[2].setPos (posX, posY + angley * diagDemi);
	cubes[3].setPos (posX - cote + anglex * (cote - diagDemi), pas3);
	cubes[4].setPos (posX - cote + anglex * (cote + diagDemi), pas3);
	cubes[5].setPos (posX - cote + anglex * (cote - diagDemi), pas5);
	cubes[6].setPos (posX - cote + anglex * (cote + diagDemi), pas5);
>>>>>>> 2b0f2cc (boulot 09/07 17:07)
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
<<<<<<< HEAD
	const pas1 = posX + anglex * diagQuart /60;
	const pas3 = posX - cote + anglex * (cote - diagQuart) /60;
	cubes[1].setPos (pas1, posY - cote + angley * pasGauch);
	cubes[2].setPos (pas1, posY - cote + angley * pasDroit);
	cubes[3].setPos (pas3, posY - cote + angley * pasGauch);
	cubes[4].setPos (pas3, posY - cote + angley * pasDroit);
	cubes[5].setPos (posX - cote + anglex * pasGauch, posY);
	cubes[6].setPos (posX - cote + anglex * pasDroit, posY);
}

const pasQuartDroit = (cote - diagQuart) /60;
const pasQuartGauch = (diagDemi - diagQuart) /60;

function moveX(){
	// mouvement simple, comme un manège
	animationNbSec +=1;
	if (animationNbSec <61){
		cubes[3].move (pasGauch, 0);
		cubes[4].move (pasDroit, 0);
		cubes[5].move (pasGauch, 0);
		cubes[6].move (pasDroit, 0);
		requestAnimationFrame (moveX);
	}
	// TODO rajouter les étapes intermédiaires
	else if (animationNbSec <121){
		cubes[3].move (- pasGauch, 0);
		cubes[4].move (- pasDroit, 0);
		cubes[5].move (- pasGauch, 0);
		cubes[6].move (- pasDroit, 0);
		requestAnimationFrame (moveX);
	}
}
function moveY(){
	animationNbSec +=1;
	if (animationNbSec <61){
		cubes[1].move (0, pasGauch);
		cubes[2].move (0, pasDroit);
		cubes[3].move (0, pasGauch);
		cubes[4].move (0, pasDroit);
		requestAnimationFrame (moveY);
	}
	else if (animationNbSec <121){
		cubes[1].move (0, - pasGauch);
		cubes[2].move (0, - pasDroit);
		cubes[3].move (0, - pasGauch);
		cubes[4].move (0, - pasDroit);
		requestAnimationFrame (moveY);
	}
}
setPosY (0,0);
moveY();
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
=======
	const pas1 = posX + anglex * diagQuart;
	const pas3 = posX - cote + anglex * (cote - diagQuart);
	cubes[1].setPos (pas1, posY - cote + angley * (cote - diagDemi));
	cubes[2].setPos (pas1, posY - cote + angley * (cote + diagDemi));
	cubes[3].setPos (pas3, posY - cote + angley * (cote - diagDemi));
	cubes[4].setPos (pas3, posY - cote + angley * (cote + diagDemi));
	cubes[5].setPos (posX - cote + anglex * (cote - diagDemi), posY);
	cubes[6].setPos (posX - cote + anglex * (cote + diagDemi), posY);
}
function moveX(){
	animationNbSec +=1;
	if (animationNbSec <61){
	}
}
setPosX();
moveX();
>>>>>>> 2b0f2cc (boulot 09/07 17:07)
