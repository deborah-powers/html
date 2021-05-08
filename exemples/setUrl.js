const urlJobSite = '../../site-perso/';
const urlJobHtml = '';
const urlHouseSite = 'file:///C:/wamp64/www/site-dp/';
const urlHouseHtml = 'file:///C:/Users/debor/html/';

const urlSite = urlHouseSite;
const urlHtml = urlHouseHtml;
var urlLocal ='';

var d=1+ document.location.href.lastIndexOf ('/');
urlLocal = document.location.href.substring (0,d);

var base = document.getElementsByTagName ('base')[0];
if (base){
	bs= base.href.indexOf ('/s/');
	bh= base.href.indexOf ('/h/');
	if (bs>1) base.href = urlSite + base.href.substring (bs+3);
	else if (bh>1) base.href = urlHtml + base.href.substring (bh+3);
}
var linkList = document.getElementsByTagName ('link');
for (var l=0; l< linkList.length; l++){
	ds= linkList[l].href.indexOf ('/s/');
	dh= linkList[l].href.indexOf ('/h/');
	dl= linkList[l].href.indexOf ('/l/');
	if (ds>1) linkList[l].href = urlSite + linkList[l].href.substring (ds+3);
	else if (dh>1) linkList[l].href = urlHtml + linkList[l].href.substring (dh+3);
	else if (dl>1) linkList[l].href = urlHtml + linkList[l].href.substring (dl+3);
}
/*
var scriptList = document.getElementsByTagName ('script');
for (var l=0; l< scriptList.length; l++){
	ds= scriptList[l].src.indexOf ('/s/');
	dh= scriptList[l].src.indexOf ('/h/');
	if (ds>1 || dh >1){
		var src = scriptList[l].src;
		if (ds>1) src = urlSite + src.substring (ds+3);
		else if (dh>1) src = urlHtml + src.substring (dh+3);
		var newScript = document.createElement ('script');
		newScript.src = src;
		scriptList[l].after (newScript);
		scriptList[l].remove();
		console.log ('src', newScript.src);
	}
	*
		document.body.appendChild (newScript);
	if (ds>1) scriptList[l].setAttribute ('src', urlSite + scriptList[l].src.substring (ds+3));
	else if (dh>1) scriptList[l].setAttribute ('src', urlHtml + scriptList[l].src.substring (dh+3));
	console.log (scriptList[l].src);
	*
}*/



