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
https://developer.chrome.com/docs/extensions/mv3/messaging/#external
*/
blocklistedExtension = 'vide';
chrome.runtime.onMessageExternal.addListener(
	function (request, sender, sendResponse){
		console.log ('sender', sender.id);
		if (sender.id === blocklistedExtension) console.log ('id ko');
		else console.log ('id ok');
});