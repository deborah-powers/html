const CSS = "body { border: 20px solid green; }";
const launchExtension = "Apply CSS";
const stopExtension = "Remove CSS";

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
			browser.pageAction.setIcon({tabId: tab.id, path: "icon-128-bis.png"});
			browser.pageAction.setTitle({tabId: tab.id, title: stopExtension});
			browser.tabs.insertCSS ({code: CSS});
		} else {
			browser.pageAction.setIcon({tabId: tab.id, path: "icon-128.png"});
			browser.pageAction.setTitle({tabId: tab.id, title: launchExtension});
			browser.tabs.removeCSS ({code: CSS});
		}
	}

	var gettingTitle = browser.pageAction.getTitle ({ tabId: tab.id });
	gettingTitle.then (gotTitle);
}
// lancer l'extention quand je clique sur l'icône
browser.pageAction.onClicked.addListener (toggleExtension);
