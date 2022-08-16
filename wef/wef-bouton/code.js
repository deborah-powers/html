var cssCode = 'body { background-color: yellow; }';
var cssInserre = false;

browser.browserAction.onClicked.addListener (function(){
	if (cssInserre){
		browser.tabs.removeCSS ({ code: cssCode });
		cssInserre = false;
	}
	else{
		browser.tabs.insertCSS ({ code: cssCode });
		cssInserre = true;
	}
});