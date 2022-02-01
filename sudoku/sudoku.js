/*
dépendances: list.js, sudoku.css, structure.css
*/
var tableau =[ ['1', '2', '3', '4', '5', '6', '7', '8', '9'], [], [], [], [], [], [], [], [] ];
var nombres = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
var template = "<sudoku><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p></sudoku>";

function afficher (remplirCase, viderCase){
	var sudoku = document.getElementsByTagName('sudoku')[0];
	var cases = sudoku.getElementsByTagName('p');
	z=0;
	for (var x=0; x<9; x++) for (var y=0; y<9; y++){
		remplirCase (cases[z], tableau[x][y]);
		z=z+1;
	}
	nombres = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80];
	for (var z=0; z<51; z++){
		x= nombres.enleverAleatoirement();
		viderCase (cases[x]);
	}
}
function afficher_complet(){
	var cases = document.getElementsByTagName('p');
	z=0;
	for (var x=0; x<9; x++) for (var y=0; y<9; y++){
		cases[z].innerHTML = tableau[x][y];
		z=z+1;
	}
	nombres = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80];
	for (var z=0; z<31; z++){
		x= nombres.enleverAleatoirement();
		cases[x].innerHTML =" ";
	}
}
Array.prototype.enleverAleatoirement = function() {
	var pos = Math.random();
	pos = pos * this.length;
	pos = Math.floor (pos);
	return this.splice (pos, 1)[0];
}
Array.prototype.delCroix = function(posX, posY){
	for (var y= this.length; y>=0; y--) if (tableau[posX].contains (this[y])) this.pop (y);
	for (var x=0; x< posX; x++) this.popItem (tableau[x][posY]);
}
Array.prototype.delTriplet = function(posX, posY){
	for (var y= this.length; y>=0; y--) if (tableau[posX].contains (this[y])) this.pop (y);
	x= 3* Math.floor (posX /3);
	for (; x< posX; x++){
		this.popItem (tableau[x][posY]);
		this.popItem (tableau[x][posY +1]);
		this.popItem (tableau[x][posY +2]);
}}
function remplirLigne23 (x){
	tableau[x] =[];
	for (var y=0; y<9; y=y+3){
		nombres = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
		nombres.delTriplet (x,y);
		for (var z=y; z< y+3; z++) tableau[x].push (nombres.enleverAleatoirement());
}}
function remplirLigne47 (x){
	tableau[x] =[];
	for (var y=0; y<9; y++){
		nombres = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
		nombres.delCroix (x,y);
		tableau[x].push (nombres.enleverAleatoirement());
}}
function remplirLigne5689 (x){
	tableau[x] =[];
	var n, nombresTmp =[];
	for (var y=0; y<9; y=y+3){
		nombres = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
		nombres.delTriplet (x,y);
		for (var z=y; z< y+3; z++){
			nombresTmp =[];
			for (n=0; n< nombres.length; n++) nombresTmp.push (nombres[n]);
			nombresTmp.delCroix (x,z);
			tableau[x].push (nombresTmp.enleverAleatoirement());
		}
}}
document.body.innerHTML = document.body.innerHTML + template;
var count =0;
tableau[0] = tableau[0].shuffle();
remplirLigne23 (1);
while (tableau[1].contains (undefined)) remplirLigne23 (1);
remplirLigne23 (2);
while (tableau[2].contains (undefined)) remplirLigne23 (2);
remplirLigne47 (3);
while (tableau[3].contains (undefined)) remplirLigne47 (3);
remplirLigne5689 (4);
while (tableau[4].contains (undefined)) remplirLigne5689 (4);
remplirLigne5689 (5);
while (tableau[5].contains (undefined)) remplirLigne5689 (5);
remplirLigne47 (6);
while (tableau[6].contains (undefined)) remplirLigne47 (6);
remplirLigne5689 (7);
while (tableau[7].contains (undefined)) remplirLigne5689 (7);
remplirLigne5689 (8);
while (tableau[8].contains (undefined)) remplirLigne5689 (8);
