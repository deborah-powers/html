// racine (2) = 1.414213562
const svgWidth = svg.getAttributeNb ('width') /10;
const svgHeight = svg.getAttributeNb ('height') /10;
var lettres =[ 'a', 'b', 'c', 'd', 'e' ];
var lettresRel =[
	[0,1],
	[1,0],
	[0,0,0],
	[0,1,1,0],
	[2,0,0,1,0]
];
var posOld =[];
var frereList =[];
var point =[];
var posX;
var posY;
for (var l=0; l< lettres.length; l++){
	frereList =[];
	point = randomPoint();
	posOld.push (point);
	for (var m=0; m<l; m++){
		if (lettresRel[l][m] ==1) createLine (point[0], point[1], posOld[m][0], posOld[m][1]);
		else if (lettresRel[l][m] ==2) createLine (point[0], point[1], posOld[m][0], posOld[m][1], true);
	}
}
for (var l=0; l< lettres.length; l++) createNode (lettres[l], posOld[l][0], posOld[l][1]);

function randomNb(){
	var pos =0;
	while (pos <=0){
		pos = 10* Math.random();
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
	posX = randomNb (10);
	posY = randomNb (10);
	while (posOldContain (posX, posY)){
		posX = randomNb (10);
		posY = randomNb (10);
	}
	return [ posX, posY ];
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
