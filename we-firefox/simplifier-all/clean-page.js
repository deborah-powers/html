// nettoyer les headers
document.head.innerHTML = "<meta name='viewport' content='width=device-width,initial-scale=1'/><meta charset='utf-8'/>";
console.log ('hostname', window.location.hostname, '\npath', window.location.pathname, '\nsection', window.location.hash, '\nquery', window.location.search);

// site menace théoriste
if (window.location.hostname == 'menace-theoriste.fr'){
	var navigation = document.getElementById ('avia-menu');
	var container = document.getElementById ('main');
	document.body.innerHTML = container.innerHTML;

	if (window.location.pathname && '/biais-cognitifs-et-sophismes/ideologies/rationnel/zetetique/'.indexOf (window.location.pathname) <0){
		// seulement pour les articles
		container = document.getElementsByTagName ('article')[0];
		document.body.innerHTML = container.innerHTML;
		container = document.getElementsByClassName ('entry-content')[0];
		document.body.innerHTML = container.innerHTML;
	}
	document.body.innerHTML = "<ul id='navigation'>" + navigation.innerHTML +'</ul>' + document.body.innerHTML;
}
// site fiction press
else if (window.location.hostname == 'www.fictionpress.com'){
	var newBody ="";
	if (! window.location.pathname || window.location.pathname =='/') pass;
	else if (window.location.pathname.indexOf ('/s/') >=0){
		newBody = document.getElementById ('chap_select').outerHTML + document.getElementById ('storytext').innerHTML;
		document.body.innerHTML = newBody;
	}
	else if (window.location.pathname.indexOf ('/u/') <0){
		// liste des histoires
		var storyList = document.getElementsByClassName ('z-list zhover zpointer');
		var newDiv =null;
		for (var s=0; s< storyList.length; s++){
			newDiv = document.createElement ('div');
			newDiv.appendChild (storyList[s].getElementsByTagName ('a')[0]);
			newDiv.appendChild (storyList[s].getElementsByClassName ('z-indent z-padtop')[0]);
			newBody = newDiv.outerHTML + newBody;
		}
		newBody = document.getElementsByTagName ('center')[0].outerHTML + newBody;
		document.head.innerHTML = document.head.innerHTML + `<style type='text/css'>
	a {	font-weight: bold;	}
	body {	background-color: ivory;	}
</style>`;
		document.body.innerHTML = newBody;
}}
else if (window.location.hostname == 'www.slate.fr'){
	document.head.innerHTML = document.head.innerHTML + "<base target='blank' href='http://www.slate.fr/'>";
	if (window.location.pathname.indexOf ('/story/') ==0){
		var text = '<h1>'+ document.getElementsByTagName ('h1')[0].innerText +'</h1><h2>'+ document.getElementsByTagName ('h2')[0].innerText +'</h2>';
		var author = document.getElementsByClassName ('author')[0];
		author.innerHTML = 'auteur: '+ author.innerHTML;
		var article = document.getElementsByClassName ('field-items')[0];
		article = article.children[0];
		text = text + author.outerHTML + article.innerHTML;
		document.body.innerHTML = text;
		var addList = document.getElementsByClassName ('optidigital-ad-center');
		for (var a in addList) document.body.removeChild (addList[a]);
	}
	else if (window.location.pathname){
		var text = '<h1>rubrique: '+ window.location.pathname.slice (1,-1) +'</h1><p>'
			+ document.getElementsByClassName ('header__articles-nb')[0].innerText +'</p>';
		var articleList = document.getElementsByClassName ('article-list__inner');
		for (var a=0; a< articleList.length; a++){
			var img = articleList[a].getElementsByTagName ('img')[0];
			var article = "<a class='h2' href='"
				+ articleList[a].getElementsByTagName ('a')[0].getAttribute ('href') +"'>" + img.getAttribute ('alt')
				+ "</a><img src='" + img.getAttribute ('src') + "'>"
				+ articleList[a].getElementsByClassName ('content__chapo')[0].outerHTML;
			text = text + article;
		}
		document.head.innerHTML = document.head.innerHTML + `<style type='text/css'>
	a.h2 {
		display: block;
		font-size: 1.6em;
	}
</style>`;
		document.body.innerHTML = text;
}}
else if (window.location.hostname == 'paris.onvasortir.com'){
		// pour la liste des sorties
	if (window.location.pathname.indexOf ('vue_sortie_day.php') ==1) var newBody = document.getElementsByClassName ('Pad1Color2')[0];
	// pour une sortie
	else if (window.location.pathname){
		var frameList = document.getElementsByClassName ('encadrage');
		var newBody = document.createElement ('div');
		for (var f=0; f< frameList.length; f++){
			var tmp = document.createElement ('p');
			tmp.innerHTML =f;
			newBody.appendChild (tmp);
			newBody.appendChild (frameList[f]);
		}



	}
	document.body.innerHTML = newBody.innerHTML;
}
function cleanNode (node){
	// supprimer les attributs d'un noeud
	var newNode = document.createElement (node.tagName);
	if (node.tagName =='A') newNode.setAttribute ('href', node.getAttribute ('href'));
	if (node.children.length <1){
		newNode.innerHTML = node.innerHTML;
		// nettoyer le texte des liens
		if (node.tagName =='A'){
			if (newNode.innerHTML.indexOf ('/') >=0){
				newNode.innerHTML = newNode.innerHTML.replace ('www.', "");
				if (newNode.innerHTML [newNode.innerHTML.length -1] =='/') newNode.innerHTML = newNode.innerHTML.slice (0,-1);
				var d= newNode.innerHTML.lastIndexOf ('/') +1;
				newNode.innerHTML = newNode.innerHTML.slice (d);
				if (newNode.innerHTML.indexOf ('.') >=0){
					d= newNode.innerHTML.lastIndexOf ('.');
					newNode.innerHTML = newNode.innerHTML.slice (0,d);
				}
				while (newNode.innerHTML.indexOf ('-') >=0) newNode.innerHTML = newNode.innerHTML.replace ('-',' ');
				while (newNode.innerHTML.indexOf ('_') >=0) newNode.innerHTML = newNode.innerHTML.replace ('_',' ');
				newNode.innerHTML = ' '+ newNode.innerHTML +' ';
			}
		}
		// récupérer les attributs importants des autres tags
		else if ('IMG SCRIPT'.indexOf (node.tagName) >=0) newNode.setAttribute ('src', node.getAttribute ('src'));
		else if (node.tagName == 'BUTTON') newNode.setAttribute ('onclick', node.getAttribute ('onclick'));
		else if (node.tagName == 'FORM') newNode.setAttribute ('action', node.getAttribute ('action'));
		else if ('INPUT TEXTAREA'.indexOf (node.tagName) >=0){
			if (node.getAttribute ('value')) newNode.setAttribute ('value', node.getAttribute ('value'));
			newNode.setAttribute ('name', node.getAttribute ('name'));
			if (node.tagName == 'INPUT') newNode.setAttribute ('type', node.getAttribute ('type'));
	}}
	// appliquer la fonction à tous les enfants d'un noeud
	else{
		for (var c=0; c< node.children.length; c++){
			var res = cleanNode (node.children[c]);
			newNode.appendChild (res);
		//	if (node.children[c].tagName != 'SCRIPT'){}
	}}
	return newNode;
}
var newBody = cleanNode (document.body);
document.body.innerHTML = newBody.innerHTML;
