chrome.action.onClicked.addListener (function (tab){
	if (! tab.url.includes ('chrome://')){
		chrome.scripting.executeScript ({
			target: {tabId: tab.id, allFrames: true },
			files: [ 'cleanLib.js', 'cleanPage.js' ]
		});
		chrome.scripting.insertCSS ({
			target: {tabId: tab.id, allFrames: true},
			files: ['structure.css', 'perso.css'],
		});
}});
/*
function coucou(){ document.body.style.backgroundColor = 'red'; }
function: coucou
files: ['action.js']
*/