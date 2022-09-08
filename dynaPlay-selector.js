/*
dépendence:
	text.js
	dynaPlay.js
utilisation:	dpInit();

*** exemple ***

<select-db callback='myFunc' list='myList'></select-db>

var myList =[ 'a', 'b', 'c'];
function myFunc (name){ console.log ('coucou', name); }

https://javascript.info/custom-elements
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

function loadSelector (event){
	console.log (event.currentTarget.selector);
	event.currentTarget.selector.listName = event.currentTarget.selector.getAttribute ('list');
	event.currentTarget.selector.choiceName = event.currentTarget.selector.getAttribute ('choice');
	var title = event.currentTarget.selector.createNode ('h2', 'choisir: '+ getValueFromName (event.currentTarget.selector.choiceName));
	var paragraph = null;
	var liste = getValueFromName (event.currentTarget.selector.listName);
	for (var l=0; l< liste.length; l++){
		paragraph = event.currentTarget.selector.createNode ('p', liste[l]);
		paragraph.addEventListener ('click', function (event){
			event.target.parentElement.getElementsByTagName ('h2')[0].innerHTML = 'choisir: '+ event.target.innerHTML;
			setValueFromName (event.currentTarget.selector.choiceName, event.target.innerHTML);
			document.body.innerHTML = bodyTemplate;
			printAll();
		});
	}
	event.currentTarget.selector.removeAttribute ('choice');
	event.currentTarget.selector.removeAttribute ('list');
}

class Selector extends HTMLElement{
	constructor(){
		super();
		this.choiceName ="";
		this.listName ="";
	}
	connectedCallback(){
		// appelée après le constructeur
		setStyle (selectorStyle);
		// retarder l'initialisation du sélecteur. nécessaire si j'utilise des données javascript dans mes attributs
		console.log ('le callback');
		this.choiceName = getValueFromName (this.getAttribute ('choice'));
		this.listName = getValueFromName (this.getAttribute ('list'));
		window.addEventListener ('load', loadSelector);
		window.selector = this;
	}
}
customElements.define ('dp-selector', Selector);