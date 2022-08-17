const cssCode = 'body { background-color: orange; }';

function initAction (tab){
	chrome.pageAction.setIcon ({tabId: tab.id, path: 'icon-128.png' });
	chrome.pageAction.setTitle ({tabId: tab.id, title: 'launch appli' });
	chrome.pageAction.show (tab.id);
}
// réinitialiser l'extension chaque fois que l'onglet est rafraîchi
chrome.tabs.onUpdated.addListener (function (id, changeInfo, tab){ initAction (tab); });

// à l'ouverture de firefox, initialiser l'extension pour toutes les pages
var allTabs = chrome.tabs.query ({ currentWindow: true}, function (tabs){
	for (var t=0; t< tabs.length; t++) initAction (tabs[t]);
});
function toggleExtension (tab){
	function gotTitle (title){
		if (title === 'launch appli'){
			chrome.pageAction.setIcon ({ tabId: tab.id, path: 'icon-128-bis.png' });
			chrome.pageAction.setTitle ({ tabId: tab.id, title: 'stop appli' });
			chrome.tabs.insertCSS ({ code: cssCode });
			/*
			browser.tabs.insertCSS ({ file: cssFile });
			browser.tabs.executeScript ({ code: jsCode });
			browser.tabs.executeScript ({ file: jsFile });
			*/
		} else {
			chrome.pageAction.setIcon ({ tabId: tab.id, path: 'icon-128.png' });
			chrome.pageAction.setTitle ({ tabId: tab.id, title: 'launch appli' });
			chrome.tabs.removeCSS ({ code: cssCode });
		}
	}
	var gettingTitle = chrome.pageAction.getTitle ({ tabId: tab.id }, function (title){ gotTitle (title); });
}
// lancer l'extention quand je clique sur l'icône
chrome.pageAction.onClicked.addListener (toggleExtension);
