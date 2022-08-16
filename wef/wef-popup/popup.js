var cssCode = 'body { background-color: yellow; }';
function setColor (event){
	browser.tabs.removeCSS ({ code: cssCode });
	var colorName = event.target.id;
	cssCode = 'body { background-color: '+ colorName +'; }';
	browser.tabs.insertCSS ({ code: cssCode });
}
var plist = document.body.getElementsByTagName ('p');
for (var p=0; p<3; p++) plist[p].addEventListener ('click', setColor);
