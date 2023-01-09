function sendToBackend(){
	// ecrire le body propre dans un fichier grâce à un backend python
	const urlBE = 'http://localhost:1407/';
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if (this.readyState ===4 && this.status === 200) console.log ("les données ont bien été envoyées au back-end.\nsa réponse:", this.responseText);
		else console.log ("l'échange avec le back-end est en erreur.\nécoute-il sur le port 1407 ?\nétat =", this.readyState, 'status =', this.status);
	};
	xhttp.open ('POST', urlBE, true);
	data = document.getElementsByTagName ('title')[0].innerText;
	if (! exists (data) || data.length <3) data = 'tmp';
	data = data + '\n\n' + document.body.innerHTML;
	xhttp.send (data);
}
function sendToBackendFromEvent (event){
	// event.target contient le bouton (h1) de la popup sur lequel j'ai cliqué
	chrome.tabs.query ({currentWindow: true, active: true}, function (tabs){
		var activeTab = tabs[0];
		chrome.scripting.executeScript ({
			target: {tabId: activeTab.id, allFrames: true },
			function: sendToBackend
		});
	});
}
chrome.tabs.query ({currentWindow: true, active: true}, function (tabs){
	var activeTab = tabs[0];
	chrome.scripting.executeScript ({
		target: {tabId: activeTab.id, allFrames: true },
		files: [ 'cleanLib.js', 'cleanPage.js' ]
	});
	chrome.scripting.insertCSS ({
		target: {tabId: activeTab.id, allFrames: true},
		files: ['structure.css', 'perso.css'],
	});
});
document.addEventListener ('DOMContentLoaded', function(){
	// document.body contient le body de la popup
	var title = document.body.getElementsByTagName ('h1')[0];
	title.addEventListener ('click', sendToBackendFromEvent);
});
