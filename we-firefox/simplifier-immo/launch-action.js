const launchExtension = "Apply CSS";
const stopExtension = "Remove CSS";
const cleanHead = `document.head.innerHTML = "<meta name='viewport' content='width=device-width,initial-scale=1'/><meta charset='utf-8'/>"`;

function initAction (tab){
	browser.pageAction.setIcon ({ tabId: tab.id, path: "fleur-rose.svg" });
	browser.pageAction.setTitle ({ tabId: tab.id, title: launchExtension });
	browser.pageAction.show (tab.id);
}
// réinitialiser l'extension chaque fois que l'onglet est rafraîchi
browser.tabs.onUpdated.addListener (function (id, changeInfo, tab){
	initAction (tab);
 });
// à l'ouverture de firefox, initialiser l'extension pour toutes les pages
var allTabs = browser.tabs.query ({ });
allTabs.then (function (tabs){
	for (var tab in tabs) initAction (tab);
 });
function toggleExtension (tab){
	function gotTitle (title){
		if (title === launchExtension){
			browser.pageAction.setIcon ({ tabId: tab.id, path: "fleur-bleue.svg" });
			browser.pageAction.setTitle ({ tabId: tab.id, title: stopExtension });
		//	browser.tabs.executeScript ({ code: cleanHead });
			browser.tabs.executeScript ({ file: 'clean-page.js' });
			browser.tabs.insertCSS ({ file: 'style.css' });
		} else {
			browser.pageAction.setIcon ({ tabId: tab.id, path: "fleur-rose.svg" });
			browser.pageAction.setTitle ({ tabId: tab.id, title: launchExtension });
			browser.tabs.reload();
		/*	browser.tabs.removeCSS ({ file: 'style.css' });
			browser.tabs.removeCSS ({ code: cleanCss });
		*/}
	}
	var gettingTitle = browser.pageAction.getTitle ({ tabId: tab.id });
	gettingTitle.then (gotTitle);
}
// lancer l'extention quand je clique sur l'icône
browser.pageAction.onClicked.addListener (toggleExtension);
