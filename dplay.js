var bodyTemplate ="";
var variables =[];

function exists (object){
	if (object === null || object === undefined) return false;
	else if ((object.constructor === Array || object.constructor === HTMLCollection) && object.length ===0) return false;
	else if (typeof (object) == 'string' && (object.length ===0 || object ==="" || " \n\r\t".includes (object))) return false;
	else return true;
}
function getValueFromName (varName){
	var varValue = null;
	if (! varName.includes ('.')) varValue = window[varName];
	else{
		var listName = varName.split ('.');
		varValue = window[listName[0]][listName[1]];
		for (var w=2; w< listName.length; w++) varValue = varValue[listName[w]];
	}
	if (varValue == undefined) varValue = null;
	return varValue;
}
function setValueFromName (varName, varValue){
	if (varValue == undefined) varValue = null;
	if (! varName.includes ('.')){
		if (window[varName].constructor.name === 'Array' && varValue.constructor.name === window[varName][0].constructor.name)
			window[varName].push (varValue);
		else if (window[varName].constructor.name === varValue.constructor.name) window[varName] = varValue;
		else if (! 'Object Array'.includes (window[varName].constructor.name) && ! 'Object Array'.includes (varValue.constructor.name))
			window[varName] = varValue;
	}
	else{
		var listName = varName.split ('.');
		if (listName.length ==2) window[listName[0]][listName[1]] = varValue;
		else if (listName.length ==3) window[listName[0]][listName[1]][listName[2]] = varValue;
		else if (listName.length ==4) window[listName[0]][listName[1]][listName[2]][listName[3]] = varValue;
		else if (listName.length ==5) window[listName[0]][listName[1]][listName[2]][listName[3]][listName[4]] = varValue;
		else if (listName.length ==6) window[listName[0]][listName[1]][listName[2]][listName[3]][listName[4]][listName[5]] = varValue;
}}
HTMLElement.prototype.printListItem = function (item){
}
HTMLElement.prototype.print = function(){
	for (var c=0; c< this.children.length; c++) this.children[c].print();
	if (this.getAttribute ('for')){
		// une liste d'objet
		var varName = this.getAttribute ('for');
		var varValue = getValueFromName (varName);
		if (varValue.constructor === Array){
			console.log (this.tagName, 'liste', varName, varValue);
			/*
			var nodeNew;
			var i=0;
			for (; i< varValue.length -1; i++){
				nodeNew = this.copy();
				nodeNew.print();
				// action
				this.parentElement.insertBefore (nodeNew, this);
			}
			// action
			*/
		}
		else if (varValue.constructor.name === 'Object') console.log (this.tagName, 'dico', varName, varValue);
	}
}
HTMLElement.prototype.copy = function(){
	var newNode = this.cloneNode();
	if (this.innerHTML) newNode.innerHTML = this.innerHTML;
	if (this.value) newNode.value = this.value;
	if (this.className) newNode.className = this.className;
	if (this.parentNode) this.parentNode.insertBefore (newNode, this);
	return newNode;
}
Array.prototype.deep = function(){
	if (this.length >0 && this[0].constructor.name == 'Array'){
		var degre =1;
		degre = degre + this[0].deep();
		return degre;
	}
	else return 1;
}
function dpInit(){
	// nettoyer le texte
	document.body.innerHTML = document.body.innerHTML.clean();
	bodyTemplate = document.body.innerHTML;
	console.log (this);
	// récupérer les variables
	for (var item in this) if (exists (this[item]) && 'Array Object String Number'.includes (this[item].constructor.name)) console.log (item, this[item], this[item].constructor.name);
	// affichage basique
	document.body.print();
}
String.prototype.replace = function (wordOld, wordNew){
	if (this.includes (wordOld)){
		if (! wordNew) wordNew ="";
		var tabText = this.split (wordOld);
		return tabText.join (wordNew);
	}
	else return this;
}
String.prototype.clean = function(){
	var text = this.replace ('\r');
	text = text.replace ('\n'," ");
	text = text.replace ('\t'," ");
	while (text.includes ('  ')) text = text.replace ('  ', ' ');
	if (text[0] ===" ") text = text.slice (1);
	if (text [text.length -1] ===" ") text = text.slice (0, text.length -1);
	text = text.replace ('<br>', '<br/>');
	text = text.replace ('<hr>', '<hr/>');
	while (text.includes ('<br/><br/>')) text = text.replace ('<br/><br/>', '<br/>');
	text = text.replace ('<br/><', '<');
	text = text.replace ('><br/>', '>');
	text = text.replace ('<span></span>');
	text = text.replace ('<p></p>');
	text = text.replace ('<div></div>');
	text = text.replace ('(( ', '((');
	text = text.replace (' ))', '))');
	return text;
}