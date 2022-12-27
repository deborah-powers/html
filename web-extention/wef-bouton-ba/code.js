const cssCode = 'body { background-color: yellow; }';
var cssInserre = false;

browser.browserAction.onClicked.addListener (function(){
	if (cssInserre){
		browser.tabs.removeCSS ({ code: cssCode });
		cssInserre = false;
	}
	else{
		browser.tabs.insertCSS ({ code: cssCode });
		/*
		browser.tabs.insertCSS ({ file: cssFile });
		browser.tabs.executeScript ({ code: jsCode });
		browser.tabs.executeScript ({ file: jsFile });
		*/
		cssInserre = true;
	}
});