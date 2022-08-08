// dépendence: text.js
var dpVarList =[];
var bodyTemplate ="";


Array.prototype.deep = function(){
	if (this.length >0 && this[0].constructor.name == 'Array'){
		var degre =1;
		degre = degre + this[0].deep();
		return degre;
	}
	else return 1;
}
String.prototype.printVarUnique = function (varName, varValue){
	var text = null;
	if (varValue.constructor.name == 'Array'){
		// récupérer le tag de premier niveau
		var d= this.index ('(('+ varName +'))');
		var f=d;
		var deep = varValue.deep();
		while (deep >0){
			f= this.index ('>',f) +1;
			d= this.rindex ('<',d-1);
			deep = deep -1;
		}
		var template = this.slice (d,f);
		var message = null;
		text = this.slice (0,d) + this.slice (f);
		// gérer la profondeur
		for (var l= varValue.length -1; l>=0; l--){
			message = template.printVarUnique (varName, varValue[l]);
			text = text.insert (message, d);
	}}
	else if (varValue.constructor.name == 'Object'){
		var d= this.index ('(('+ varName +'))');
		var f= this.index ('>',d) +1;
		d= this.rindex ('<',d);
		var template = this.slice (d,f);
		var text = this.slice (0,d) + this.slice (f);
		for (var l in varValue) if (typeof (varValue[l]) != 'function'){
			text = text.insert (template, d);
			text = text.printVarUnique (varName, varValue[l]);
	}}
	else text = this.replace ('(('+ varName +'))', varValue);
	return text;
}
function getValueFromName (varName){
	var varValue = null;
	if (! varName.contain ('.')) varValue = this[varName];
	else{
		var listName = varName.split ('.');
		varValue = this[listName[0]][listName[1]];
		for (var w=2; w< listName.length; w++) varValue = varValue[listName[w]];
	}
	if (varValue == undefined) varValue = null;
	return varValue;
}
function setValueFromName (varName, varValue){
	if (varValue == undefined) varValue = null;
	if (! varName.contain ('.')) this[varName] = varValue;
	else{
		var listName = varName.split ('.');
		if (listName.length ==2) this[listName[0]][listName[1]] = varValue;
		else if (listName.length ==3) this[listName[0]][listName[1]][listName[2]] = varValue;
		else if (listName.length ==4) this[listName[0]][listName[1]][listName[2]][listName[3]] = varValue;
		else if (listName.length ==5) this[listName[0]][listName[1]][listName[2]][listName[3]][listName[4]] = varValue;
		else if (listName.length ==6) this[listName[0]][listName[1]][listName[2]][listName[3]][listName[4]][listName[5]] = varValue;
}}
// gérer les inputs
HTMLInputElement.prototype.reload = function(){
	setValueFromName (this.name, this.value);
	document.body.innerHTML = bodyTemplate;
	printVarList();
}
HTMLTextAreaElement.prototype.reload = function(){
	setValueFromName (this.name, this.value);
	document.body.innerHTML = bodyTemplate;
	printVarList();
}
function printInput (type){
	var inputList = document.getElementsByTagName (type);
	for (var i=0; i< inputList.length; i++){
		var varValue = getValueFromName (inputList[i].name);
		if (varValue){
			inputList[i].value = varValue;
			inputList[i].addEventListener ('change', function (event){ event.target.reload(); });
}}}
// les conditions
HTMLElement.prototype.printCondition = function(){
	if (this.getAttribute ('if')){
		var printBlock = eval (this.getAttribute ('if'));
		if (printBlock) for (var c=0; c< this.children.length; c++) this.children[c].printCondition();
		else this.style.display = 'none';
	}
	else for (var c=0; c< this.children.length; c++) this.children[c].printCondition();
}

HTMLElement.prototype.findVar = function(){
	if (this.innerHTML.contain ('((')){
		if (this.children.length ==0) console.log (this.tagName, this.innerHTML);
		else for (var c=0; c< this.children.length; c++){
			console.log (this.tagName, this.children, this.childNodes);
			this.children[c].findVar();
		}
}}
function printVarList(){
	document.body.findVar();
	// for (var n=0; n< document.body.childNodes.length; n++) console.log (n, document.body.childNodes[n].textContent);
	for (var v=0; v< dpVarList.length; v++){
		var varValue = getValueFromName (dpVarList[v]);
		document.body.innerHTML = document.body.innerHTML.printVarUnique (dpVarList[v], varValue);
	}
	printInput ('input');
	printInput ('textarea');
	document.body.printCondition();
}
function dpInit(){
	bodyTemplate = document.body.innerHTML;
	document.body.innerHTML = document.body.innerHTML.replace ('\n');
	document.body.innerHTML = document.body.innerHTML.replace ('\t');
	document.body.innerHTML = document.body.innerHTML.clean();
	var bodyText = document.body.innerHTML.replace ('))', '((');
	var bodyList = bodyText.split ('((');
	for (var v=1; v< bodyList.length; v=v+2) dpVarList.push (bodyList[v]);
	printVarList();
}