function exists (object){
	if (object == null || object == undefined) return false;
	else if ((object.constructor == Array || object.constructor == HTMLCollection) && object.length ==0) return false;
	else if (typeof (object) == 'string'){
		if (object.length ==0 || object =="" || object ==" " || object =="\n" || object =="\t" || object =="\r") return false;
		else return true;
	}
	else return true;
}
String.prototype.index = function (word, pos){
	if (pos == null || pos == undefined) pos =0;
	var posReal = this.indexOf (word, pos);
	if (posReal <0 && word.includes ('"')){
		word = word.replace ('"', "'");
		posReal = this.indexOf (word, pos);
	}
	else if (posReal <0 && word.includes ("'")){
		word = word.replace ("'", '"');
		posReal = this.indexOf (word, pos);
	}
	return posReal;
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
	var text = this;
	var i=0, j=1;
	while (toStrip.index (text[0]) >=0) text = text.slice (1);
	while (toStrip.index (text [text.length -1]) >=0) text = text.slice (0, text.length -1);
	return text;
}
String.prototype.clean = function(){
	var text = this.replace ('\r');
	text = text.replace ('\n');
	text = text.replace ('\t');
	text = text.strip();
	while (text.includes ('  ')) text = text.replace ('  ', ' ');
	text = text.replace ('\n ', '\n');
	text = text.replace (' \n', '\n');
	text = text.replace ('\t ', '\t');
	text = text.replace (' \t', '\t');
	while (text.includes ('\t\t')) text = text.replace ('\t\t', '\t');
	text = text.replace ('\t\n', '\n');
	while (text.includes ('\n\n')) text = text.replace ('\n\n', '\n');
	text = text.strip();
	return text;
}
String.prototype.cleanEmptyTags = function(){
	var text = this.replace ('<br>', '<br/>');
	text = text.replace ('<hr>', '<hr/>');
	while (text.includes ('<br/><br/>')) text = text.replace ('<br/><br/>', '<br/>');
	text = text.replace ('<br/><', '<');
	text = text.replace ('><br/>', '>');
	text = text.replace ('<span></span>');
	text = text.replace ('<p></p>');
	text = text.replace ('<div></div>');
	return text;
}
HTMLImageElement.prototype.clean = function(){
	for (var a= this.attributes.length -1; a>=0; a--) if (this.attributes[a].name != 'src' && this.attributes[a].name != 'alt')
		this.removeAttribute (this.attributes[a].name);
}
HTMLInputElement.prototype.clean = function(){
	for (var a= this.attributes.length -1; a>=0; a--) if (! 'type name value id'.includes (this.attributes[a].name))
		this.removeAttribute (this.attributes[a].name);
}
HTMLElement.prototype.cleanBasic = function(){
	// éliminer les commentaires
	for (var c= this.childNodes.length -1; c>=0; c--) if (this.childNodes[c].constructor.name === 'Comment') this.removeChild (this.childNodes[c]);
	// éliminer les blocs inutiles
	for (var c= this.children.length -1; c>=0; c--){
		if (this.children[c].tagName == 'SCRIPT' || this.children[c].tagName == 'NOSCRIPT'
			|| this.children[c].tagName == 'HEADER' || this.children[c].tagName == 'FOOTER')
			this.removeChild (this.children[c]);
		else if (! exists (this.children[c].innerHTML) && ! "A IMG BR HR INPUT".includes (this.children[c].tagName))
			this.removeChild (this.children[c]);
	// nettoyer les enfants
		else this.children[c].clean();
	}
	if (this.children.length ===1 && this.childNodes.length ===1) this.innerHTML = this.children[0].innerHTML;
}
HTMLElement.prototype.clean = function(){
	this.cleanBasic();
//	for (var a= this.attributes.length -1; a>=0; a--) this.removeAttribute (this.attributes[a].name);
}
HTMLAnchorElement.prototype.clean = function(){
	this.cleanBasic();
	for (var a= this.attributes.length -1; a>=0; a--) if (this.attributes[a].name != 'href')
		this.removeAttribute (this.attributes[a].name);
}
HTMLFormElement.prototype.clean = function(){
	this.cleanBasic();
	for (var a= this.attributes.length -1; a>=0; a--) if (! 'action method'.includes (this.attributes[a].name))
		this.removeAttribute (this.attributes[a].name);
}
HTMLButtonElement.prototype.clean = function(){
	this.cleanBasic();
	for (var a= this.attributes.length -1; a>=0; a--) if (this.attributes[a].name != 'onclick')
		this.removeAttribute (this.attributes[a].name);
}
HTMLElement.prototype.findTag = function (tagName){
	var container = this.getElementsByTagName (tagName)[0];
	if (exists (container)) this.innerHTML = container.innerHTML;
	container = this.getElementsByClassName (tagName)[0];
	if (exists (container)) this.innerHTML = container.innerHTML;
	container = document.getElementById (tagName);
	if (exists (container)) this.innerHTML = container.innerHTML;
}
HTMLBodyElement.prototype.clean = function(){
	this.innerHTML = this.innerHTML.clean();
	this.findTag ('main');
	for (var a= this.attributes.length -1; a>=0; a--) this.removeAttribute (this.attributes[a].name);
	this.cleanBasic();
	this.innerHTML = this.innerHTML.cleanEmptyTags();
}