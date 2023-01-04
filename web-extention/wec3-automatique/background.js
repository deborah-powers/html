// récupérer le titre et nettoyer les headers
var header =`<title></title>
	<meta name='viewport' content='width=device-width,initial-scale=1'/>
	<meta charset='utf-8'/>
	<link rel='icon' type='image/svg+xml' href='https://deborah-powers.fr/data/nounours-perso.svg'/>
	<link rel='stylesheet' type='text/css' href='https://deborah-powers.fr/library-css/structure.css'/>
	<link rel='stylesheet' type='text/css' href='https://deborah-powers.fr/library-css/perso.css'/>
`;
var title = document.head.getElementsByTagName ('title')[0].innerHTML;
header = header.replace ('<title></title>', '<title>' + title + '</title>');
document.head.innerHTML = header;

var url = chrome.runtime.getURL ('personnages.png');
document.body.innerHTML = "<img src='" + url +"' alt='un couple'/>";