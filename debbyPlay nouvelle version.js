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
	var degre =1;
	if (this.length >0 && this[0].constructor.name == 'Array'){
		degre = degre + this[0].deep();
		return degre;
	}
	else return 1;
}
function printVarUnique (varName, varValue){
	if (varValue.constructor.name == 'Array'){
		// récupérer le tag de premier niveau
		var d= document.body.innerHTML.index ('(('+ varName +'))');
		var f=d;
		var deep = varValue.deep();
		while (deep >0){
			f= document.body.innerHTML.index ('>',f) +1;
			d= document.body.innerHTML.rindex ('<',d-1);
			deep = deep -1;
		}
		var template = document.body.innerHTML.slice (d,f);
		// gérer la profondeur
		for (var l= varValue.length -1; l>0; l--){
			printVarUnique (varName, varValue[l]);
			document.body.innerHTML = document.body.innerHTML.insert (template, d);
		}
		printVarUnique (varName, varValue[0]);
	}
	else if (varValue.constructor.name == 'Object'){
		var d= document.body.innerHTML.index ('(('+ varName +'))');
		var f= document.body.innerHTML.index ('>',d) +1;
		d= document.body.innerHTML.rindex ('<',d);
		var template = document.body.innerHTML.slice (d,f);
		document.body.innerHTML = document.body.innerHTML.slice (0,d) + document.body.innerHTML.slice (f);
		for (var l in varValue){
			document.body.innerHTML = document.body.innerHTML.insert (template, d);
			printVarUnique (varName, varValue[l]);
		}
	}
	else document.body.innerHTML = document.body.innerHTML.replace ('(('+ varName +'))', varValue);
}
function printVarList (varList){
	// for (var n=0; n< document.body.childNodes.length; n++) console.log (n, document.body.childNodes[n].textContent);
	for (var v=0; v< varList.length; v++){
		if (! varList[v].contain ('.')) printVarUnique (varList[v], this[varList[v]]);
		else{
			var listName = varList[v].split ('.');
			var varValue = this[listName[0]][listName[1]];
			for (var w=2; w< listName.length; w++) varValue = varValue[listName[w]];
			printVarUnique (varList[v], varValue);
		}
	}
}
