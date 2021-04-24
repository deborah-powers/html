// les chemins des fichiers js et css partent de la racine de l'extension
const cssFile = 'structure.css';
const cssFile2 = 'perso.css';
const jsFile = 'page.js';
const launchExtension = "launch appli";
const stopExtension = "stop appli";
const iconLaunch = 'icon-128.png';
const iconStop = 'icon-128-bis.png';

function initAction (tab){
	browser.pageAction.setIcon ({tabId: tab.id, path: "icon-128.png"});
	browser.pageAction.setTitle ({tabId: tab.id, title: launchExtension});
	browser.pageAction.show (tab.id);
}
// réinitialiser l'extension chaque fois que l'onglet est rafraîchi
browser.tabs.onUpdated.addListener (function (id, changeInfo, tab){
	initAction (tab);
});
// à l'ouverture de firefox, initialiser l'extension pour toutes les pages
var allTabs = browser.tabs.query({});
allTabs.then (function (tabs){
	for (var tab in tabs) initAction (tab);
});
function toggleExtension (tab){
	console.log (
		'je suis toggle !\n',
		'firefox\t', browser.pageAction,
		'chrome\t', chrome.pageAction, chrome.browserAction
	);
	function gotTitle (title){
		if (title === launchExtension){
			browser.pageAction.setIcon ({ tabId: tab.id, path: iconLaunch });
			browser.pageAction.setTitle ({ tabId: tab.id, title: stopExtension });
			browser.tabs.insertCSS ({ file: cssFile });
			browser.tabs.insertCSS ({ file: cssFile2 });
			browser.tabs.executeScript ({ file: jsFile });
		} else {
			browser.pageAction.setIcon ({ tabId: tab.id, path: iconStop });
			browser.pageAction.setTitle ({ tabId: tab.id, title: launchExtension });
			browser.tabs.removeCSS ({ file: cssFile });
			browser.tabs.removeCSS ({ file: cssFile2 });
		}
	}
	var gettingTitle = browser.pageAction.getTitle ({ tabId: tab.id });
	gettingTitle.then (gotTitle);
}
// lancer l'extention quand je clique sur l'icône
browser.pageAction.onClicked.addListener (toggleExtension);
