String.prototype.contain = function (word){
	if (this.indexOf (word) >=0) return true;
	else return false;
}
String.prototype.replace = function (wordOld, wordNew){
	if (this.indexOf (wordOld) >=0){
		if (! wordNew) wordNew ="";
		var tabText = this.split (wordOld);
		return tabText.join (wordNew);
	}
	else return this;
}
String.prototype.strip = function(){
	var toStrip = '\n \t/';
	var text ="";
	for (var l=0; l< this.length; l++) text = text + this[l];
	var i=0, j=1;
	while (toStrip.contain (text[0])) text = text.slice (1);
	while (toStrip.contain (text [text.length -1])) text = text.slice (0, text.length -1);
	return text;
}
String.prototype.cleanTsv = function(){
	var textRes = this.replace ('\r');
	textRes = textRes.strip();
	while (textRes.contain ('  ')) textRes = textRes.replace ('  ', ' ');
	textRes = textRes.replace ('\n ', '\n');
	textRes = textRes.replace (' \n', '\n');
	while (textRes.contain ('\t\t')) textRes = textRes.replace ('\t\t', '\t');
	textRes = textRes.replace ('\t\n', '\n');
	while (textRes.contain ('\n\n')) textRes = textRes.replace ('\n\n', '\n');
	textRes = textRes.strip();
	var listRes =[];
	if (textRes){
		listRes = textRes.split ('\n');
		for (var l=0; l< listRes.length; l++) listRes[l] = listRes[l].split ('\t');
	}
	return listRes;
}
function fromTsv (fileName, callback){
	var xhttp = new XMLHttpRequest();
	if (callback){
		xhttp.responseType = 'text';
		xhttp.onreadystatechange = function(){ if (xhttp.status ==0 || xhttp.status ==200) callback (this.responseText.cleanTsv()); };
		xhttp.open ('GET', fileName, true);
		xhttp.send();
	}
	else{
		xhttp.open ('GET', fileName, false);
		xhttp.send();
		var listRes =[];
		if (xhttp.status ==0 || xhttp.status ==200) listRes = xhttp.responseText.cleanTsv();
		return listRes;
	}
}