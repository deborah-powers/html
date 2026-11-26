var tableau =[
	[ '1', '2', '3', '4', '5', '6', '7', '8', '9' ],
	[ [], [], [], [], [], [], [], [], [] ],
	[ [], [], [], [], [], [], [], [], [] ],
	[ [], [], [], [], [], [], [], [], [] ],
	[ [], [], [], [], [], [], [], [], [] ],
	[ [], [], [], [], [], [], [], [], [] ],
	[ [], [], [], [], [], [], [], [], [] ],
	[ [], [], [], [], [], [], [], [], [] ],
	[ [], [], [], [], [], [], [], [], [] ]
];
Array.prototype.randomPosition = function(){
	if (this.length ===0) return -1;
	else if (this.length ===1) return 0;
	var posFloat = Math.random();
	posFloat = posFloat * this.length;
	const pos = Math.floor (posFloat);
	return pos;
}
Array.prototype.randomValue = function(){
	const pos = this.randomPosition();
	if (pos ===-1) return null;
	else return this[pos];
}
Array.prototype.randomValueSpliced = function(){
	const pos = this.randomPosition();
	if (pos ===-1) return null;
	else return this.splice (pos, 1)[0];
}
Array.prototype.shuffle = function(){
	var pos =-1;
	var newList =[];
	while (this.length >0) newList.push (this.randomValueSpliced());
	return newList;
}
Array.prototype.remove = function (valeurCase){
	const pos = this.indexOf (valeurCase);
	if (pos >=0) var trash = this.splice (pos, 1);
}
function fillTable(){
	tableau[0] = tableau[0].shuffle();
	var emptyCases = false;
	for (var i=1; i<9; i++){
		var posI = i%3;
		for (var j=0; j<9; j++){
			tableau[i][j] =[ '1', '2', '3', '4', '5', '6', '7', '8', '9' ];
			// vérifier les lignes
			for (var k=0; k<j; k++){ if (tableau[i][j].includes (tableau[i][k])) tableau[i][j].remove (tableau[i][k]); }
			// vérifier les colonnes
			for (var k=0; k<i; k++){ if (tableau[i][j].includes (tableau[k][j])) tableau[i][j].remove (tableau[k][j]); }
			// vérifier les carrés
			var posJ = j%3;
			if (posI >=1){
				if (posJ ===0 && tableau[i][j].includes (tableau[i-1][j+2])) tableau[i][j].remove (tableau[i-1][j+2]);
				if (posJ <=1 && tableau[i][j].includes (tableau[i-1][j+1])) tableau[i][j].remove (tableau[i-1][j+1]);
				if (posJ >=1 && tableau[i][j].includes (tableau[i-1][j-1])) tableau[i][j].remove (tableau[i-1][j-1]);
				if (posJ ===2 && tableau[i][j].includes (tableau[i-1][j-2])) tableau[i][j].remove (tableau[i-1][j-2]);
			}
			if (posI ===2){
				if (posJ ===0 && tableau[i][j].includes (tableau[i-2][j+2])) tableau[i][j].remove (tableau[i-2][j+2]);
				if (posJ <=1 && tableau[i][j].includes (tableau[i-2][j+1])) tableau[i][j].remove (tableau[i-2][j+1]);
				if (posJ >=1 && tableau[i][j].includes (tableau[i-2][j-1])) tableau[i][j].remove (tableau[i-2][j-1]);
				if (posJ ===2 && tableau[i][j].includes (tableau[i-2][j-2])) tableau[i][j].remove (tableau[i-2][j-2]);
			}
			// --------------------
			if (tableau[i][j].length ===0) emptyCases = true;
			tableau[i][j] = tableau[i][j].randomValue();
	}}
	if (emptyCases) fillTable();
}
fillTable();
// afficher les cases. garder certaines vides
const cases = document.getElementsByTagName ('span');
function showValue(){
	if (Math.random() <0.4) return true;
	else return false;
}
// interractivité
HTMLSpanElement.prototype.makeInterractive = function(){
	this.setAttribute ('tabindex', '1');
//	this.setAttribute ('role', 'button');
	this.className = 'fixing';
	this.addEventListener ('click', selectCase);
}
HTMLSpanElement.prototype.makeShowable = function (i,j){ console.log ('fonction basique'); }
var currentCase = null;
function selectCase (event){
	if (currentCase) currentCase.classList.remove ('current');
	currentCase = event.target;
	if (currentCase.tagName !== 'SPAN') currentCase = currentCase.parentElement;
	currentCase.className = currentCase.className + ' current';
}
const grilleInner = `<span aria-description='ligne 1 colonne 1'></span><span aria-description='colonne 2'></span><span aria-description='colonne 3'></span><span aria-description='colonne 4'></span><span aria-description='colonne 5'></span><span aria-description='colonne 6'></span><span aria-description='colonne 7'></span><span aria-description='colonne 8'></span><span aria-description='colonne 9'></span><span aria-description='ligne 2 colonne 1'></span><span aria-description='colonne 2'></span><span aria-description='colonne 3'></span><span aria-description='colonne 4'></span><span aria-description='colonne 5'></span><span aria-description='colonne 6'></span><span aria-description='colonne 7'></span><span aria-description='colonne 8'></span><span aria-description='colonne 9'></span><span aria-description='ligne 3 colonne 1'></span><span aria-description='colonne 2'></span><span aria-description='colonne 3'></span><span aria-description='colonne 4'></span><span aria-description='colonne 5'></span><span aria-description='colonne 6'></span><span aria-description='colonne 7'></span><span aria-description='colonne 8'></span><span aria-description='colonne 9'></span><span aria-description='ligne 4 colonne 1'></span><span aria-description='colonne 2'></span><span aria-description='colonne 3'></span><span aria-description='colonne 4'></span><span aria-description='colonne 5'></span><span aria-description='colonne 6'></span><span aria-description='colonne 7'></span><span aria-description='colonne 8'></span><span aria-description='colonne 9'></span><span aria-description='ligne 5 colonne 1'></span><span aria-description='colonne 2'></span><span aria-description='colonne 3'></span><span aria-description='colonne 4'></span><span aria-description='colonne 5'></span><span aria-description='colonne 6'></span><span aria-description='colonne 7'></span><span aria-description='colonne 8'></span><span aria-description='colonne 9'></span><span aria-description='ligne 6 colonne 1'></span><span aria-description='colonne 2'></span><span aria-description='colonne 3'></span><span aria-description='colonne 4'></span><span aria-description='colonne 5'></span><span aria-description='colonne 6'></span><span aria-description='colonne 7'></span><span aria-description='colonne 8'></span><span aria-description='colonne 9'></span><span aria-description='ligne 7 colonne 1'></span><span aria-description='colonne 2'></span><span aria-description='colonne 3'></span><span aria-description='colonne 4'></span><span aria-description='colonne 5'></span><span aria-description='colonne 6'></span><span aria-description='colonne 7'></span><span aria-description='colonne 8'></span><span aria-description='colonne 9'></span><span aria-description='ligne 8 colonne 1'></span><span aria-description='colonne 2'></span><span aria-description='colonne 3'></span><span aria-description='colonne 4'></span><span aria-description='colonne 5'></span><span aria-description='colonne 6'></span><span aria-description='colonne 7'></span><span aria-description='colonne 8'></span><span aria-description='colonne 9'></span><span aria-description='ligne 9 colonne 1'></span><span aria-description='colonne 2'></span><span aria-description='colonne 3'></span><span aria-description='colonne 4'></span><span aria-description='colonne 5'></span><span aria-description='colonne 6'></span><span aria-description='colonne 7'></span><span aria-description='colonne 8'></span><span aria-description='colonne 9'></span>`;
function newGrid(){
	fillTable();
	const grille = document.body.getElementsByClassName ('grille')[0];
	grille.innerHTML = grilleInner;
//	grille.innerHTML = '<span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>';
	for (var i=0; i<9; i++){
		for (var j=0; j<9; j++){
			if (showValue()){
				cases[i*9+j].className = 'fixe';
				cases[i*9+j].makeShowable (i,j);
			}
			else cases[i*9+j].makeInterractive();
}}}
