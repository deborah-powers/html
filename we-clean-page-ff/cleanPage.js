var title = document.head.getElementsByTagName ('title')[0].innerHTML;
document.head.innerHTML = '<title>' + title + '</title>';
document.body.innerHTML = document.body.innerHTML.cleanHtml();

HTMLElement.prototype.clean = function(){
	for (var c= this.children.length -1; c>=0; c--) if (this.children[c].tagName != 'svg'){
		if (! exists (this.children[c].innerHTML) && ! "A IMG BR HR".contain (this.children[c].tagName)) this.removeChild (this.children[c]);
		else this.children[c].clean();
	}
	if (this.childNodes.length ==1 && this.children.length ==1 && ! "A svg IMG BR HR".contain (this.children[0].tagName))
		this.innerHTML = this.children[0].innerHTML;
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
for (var c= document.body.children.length -1; c>=0 ; c--){
	if (document.body.children[c].tagName == 'SCRIPT') document.body.removeChild (document.body.children[c]);
	else if (document.body.children[c].tagName == 'NOSCRIPT') document.body.removeChild (document.body.children[c]);
	else if (document.body.children[c].tagName == 'FOOTER') document.body.removeChild (document.body.children[c]);
}
document.body.clean();
document.body.innerHTML = document.body.innerHTML.cleanHtml();

if (document.body.innerHTML.contain ('</main>')){
	var text = document.body.innerHTML.sliceWords ('<main>', '</main>');
	document.body.innerHTML = text;
}
if (document.body.innerHTML.contain ('</article>')){
	var text = document.body.innerHTML.sliceWords ('<article>', '</article>');
	document.body.innerHTML = text;
}
