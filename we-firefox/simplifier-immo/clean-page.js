// nettoyer les headers
document.head.innerHTML = "<meta name='viewport' content='width=device-width,initial-scale=1'/><meta charset='utf-8'/>";
// console.log ('hostname', window.location.hostname, '\npath', window.location.pathname, '\nsection', window.location.hash, '\nquery', window.location.search);

if (window.location.hostname == 'www.logic-immo.com'){
	var divList = document.getElementsByClassName ('offer-details');
	var text ="";
	for (var i=0; i< divList.length(); i++){
		console.log (i, divList[i]);
		text = text + divList[i].innerHTML;
	}
	document.body.innerHTML = text;
}
var newBody = cleanNode (document.body);
document.body.innerHTML = newBody.innerHTML;
