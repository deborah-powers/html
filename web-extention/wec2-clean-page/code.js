chrome.browserAction.onClicked.addListener (function(){
		chrome.tabs.executeScript ({ file: 'text.js' });
		chrome.tabs.executeScript ({ file: 'cleanPage.js' });
		chrome.tabs.insertCSS ({ file: 'structure.css' });
		chrome.tabs.insertCSS ({ file: 'perso.css' });
});
