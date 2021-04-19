/* pas de alert /
console.log (
	'host:\t', window.location.hostname,
	'\npath:\t', window.location.pathname,
	'\nhash:\t', window.location.hash,
	'\nquery:\t', window.location.search
);*/
HTMLElement.prototype.clean = function(){
	var a=0;
	while (a< this.attributes.length){
		if (this.attributes[a].name == 'src' || this.attributes[a].name == 'href') a=1;
		else this.removeAttribute (this.attributes[a].name);
	}
	var n=0;
	while (n< this.children.length){
		if (this.children[n].tagName == 'SCRIPT') this.children[n].remove();
		else n++;
	}
	for (n=0; n< this.children.length; n++) this.children[n].clean();
}
if (window.location.hostname == 'archiveofourown.org'){
	document.head.innerHTML ="";
	document.body.clean();
	console.log (document.body.innerHTML);
	if (window.location.pathname.indexOf ('/works/search') ==0){
		var ficList = document.getElementsByClassName ('landmark heading');
		var nvBody =""
		for (var f=1; f< ficList.length; f++) nvBody = nvBody + ficList[f].innerHTML;
		document.body.innerHTML = nvBody;
	}
	else if (window.location.pathname.indexOf ('/works/') ==0){
		document.body.innerHTML = document.getElementsByClassName ('userstuff module')[0].innerHTML;
		document.body.clean();
	//	console.log (document.body.innerHTML);
	}
	else console.log ('non');
}

