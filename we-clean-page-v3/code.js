chrome.tabs.query ({ currentWindow: true }, function (tabs){
	for (var t=1; t< tabs.length; t++){
		chrome.scripting.executeScript ({
			target: {tabId: tabs[t].id, allFrames: true},
			files: ['text.js', 'cleanPage.js']
		});
		chrome.scripting.insertCSS ({
			target: {tabId: tabs[t].id, allFrames: true},
			files: ['structure.css', 'perso.css'],
		});
}});
/*
Extension manifest must request permission to access this host
*/