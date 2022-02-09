// racine (2) = 1.414213562
const svgWidth = svg.getAttributeNb ('width') /10;
const svgHeight = svg.getAttributeNb ('height') /10;
var lettres =[ 'a', 'b', 'c', 'd', 'e' ];
var lettresRel =[
	[0],
	[0,0],
	[0,1,0],
	[0,1,0,0],
	[0,0,0,0,0]
];
var posOld =[];
var posX;
var posY;
var aFrere =[];

var point = randomPoint();
posOld.push (point);

for (var l=1; l< lettres.length; l++){
	aFrere =[];
	for (var m=0; m<l; m++) if (lettresRel[l][m] >0) aFrere.push (m);
	if (aFrere.length >0){
		point = randomPointRef (posOld[aFrere[0]][0], posOld[aFrere[0]][1]);
		for (var m=0; m< aFrere.length; m++) createLine (point[0], point[1], posOld[aFrere[m]][0], posOld[aFrere[m]][1]);
	}
	else point = randomPoint();
	posOld.push (point);
}
for (var l=0; l< lettres.length; l++) createNode (lettres[l], posOld[l][0], posOld[l][1]);

function pointVide (point){
	if (point[0] ==0 && point[1] ==0) return true;
	else return false;
}
function randomNb (nb){
	var pos =0;
	while (pos <=0){
		pos = nb* Math.random();
		pos = Math.floor (pos);
	}
	return pos;
}
function posOldContain (posX, posY){
	var poContain = false;
	for (var p=0; p< posOld.length; p++) if (posOld[p][0] == posX && posOld[p][1] == posY) poContain = true;
	return poContain;
}
function randomPoint(){
	var posX = randomNb (10);
	var posY = randomNb (10);
	while (posOldContain (posX, posY)){
		posX = randomNb (10);
		posY = randomNb (10);
	}
	return [ posX, posY ];
}
function randomPointRefChoice (refX, refY, deltaX, deltaY){
	if (! posOldContain (refX + deltaX, refY + deltaY)) return [ refX + deltaX, refY + deltaY ];
	else if (! posOldContain (refX + deltaX, refY - deltaY)) return [ refX + deltaX, refY - deltaY ];
	else if (! posOldContain (refX - deltaX, refY + deltaY)) return [ refX - deltaX, refY + deltaY ];
	else if (! posOldContain (refX - deltaX, refY - deltaY)) return [ refX - deltaX, refY - deltaY ];
	else return [0,0];
}
function randomPointRef (refX, refY){
	var deltaX = randomNb (3);
	deltaX -=1;
	var deltaY = randomNb (3);
	deltaY -=1;
	var point = randomPointRefChoice (refX, refY, deltaX, deltaY);
	while (point[0] ==0 && point[1] ==0){
		deltaX = randomNb (3);
		deltaX -=1;
		deltaY = randomNb (3);
		deltaY -=1;
		point = randomPointRefChoice (refX, refY, deltaX, deltaY);
	}
	return point;
}
function createLine (posX, posY, posX2, posY2, double){
	posX = svgWidth * posX -1;
	posY = svgHeight * posY -1;
	posX2 = svgWidth * posX2 -1;
	posY2 = svgHeight * posY2 -1;
	var newLine = createShape ('line', svg);
	if (double) newLine.setAttribute ('class', 'double');
	newLine.setAttributeNb ('x1', posX);
	newLine.setAttributeNb ('y1', posY);
	newLine.setAttributeNb ('x2', posX2);
	newLine.setAttributeNb ('y2', posY2);
}
function createNode (letter, posX, posY){
	posX = svgWidth * posX -1;
	posY = svgHeight * posY -1;
	var newCircle = createShape ('circle', svg);
	newCircle.setAttributeNb ('cx', posX);
	newCircle.setAttributeNb ('cy', posY);
	var newText = createShape ('text', svg);
	newText.setAttributeNb ('x', posX);
	newText.setAttributeNb ('y', posY);
	newText.innerHTML = letter;
}
