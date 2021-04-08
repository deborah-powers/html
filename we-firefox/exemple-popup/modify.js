function chooseMySmiley (request, sender, sendResponse){
	while (document.body.firstChild) document.body.firstChild.remove();
	var smileyImage = document.createElement ('img');
	console.log (request);
	console.log (sender);
	console.log (sendResponse);
	smileyImage.setAttribute ('src', request.smileyUrl);
	smileyImage.setAttribute ('style', 'width: 6cm');
	smileyImage.setAttribute ('style', 'height: 9cm');
	document.body.appendChild (smileyImage);
	browser.runtime.onMessage.removeListener (chooseMySmiley);
}
browser.runtime.onMessage.addListener (chooseMySmiley);