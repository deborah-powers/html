// les chemins des fichiers js et css partent de la racine de l'extension
const cssCode = "body { border: 20px solid green; }";
const cssFile = 'structure.css';
const cssFile2 = 'perso.css';
const jsCode = "console.log ('coucou je suis le code')";
const jsFile = 'page.js';
const launchExtension = "launch appli";
const stopExtension = "stop appli";
const iconLaunch = 'icon-128.png';
const iconStop = 'icon-128-bis.png';

function initAction (tab){
	chrome.pageAction.setIcon ({tabId: tab.id, path: iconLaunch });
	chrome.pageAction.setTitle ({tabId: tab.id, title: launchExtension});
	chrome.pageAction.show (tab.id);
}
// réinitialiser l'extension chaque fois que l'onglet est rafraîchi
chrome.tabs.onUpdated.addListener (function (id, changeInfo, tab){
	initAction (tab);
});
// à l'ouverture de firefox, initialiser l'extension pour toutes les pages
var allTabs = chrome.tabs.query ({ currentWindow: true}, function (tabs){
	console.log (tabs);
	for (var t=0; t< tabs.length; t++) initAction (tabs[t]);
});
// allTabs.then (function (tabs){ for (var tab in tabs) initAction (tab); });
function toggleExtension (tab){
	function gotTitle (title){
		if (title === launchExtension){
			chrome.pageAction.setIcon ({ tabId: tab.id, path: iconLaunch });
			chrome.pageAction.setTitle ({ tabId: tab.id, title: stopExtension });
			chrome.tabs.insertCSS ({ file: cssFile });
			chrome.tabs.insertCSS ({ file: cssFile2 });
		//	chrome.tabs.insertCSS ({ code: cssCode });
			chrome.tabs.executeScript ({ file: jsFile });
		//	chrome.tabs.executeScript ({ code: jsCode });
		} else {
			chrome.pageAction.setIcon ({ tabId: tab.id, path: iconStop });
			chrome.pageAction.setTitle ({ tabId: tab.id, title: launchExtension });
			chrome.tabs.removeCSS ({ file: cssFile });
			chrome.tabs.removeCSS ({ file: cssFile2 });
		}
	}
	var gettingTitle = chrome.pageAction.getTitle ({ tabId: tab.id }, function (title){
		gotTitle (title);
	});
}
// lancer l'extention quand je clique sur l'icône
chrome.pageAction.onClicked.addListener (toggleExtension);
