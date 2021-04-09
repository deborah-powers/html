/* afficher un réseau de point dans une image svg
dépendance: svg.js
dans mon fichier svg:
var pointsListe =[ 'a', 'b', 'c', 'd', 'e' ];
var relationsPoints =[
	[0],
	[1,0],
	[0,1,0],
	[0,1,0,0],
	[0,0,0,1,0]
];
*/
function randomNb(){
	var pos =0;
	while (pos <=0 || pos >=10){
		pos =10* Math.random();
		pos = Math.floor (pos);
	}
	return pos;
}
function randomNbRef (ref){
	var pos =0;
	while (pos <=0 || pos >=10 || pos < ref -1 || pos > ref +1){
		pos =3* Math.random();
		pos = Math.floor (pos);
		pos -=1;
		pos += ref;
	}
	return pos;
}
class Point{
	constructor (nom){
		this.nom = nom;
		this.x =0;
		this.y =0;
	}
	randomCoord(){
		this.x = randomNb();
		this.y = randomNb();
	}
	randomCoordFromRef (pointRef){
		this.x = randomNbRef (pointRef.x);
		this.y = randomNbRef (pointRef.y);
	}
	ajuster (limitsSvg, limitsGraphe){
		this.x -= limitsGraphe.xmin;
		this.x *= limitsSvg.width;
		this.x /= limitsGraphe.width;
		this.x += limitsSvg.xmin;
		this.y -= limitsGraphe.ymin;
		this.y *= limitsSvg.height;
		this.y /= limitsGraphe.height;
		this.y += limitsSvg.ymin;
	}
	dessiner(){
		var newCircle = createShape ('ellipse', svg);
		newCircle.setAttributeNb ('cx', this.x);
		newCircle.setAttributeNb ('cy', this.y);
		var newText = createShape ('text', svg);
		newText.setAttributeNb ('x', this.x);
		newText.setAttributeNb ('y', this.y);
		newText.innerHTML = this.nom;
	}
}
class Points extends Array{
	// liste de Point
	constructor (pointsListe){
		super();
		if (pointsListe !== null && pointsListe !== undefined && pointsListe.length >0) this.fromListe (pointsListe);
	}
	fromListe (pointsListe){
		for (var p=0; p< pointsListe.length; p++){
			var point = new Point (pointsListe[p]);
			this.push (point);
	}}
	contient (point){
		var listContient = false;
		var p=0;
		while (p< this.length && listContient === false){
			if (this[p].x === point.x && this[p].y === point.y && this[p].nom !== point.nom) listContient = true;
			p++;
		}
		return listContient;
	}
	findPoint (nom){
		// pos = -1 si aucun point ne porte ce nom, ou son idex
		var pos =-1;
		var p=0;
		while (p< this.length && pos <0){
			if (this[p].nom === nom) pos =p;
			p++;
		}
		return pos;
	}
	addCoord (pos){
		this[pos].randomCoord();
		while (this.contient (this[pos])) this[pos].randomCoord();
	}
	addCoordFromRef (pos, pointRef){
		this[pos].randomCoordFromRef (pointRef);
		while (this.contient (this[pos])) this[pos].randomCoordFromRef (pointRef);
	}
	addPoint (nom){
		var pos = this.findPoint (nom);
		if (pos >=0) return;
		var point = new Point (nom);
		point.randomCoord();
		while (this.contient (point)) point.randomCoord();
		this.push (point);
	}
	addPointFromRef (nom, pointRef){
		var pos = this.findPoint (nom);
		if (pos >=0) return;
		var point = new Point (nom);
		point.randomCoordFromRef (pointRef);
		while (this.contient (point)) point.randomCoordFromRef (pointRef);
		this.push (point);
	}
	ajuster (labelWidth, labelHeight){
		const limitsSvg = new Limits();
		limitsSvg.fromSvg (labelWidth, labelHeight);
		const limitsGraphe = new Limits();
		limitsGraphe.fromPoints (this);
		for (var p=0; p< this.length; p++) this[p].ajuster (limitsSvg, limitsGraphe);
	}
	dessiner(){ for (var p=0; p< this.length; p++) this[p].dessiner(); }
}
class Graphe{
	constructor (pointsListe, relationsPoints){
		this.relations = relationsPoints;
		this.points = new Points (pointsListe);
	}
	calculer(){
		this.points.addCoord (0);
		for (var p=1; p< this.points.length; p++){ for (var f=0; f< this.relations[p].length; f++){
			if (this.relations[p][f] >0) this.points.addCoordFromRef (p, this.points[f]);
			else this.points.addCoord (p);
	}}}
	dessiner (labelWidth, labelHeight){
		this.points.ajuster (labelWidth, labelHeight);
		// dessiner les lignes
		for (var p=1; p< this.points.length; p++){ for (var f=0; f< this.relations[p].length; f++){
			if (this.relations[p][f] >0){
				var newLine = createShape ('line', svg);
				if (this.relations[p][f] >1) newLine.setAttribute ('class', 'double');
				newLine.setAttributeNb ('x1', this.points[p].x);
				newLine.setAttributeNb ('y1', this.points[p].y);
				newLine.setAttributeNb ('x2', this.points[f].x);
				newLine.setAttributeNb ('y2', this.points[f].y);
		}}}
		this.points.dessiner();
	}
}
class Limits{
	constructor(){
		this.width =0;
		this.height =0;
		this.xmin =0;
		this.ymin =0;
	}
	fromPoints (pointsListe){
		this.xmin = pointsListe[0].x;
		var xmax = pointsListe[0].x;
		this.ymin = pointsListe[0].y;
		var ymax = pointsListe[0].y;
		for (var p=1; p< pointsListe.length; p++){
			if (pointsListe[p].x < this.xmin) this.xmin = pointsListe[p].x;
			else if (pointsListe[p].x > xmax) xmax = pointsListe[p].x;
			if (pointsListe[p].y < this.ymin) this.ymin = pointsListe[p].y;
			else if (pointsListe[p].y > ymax) ymax = pointsListe[p].y;
		}
		this.width = xmax - this.xmin;
		this.height = ymax - this.ymin;
	}
	fromSvg (labelWidth, labelHeight){
		const marge =10;
		var margeX = marge;
		if (labelWidth !== null && labelWidth !== undefined) margeX += labelWidth;
		var margeY = marge;
		if (labelHeight !== null && labelHeight !== undefined) margeY += labelHeight;
		this.width = svg.getAttributeNb ('width') -2* margeX;
		this.height = svg.getAttributeNb ('height') -2* margeY;
		this.xmin = margeX;
		this.ymin = margeY;
}}
function creerGraphe (pointsListe, relationsPoints, labelWidth, labelHeight){
	var graphe = new Graphe (pointsListe, relationsPoints);
	graphe.calculer();
	graphe.dessiner (labelWidth, labelHeight);
}