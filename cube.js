/* créer un cube en 3d et le styler avec du css

container {
	perspective: 800px;
	perspective-origin: 15% 150px;
}
cube-3d, pave-3d {
	width: 8em;
	height: 8em;
	color: limegreen;
	border: double 8px limegreen;
	background-color: #F0F8;
}
pave-3d { --depth: 3cm; }
<cube-3d>
	<p>top</p>
	<p>bottom</p>
	<p>back</p>
	<p>left</p>
	<p>right</p>
	<p>front</p>
</cube-3d>
*/
// conversion unité vers pixel
var sizeEm =0;
var sizeCm =0;
function conversionVersPx(){
	const calcul = document.createElement ('p');
	document.body.appendChild (calcul);

	calcul.style.width = '1000em';
	var calculStyle = getComputedStyle (calcul);
	var widthStr = calculStyle.width.slice (0, -2);
	sizeEm = parseInt (widthStr) / 1000;

	calcul.style.width = '1000cm';
	calculStyle = getComputedStyle (calcul);
	var widthStr = calculStyle.width.slice (0, -2);
	sizeCm = parseInt (widthStr) / 1000;

	document.body.removeChild (calcul);
}
function mutationNb (mutations){
	// mutations est un MutationRecord
	var nbChildren =0;
	mutations.forEach (function (mutation){
		if (mutation.addedNodes.length && mutation.addedNodes[0].constructor.name !== 'Text') nbChildren +=1;
	});
	return nbChildren;
}
String.prototype.coordToNb = function(){
	const extention = this.slice (-2);
	const nbStr = this.slice (0, -2);
	var nb = parseInt (nbStr);
	if (extention === 'em') nb = nb * sizeEm;
	else if (extention === 'cm') nb = nb * sizeCm;
	return nb;
}
class Pole extends HTMLElement{
	constructor(vertical){
		super();
		this.sens = 'horizontal';
		this.nbFaces =6;	// modifier selon la forme. une pyramide a cinq faces
		// les faces
		this.front = null;
		this.back = null;
		this.top = null;
		this.bottom = null;
		this.left = null;
		this.right = null;
		// mise en forme
		this.vraiStyle = null;
		this.background ="";
		this.border ="";
		this.depth =0;
	}
	connectedCallback(){
		conversionVersPx();
		// style du cube
		this.style.display = 'block';
		this.style.padding = '0';
		this.style.textAlign = 'center';
		this.style.transformStyle = 'preserve-3d';
		this.style.backgroundPosition = 'center';
		if (this.className.includes ('vertical')){
			this.sens = 'vertical';
			this.classList.remove ('vertical');
		}
		// infos pour styler les enfants
		this.vraiStyle = getComputedStyle (this);
		this.background = this.vraiStyle.background;
		this.border = this.vraiStyle.border;
		this.style.background = 'none';
		this.style.border = 'none';

		// styler les enfants et corriger leur nombre
		const self = this;
		var nbChildren =0;
		var observer = new MutationObserver (function (mutations){
			nbChildren = nbChildren + mutationNb (mutations);
			if (nbChildren < self.nbFaces) self.appendChild (document.createElement ('p'));
			else self.createShape();
		});
		observer.observe (this, { childList: true });
	}
	createShape(){
		// modifier selon la forme
		this.depth = this.vraiStyle.width.coordToNb() /2;
		this.createTop();
		this.createBottom();
		this.createBack();
		this.createLeft();
		this.createRight();
		this.createFront();
	}
	createTop(){
		this.top = this.createFace (this.children[0], 'top', 'rotateX(90deg) translateZ(' + this.depth + 'px)');
		this.top.style.height = 2* this.depth + 'px';
	}
	createBottom(){
		const height = this.vraiStyle.height.coordToNb();
		this.bottom = this.createFace (this.children[1], 'bottom', 'rotateX(-90deg) translateZ(' + (height - this.depth) + 'px)');
		this.bottom.style.height = 2* this.depth + 'px';
	}
	createBack(){
		if (this.sens === 'vertical')
			this.back = this.createFace (this.children[2], 'back', 'rotateX(180deg) translateZ(' + this.depth + 'px)');
		else this.back = this.createFace (this.children[2], 'back', 'rotateY(180deg) translateZ(' + this.depth + 'px)');
	}
	createLeft(){ this.left = this.createFace (this.children[3], 'left', 'rotateY(-90deg) translateZ(' + this.depth + 'px)'); }
	createRight(){ this.right = this.createFace (this.children[4], 'right', 'rotateY(90deg) translateZ(' + this.depth + 'px)'); }
	createFront(){ this.front = this.createFace (this.children[5], 'front', 'translateZ(' + this.depth + 'px)'); }
	createFace (face, name, transform){
		face.style.transform = transform;
		face.style.margin = '0';
		face.style.textAlign = 'center';
		face.style.position = 'absolute';
		face.style.top = '0';
		face.style.left = '0';
		face.style.transformOrigin = 'center center';
		face.style.width = this.vraiStyle.width;
		face.style.height = this.vraiStyle.height;
		face.style.color = this.vraiStyle.color;
		face.style.background = this.background;
		face.style.backgroundPosition = 'center';
		face.style.backgroundSize = 'contain';
		face.style.border = this.border;
		face.id = name;
		return face;
}}
class Cube extends Pole{
	createShape(){
		this.style.height = this.style.width;
		this.vraiStyle = getComputedStyle (this);
		this.depth = this.vraiStyle.width.coordToNb() /2;
		this.createTop();
		this.createBottom();
		this.createBack();
		this.createLeft();
		this.createRight();
		this.createFront();
	}
}
class Pave extends Pole{
	createShape (border, background){
		this.depth = this.vraiStyle.getPropertyValue ('--depth').coordToNb() /2;
		this.createTop();
		this.createBottom();
		this.createBack();
		this.createLeft();
		this.createRight();
		this.createFront();
		const depthStr = 2* this.depth + 'px';
		this.left.style.width = depthStr;
		this.right.style.width = depthStr;
	}
	createRight(){
		const width = this.vraiStyle.width.coordToNb();
		this.right = this.createFace (this.children[4], 'right', 'rotateY(90deg) translateZ(' + (width - this.depth) + 'px)');
}}
class Tequi extends Pole{
	constructor(vertical){
		super();
		this.nbFaces =5;
	}
	createShape(){
		this.depth = this.vraiStyle.width.coordToNb() * 0.433;
		this.createTop();
		this.createBottom();
		this.createBack();
		this.top.style.clipPath = 'polygon(0 0, 100% 0, 50% 100%)';
		this.bottom.style.clipPath = 'polygon(0 100%, 100% 100%, 50% 0)';
		this.left = this.createFace (this.children[3], 'left', 'rotateY(-60deg) translateZ(' + this.depth /2 + 'px) translateX(-12.5%)');
		this.right = this.createFace (this.children[4], 'right', 'rotateY(60deg) translateZ(' + this.depth /2 + 'px) translateX(12.5%)');
}}
class Hexa extends Tequi{
	constructor(vertical){
		super();
		this.nbFaces =8;
	}
	createShape(){
}}
/*
toblerone >*:nth-child(4){
	transform: rotateY(-63.435deg) translateX(-12.5%) translateZ(calc(var(--width) * 0.25));
}
toblerone >*:nth-child(5){
	transform: rotateY(63.435deg) translateX(8.75%) translateZ(calc(var(--width) * 0.175));
}*/

customElements.define ('cube-3d', Cube);
customElements.define ('pole-3d', Pole);
customElements.define ('pave-3d', Pave);
customElements.define ('equi-3d', Tequi);
customElements.define ('hexa-3d', Hexa);
