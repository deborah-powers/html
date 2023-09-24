class Cube extends HTMLElement{
	constructor(){
		super();
		this.style.background = "#00ff00";
		console.log ('constructor');
	}
	connectedCallback(){
		console.log ('connectedCallback', this.children);
		this.innerHTML = 'coucou';
	}
}
customElements.define ('cube-dd', Cube);
