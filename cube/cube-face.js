/*
script pour animer un cube en svg.
le cube à des cotés de 100 unités.

coté = 100
diag = coté * r(2)
r(2) = 1.4142135623730951 = Math.sqrt(2)

toit = 0 1 2 3
gauch = 0 1 4 5
droit = 0 3 4 6

   /6\
  /   \
3/  B  \2
|\     /|
| \   / |
|  \0/  |
| C | A |
5\  |  /4
  \ | /
   \1/

 3/\‾‾‾‾‾‾‾\6
 /  \   B   \
/5  0\_______\
\ C  /      2/
 \  /   A   /
 1\/_______/4

0        2
|‾‾‾‾‾‾‾‾|
|        |
|        |
|________|
1        4

3        0        2
|‾‾‾‾‾‾‾‾|‾‾‾‾‾‾‾‾|
|        |        |
|        |        |
|________|________|
5        1        4

3        6
|‾‾‾‾‾‾‾‾|
|        |
|        |
|________|
|0      2|
|        |
|        |
|________|
1        4

*/
/* variables fixées par l'utilisateur
les angles ont une valeur comprise entre [0, 60]
*/
const cote =100;
const posX =150;
const posY =150;
var anglex =60;
var angley =0;

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

// constantes utiles pour les calculs. x /120 = x/2 /60
const diagDemis = cote * Math.sqrt(2) /120;
const diagQuart = diagDemis /2;
const coteDemis = cote /60 - diagDemis;
const coteQuart = cote /60 - diagQuart;

var animationNbSec =0;
// récupérer les faces
const cube = document.getElementsByTagName ('polygon');
SVGPolygonElement.prototype.setPos = function (x1, y1, x2, y2, x3, y3){
	const points = posX +','+ posY +' '+ x1 +','+ y1 +' '+ x2 +','+ y2 +' '+ x3 +','+ y3;
	this.setAttribute ('points', points);
}
function setPosX (anglex, angley){
	anglex = setAngle (anglex);
	angley = setAngle (angley);
	if (angley > anglex) angley = anglex;
	const y1 = posY + cote - angley * coteDemis;
	const y2 = posY - angley * diagQuart;
	const y4 = posY + cote - angley * coteQuart;
	const x4 = posX + cote - anglex * coteDemis;
	const x5 = posX - anglex * diagDemis;
	const x6 = posX + cote - anglex * cote /60;
	const y6 = posY - angley * diagDemis;
	cube[0].setPos (posX, y1, x4, y4, x4, y2);
	cube[1].setPos (x4, y2, x6, y6, x5, y2);
	cube[2].setPos (posX, y1, x5, y4, x5, y2);
}
function setPosY (anglex, angley){
	anglex = setAngle (anglex);
	angley = setAngle (angley);
	if (anglex > angley) anglex = angley;
	const x1 = posX - anglex * diagQuart;
	const x2 = posX + cote - anglex * coteDemis;
	const x4 = posX + cote - anglex * coteQuart;
	const x5 = posX - anglex * diagDemis;
	const y4 = posY + cote - angley * coteDemis;
	const y5 = posY + cote - angley * cote /60;
	const y6 = posY - angley * diagDemis;
	cube[0].setPos (x2, posY, x4, y4, x1, y4);
	cube[1].setPos (x2, posY, x4, y6, x1, y6);
	cube[2].setPos (x1, y4, x5, y5, x1, y6);
}
function animateX(){
	animationNbSec +=1;
	if (animationNbSec <61){
		setPosX (animationNbSec, animationNbSec);
		requestAnimationFrame (animateX);
	}
	else if (animationNbSec <121){
		setPosX (120 - animationNbSec, 120 - animationNbSec);
		requestAnimationFrame (animateX);
	}
}
function animateY(){
	animationNbSec +=1;
	if (animationNbSec <61){
		setPosY (animationNbSec, animationNbSec);
		requestAnimationFrame (animateY);
	}
	else if (animationNbSec <121){
		setPosY (120 - animationNbSec, 120 - animationNbSec);
		requestAnimationFrame (animateY);
	}
}
animateY();