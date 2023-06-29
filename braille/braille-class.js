const brickTemplate = '<hr/><hr/><hr/><hr/><hr/><hr/>';
class BrailleLetter extends HTMLElement{
	constructor(){
		super();
		this.letter ="";
	}
	static get observedAttributes(){ return [ 'letter' ]; }
	construire = function(){
		this.letter = this.getAttribute ('letter');
		this.innerHTML = brickTemplate;
		var points = this.getElementsByTagName ('hr');
		// style
		this.style.display = 'inline-grid';
		this.style.gridTemplateColumns = '1fr 1fr';
		this.style.gridTemplateRows = '1fr 1fr 1fr';
		this.style.gridGap = '0.3em';
		this.style.textAlign = 'center';
		const style = window.getComputedStyle (this);
		for (var c=0; c<6; c++){
			this.children[c].style.margin = '0';
			this.children[c].style.height = 'unset';
			this.children[c].style.opacity = '0.1';
			this.children[c].style.backgroundColor = style.color;
		}
		if (this.letter === 'nba' || this.letter === 'nbb'){
			// nba = chiffres antoine, nbb = chiffres braille
			points[5].style.opacity = '1';
			if (this.letter === 'nbb'){
				points[1].style.opacity = '1';
				points[3].style.opacity = '1';
				points[4].style.opacity = '1';
			}
		}
		else if ('0123456789'.includes (this.letter)){
			// chiffres
			if ('12345678'.includes (this.letter)) points[0].style.opacity = '1';
			if ('034679'.includes (this.letter)) points[1].style.opacity = '1';
			if ('026789'.includes (this.letter)) points[2].style.opacity = '1';
			if ('04578'.includes (this.letter)) points[3].style.opacity = '1';
		//	if (this.letter == '0') points[4].style.opacity = '1';
		//	points[5].style.opacity = '1';	pour la numérotation antoine
		}
		else{
			// lettres et ponctuation
			if ('aàbcçdeéèêëfghîïklmnoôpqruûvxyz'.includes (this.letter)) points[0].style.opacity = '1';
			if ('cçdéèëfgiîïjmnôœpqstwxy'.includes (this.letter)) points[1].style.opacity = '1';
			if ('àbçéèêëfghiïjlœpqrstvw,;:.?!"('.includes (this.letter)) points[2].style.opacity = '1';
			if ('àdeéghïjnoôqrtûwyz:.!")'.includes (this.letter)) points[3].style.opacity = '1';
			if ('àçéèklmnopqrstuvxyz;!"\'-()'.includes (this.letter)) points[4].style.opacity = '1';
			if ('àâçéèêëîïôœuûvwxyz.?"()-'.includes (this.letter)) points[5].style.opacity = '1';
		}
	}
	connectedCallback(){
		// appelée après le constructeur
	//	this.construire();
	}
	attributeChangedCallback (name, oldValue, newValue){
		console.log ('modif de', name, oldValue, newValue);
		this.construire();
	}
}
class BrailleDouble extends BrailleLetter{
	connectedCallback(){
		super.connectedCallback();
		this.innerHTML = this.innerHTML + '<p>' + this.letter + '</p>';
		// style
		this.style.gridTemplateRows = '1fr 1fr 1fr 2fr';
		this.children[6].style.margin = '0';
		this.children[6].style.padding = '0';
		this.children[6].style.gridColumn = '1/3';
}}
customElements.define ('b-letter', BrailleLetter);
customElements.define ('b-double', BrailleDouble);