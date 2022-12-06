var header =`<title></title>
	<meta name='viewport' content='width=device-width,initial-scale=1'/>
	<meta charset='utf-8'/>
	<link rel='icon' type='image/svg+xml' href='https://deborah-powers.fr/data/nounours-perso.svg'/>
	<link rel='stylesheet' type='text/css' href='https://deborah-powers.fr/library-css/structure.css'/>
	<link rel='stylesheet' type='text/css' href='https://deborah-powers.fr/library-css/perso.css' media='screen'/>
	<script type='text/javascript' src='https://deborah-powers.fr/library-js/text.js'></script>
`;
String.prototype.replace = function (wordOld, wordNew){
	if (this.indexOf (wordOld) >=0){
		if (! wordNew) wordNew ="";
		var tabText = this.split (wordOld);
		return tabText.join (wordNew);
	}
	else return this;
}
String.prototype.clean = function(){
	var text = this.replace ('\r');
	text = this.replace ('\n');
	text = this.replace ('\t');
	text = text.strip();
	while (text.contain ('  ')) text = text.replace ('  ', ' ');
	return text;
}
// récupérer le titre et nettoyer les headers
var title = document.head.getElementsByTagName ('title')[0].innerHTML;
header = header.replace ('<title></title>', '<title>' + title + '</title>');
// document.head.innerHTML = '<title>' + title + '</title>';
document.head.innerHTML = header;
document.body.innerHTML = document.body.innerHTML.clean();