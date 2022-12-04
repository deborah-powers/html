/* https://www.section.io/engineering-education/how-to-build-chrome-extension/
https://stackoverflow.com/questions/54619817/how-to-fix-unchecked-runtime-lasterror-could-not-establish-connection-receivi
*/
var cssCode = 'body { background-color: pink; }';

function setColor (tab){
	document.body.style.backgroundColor = 'yellow';
	chrome.tabs.query ({}, function (tabs){
		/*
		if (! tab.url.includes ('chrome://'))
			chrome.scripting.insertCSS ({
				target: { tabId: tab.id, allFrames: true },
				css: cssCode
			});*/
		chrome.tabs.sendMessage (tabs[1].id, { method: "changePage" }, function (response){
			alert ('coucou '+ response);
		});
	});
}
document.addEventListener ('DOMContentLoaded', function(){
	// document.body contient le body de la popup
	console.log (chrome.action);
	var plist = document.body.getElementsByTagName ('p');
	for (var p=0; p<3; p++) plist[p].addEventListener ('click', setColor, false);
}, false);
