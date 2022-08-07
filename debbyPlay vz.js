// dépendence: text.js
var dpVarList =[];

function listVar(){
	document.body.innerHTML = document.body.innerHTML.replace ('\n');
	document.body.innerHTML = document.body.innerHTML.replace ('\t');
	document.body.innerHTML = document.body.innerHTML.clean();
	var bodyText = document.body.innerHTML.replace ('))', '((');
	var bodyList = bodyText.split ('((');
	for (var v=1; v< bodyList.length; v=v+2) dpVarList.push (bodyList[v]);
}
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
		}
	}
	else if (varValue.constructor.name == 'Object'){
		var d= this.index ('(('+ varName +'))');
		var f= this.index ('>',d) +1;
		d= this.rindex ('<',d);
		var template = this.slice (d,f);
		var text = this.slice (0,d) + this.slice (f);
		for (var l in varValue) if (typeof (varValue[l]) != 'function'){
			text = text.insert (template, d);
			text = text.printVarUnique (varName, varValue[l]);
		}
	}
	else text = this.replace ('(('+ varName +'))', varValue);
	return text;
}
function printVarList (varList){
	// for (var n=0; n< document.body.childNodes.length; n++) console.log (n, document.body.childNodes[n].textContent);
	for (var v=0; v< varList.length; v++){
		if (! varList[v].contain ('.')) document.body.innerHTML = document.body.innerHTML.printVarUnique (varList[v], this[varList[v]]);
		else{
			var listName = varList[v].split ('.');
			var varValue = this[listName[0]][listName[1]];
			for (var w=2; w< listName.length; w++) varValue = varValue[listName[w]];
			document.body.innerHTML = document.body.innerHTML.printVarUnique (varList[v], varValue);
		}
	}
}
