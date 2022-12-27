function changeColor (color){
	// document.body contient le body de la page
	document.body.style.backgroundColor = color;
}
function getTab (event){
	// event.target contient le bouton (p) de la popup sur lequel j'ai cliqué
	var color = event.target.style.backgroundColor;
    chrome.tabs.query ({currentWindow: true, active: true}, function (tabs){
        var activeTab = tabs[0];
        chrome.scripting.executeScript ({
			target: {tabId: activeTab.id, allFrames: true },
			function: changeColor,
			args: [ color ]
		});
    });
}
document.addEventListener ('DOMContentLoaded', function(){
	// document.body contient le body de la popup
	var plist = document.body.getElementsByTagName ('p');
	for (var p=0; p<3; p++) plist[p].addEventListener ('click', getTab);
});
