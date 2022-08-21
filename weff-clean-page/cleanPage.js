// dépendance: text.js

var title = document.head.getElementsByTagName ('title')[0].innerHTML;
document.head.innerHTML = '<title>' + title + '</title>';
document.body.innerHTML = document.body.innerHTML.cleanHtml();

HTMLElement.prototype.clean = function(){
	// rechercher le main
	if (this.innerHTML.contain ('</main>')){
		var c=0;
		while (c< this.children.length){
			if (this.children[c].tagName == 'MAIN'){
				this.innerHTML = this.children[c].innerHTML;
				c= this.children.length +1;
			}
			c++;
	}}
	// éliminer les blocs inutiles
	for (var c= this.children.length -1; c>=0; c--){
		if (this.children[c].tagName == 'SCRIPT' || this.children[c].tagName == 'NOSCRIPT' || this.children[c].tagName == 'FOOTER')
			this.removeChild (this.children[c]);
		else if (this.children[c].tagName != 'svg'){
			if (! exists (this.children[c].innerHTML) && ! "A IMG BR HR".contain (this.children[c].tagName))
				this.removeChild (this.children[c]);
			else this.children[c].clean();
	}}
	if (this.childNodes.length ==1 && this.children.length ==1 && ! "A svg IMG BR HR".contain (this.children[0].tagName))
		this.innerHTML = this.children[0].innerHTML;
	// effacer les attributs
	for (var a= this.attributes.length -1; a>=0; a--) this.removeAttribute (this.attributes[a].name);
}
HTMLAnchorElement.prototype.clean = function(){
	for (var c= this.children.length -1; c>=0; c--) if (this.children[c].tagName != 'svg'){
		if (! exists (this.children[c].innerHTML) && ! "A IMG BR HR".contain (this.children[c].tagName)) this.removeChild (this.children[c]);
		else this.children[c].clean();
	}
	if (this.childNodes.length ==1 && this.children.length ==1) this.innerHTML = this.children[0].innerHTML;
	for (var a= this.attributes.length -1; a>=0; a--) if (this.attributes[a].name != 'href') this.removeAttribute (this.attributes[a].name);
}
HTMLButtonElement.prototype.clean = function(){
	for (var c= this.children.length -1; c>=0; c--) if (this.children[c].tagName != 'svg'){
		if (! exists (this.children[c].innerHTML) && ! "A IMG BR HR".contain (this.children[c].tagName)) this.removeChild (this.children[c]);
		else this.children[c].clean();
	}
	if (this.childNodes.length ==1 && this.children.length ==1) this.innerHTML = this.children[0].innerHTML;
	for (var a= this.attributes.length -1; a>=0; a--) if (this.attributes[a].name != 'onclick') this.removeAttribute (this.attributes[a].name);
}
HTMLImageElement.prototype.clean = function(){
	for (var a= this.attributes.length -1; a>=0; a--) if (this.attributes[a].name != 'src' && this.attributes[a].name != 'alt')
		this.removeAttribute (this.attributes[a].name);
}
function cleanBody(){
	if (document.body.innerHTML.contain ('</article>')){
		var text = document.body.innerHTML.sliceWords ('<article>', '</article>');
		document.body.innerHTML = text;
	}
}
document.body.clean();
document.body.innerHTML = document.body.innerHTML.cleanHtml();
cleanBody();