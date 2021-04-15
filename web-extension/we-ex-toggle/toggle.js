// les chemins des fichiers js et css partent de la racine de l'extension
const cssCode = "body { border: 20px solid green; }";
const cssFile = 'structure.css';
const cssFile2 = 'perso.css';
const jsCode = "console.log ('coucou je suis le code')";
const jsFile = 'page.js';
const launchExtension = "launch appli";
const stopExtension = "stop appli";

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
	function gotTitle (title){
		if (title === launchExtension){
			browser.pageAction.setIcon ({ tabId: tab.id, path: "icon-128-bis.png" });
			browser.pageAction.setTitle ({ tabId: tab.id, title: stopExtension });
			browser.tabs.insertCSS ({ file: cssFile });
			browser.tabs.insertCSS ({ file: cssFile2 });
		//	browser.tabs.insertCSS ({ code: cssCode });
			browser.tabs.executeScript ({ file: jsFile });
		//	browser.tabs.executeScript ({ code: jsCode });
		} else {
			browser.pageAction.setIcon ({ tabId: tab.id, path: "icon-128.png" });
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
