/* créer un cube en 3d et le styler avec du css

container {
	perspective: 800px;
	perspective-origin: 15% 150px;
}
cube-3d {
	width: 8em;
	height: 8em;
	color: limegreen;
	border: double 8px limegreen;
	background-color: #F0F8;
}
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
class Cube extends HTMLElement{
	constructor(vertical){
		super();
		this.sens = 'horizontal';
		this.vraiStyle = null;
		this.nbFaces =6;	// modifier selon la forme. une pyramide a cinq faces
		this.front = null;
		this.back = null;
		this.top = null;
		this.bottom = null;
		this.left = null;
		this.right = null;
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
		const background = this.vraiStyle.background;
		const border = this.vraiStyle.border;
		this.style.background = 'none';
		this.style.border = 'none';
		const self = this;
		var nbChildren =0;

		// styler les enfants et corriger leur nombre
		var observer = new MutationObserver (function (mutations){
			nbChildren = nbChildren + mutationNb (mutations);
			if (nbChildren < self.nbFaces) self.appendChild (document.createElement ('p'));
			else self.createShape (border, background);
		});
		observer.observe (this, { childList: true });
	}
	createShape (border, background){
		// modifier selon la forme
		const widthStr = this.vraiStyle.width.slice (0, -2);
		const width = parseInt (widthStr) /2;
		this.top = this.createFace (this.children[0], 'top', 'rotateX(90deg) translateZ(' + width + 'px)', border, background);
		this.bottom = this.createFace (this.children[1], 'bottom', 'rotateX(-90deg) translateZ(' + width + 'px)', border, background);
		if (this.sens === 'vertical')
			this.back = this.createFace (this.children[2], 'back', 'rotateX(180deg) translateZ(' + width + 'px)', border, background);
		else this.back = this.createFace (this.children[2], 'back', 'rotateY(180deg) translateZ(' + width + 'px)', border, background);
		this.left = this.createFace (this.children[3], 'left', 'rotateY(-90deg) translateZ(' + width + 'px)', border, background);
		this.right = this.createFace (this.children[4], 'right', 'rotateY(90deg) translateZ(' + width + 'px)', border, background);
		this.front = this.createFace (this.children[5], 'front', 'translateZ(' + width + 'px)', border, background);
	}
	createFace (face, name, transform, border, background){
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
		face.style.background = background;
		face.style.backgroundPosition = 'center';
		face.style.backgroundSize = 'contain';
		face.style.border = border;
		face.id = name;
		return face;
}}
class Pole extends Cube{
	createShape (border, background){
		// modifier selon la forme
		const widthStr = this.vraiStyle.width.slice (0, -2);
		const width = parseInt (widthStr) /2;
		const heightStr = this.vraiStyle.height.slice (0, -2);
		const height = parseInt (heightStr);

		this.top = this.createFace (this.children[0], 'top', 'rotateX(90deg) translateZ(' + width + 'px)', border, background);
		this.bottom = this.createFace (this.children[1], 'bottom', 'rotateX(-90deg) translateZ('+ (height - width) + 'px)', border, background);
		if (this.sens === 'vertical')
			this.back = this.createFace (this.children[2], 'back', 'rotateX(180deg) translateZ(' + width + 'px)', border, background);
		else this.back = this.createFace (this.children[2], 'back', 'rotateY(180deg) translateZ(' + width + 'px)', border, background);
		this.left = this.createFace (this.children[3], 'left', 'rotateY(-90deg) translateZ(' + width + 'px)', border, background);
		this.right = this.createFace (this.children[4], 'right', 'rotateY(90deg) translateZ(' + width + 'px)', border, background);
		this.front = this.createFace (this.children[5], 'front', 'translateZ(' + width + 'px)', border, background);
		this.top.style.height = this.vraiStyle.width;
		this.bottom.style.height = this.vraiStyle.width;
}}
class Pave extends Pole{
	createShape (border, background){
		const heightStr = this.vraiStyle.height.slice (0, -2);
		const height = parseInt (heightStr);
		const depthExt = this.vraiStyle.getPropertyValue ('--depth').slice (-2);
		const depthStr = this.vraiStyle.getPropertyValue ('--depth').slice (0, -2);
		var depth = parseInt (depthStr) /2;
		if (depthExt === 'em') depth = depth * sizeEm;
		else if (depthExt === 'cm') depth = depth * sizeCm;
		console.log (depth, height, sizeEm, (height - depth));

		this.top = this.createFace (this.children[0], 'top', 'rotateX(90deg) translateZ(' + depth + 'px)', border, background);
		this.bottom = this.createFace (this.children[1], 'bottom', 'rotateX(-90deg) translateZ('+ (height - depth) + 'px)', border, background);
		if (this.sens === 'vertical')
			this.back = this.createFace (this.children[2], 'back', 'rotateX(180deg) translateZ(' + depth + 'px)', border, background);
		else this.back = this.createFace (this.children[2], 'back', 'rotateY(180deg) translateZ(' + depth + 'px)', border, background);
		this.left = this.createFace (this.children[3], 'left', 'rotateY(-90deg) translateZ(' + depth + 'px)', border, background);
		this.right = this.createFace (this.children[4], 'right', 'rotateY(90deg) translateZ(' + depth + 'px)', border, background);
		this.front = this.createFace (this.children[5], 'front', 'translateZ(' + depth + 'px)', border, background);
		this.top.style.height = this.vraiStyle.width;
		this.bottom.style.height = this.vraiStyle.width;
}}
customElements.define ('cube-3d', Cube);
customElements.define ('pole-3d', Pole);
customElements.define ('pave-3d', Pave);
