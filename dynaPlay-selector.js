/*
dépendence:
	text.js
	dynaPlay.js
utilisation:	dpInit();

*** exemple ***

<select-db callback='myFunc' list='myList'></select-db>

var myList =[ 'a', 'b', 'c'];
function myFunc (name){ console.log ('coucou', name); }
*/
const selectorStyle =`
	dp-selector {
		display: block;
		border-style: solid;
		border-width: 4px;
		padding: 0;
	}
	dp-selector * { margin: 0; }
	dp-selector p { display: none; }
	dp-selector:hover p { display: block; }
	dp-selector p:hover { background-color: var(--fond-color); }
	dp-selector h2 {
		background-color: var(--bord-color);
		color: var(--page-color);
	}`;
class Selector extends HTMLElement{
	constructor(){
		super();
		this.choiceName ="";
		this.choice ="";
		this.listName =[];
		this.list =[];
	}
	connectedCallback(){
		// appelée après le constructeur
		setStyle (selectorStyle);
		var selector = this;
		// retarder l'initialisation du sélecteur. nécessaire si j'utilise des données javascript dans mes attributs
		window.addEventListener ('load', function (event){
			selector.listName = selector.getAttribute ('list');
			selector.choiceName = selector.getAttribute ('choice');
			selector.list = getValueFromName (selector.listName);
			selector.choice = getValueFromName (selector.choiceName);
			var title = selector.createNode ('h2', 'choisir: '+ selector.choice);
			var paragraph = null;
			for (var l=0; l< selector.list.length; l++){
				paragraph = selector.createNode ('p', selector.list[l]);
				paragraph.addEventListener ('click', function (event){
					event.target.parentElement.getElementsByTagName ('h2')[0].innerHTML = 'choisir: '+ event.target.innerHTML;
					setValueFromName (selector.choiceName, event.target.innerHTML);
					document.body.innerHTML = bodyTemplate;
					printAll();
				});
			}
			selector.removeAttribute ('choice');
			selector.removeAttribute ('list');
		});
}}
customElements.define ('dp-selector', Selector);