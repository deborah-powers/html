browser.browserAction.onClicked.addListener (function(){
	browser.tabs.executeScript ({ file: 'text.js' });
	browser.tabs.executeScript ({ file: 'cleanPage.js' });
	browser.tabs.insertCSS ({ file: 'structure.css' });
	browser.tabs.insertCSS ({ file: 'perso.css' });
});