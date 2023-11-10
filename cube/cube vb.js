class Cube extends HTMLElement{
	constructor(vertical, dev){
		super();
		this.sens = 'horizontal';
		this.front = null;
		this.back = null;
		this.top = null;
		this.bottom = null;
		this.left = null;
		this.right = null;
	}
	connectedCallback(){
		this.style.display = 'block';
		this.style.padding = '0';
		this.style.textAlign = 'center';
		this.style.transformStyle = 'preserve-3d';

		const vraiStyle = getComputedStyle (this);
		const heightStr = vraiStyle.height.slice (0, -2);
		const height = parseInt (heightStr) /2;

		this.bottom = this.createFace (vraiStyle, 'bottom', 'rotateX(-90deg) translateY(50%)', 'bottom center');
		if (this.getAttribute ('vertical') != null){
			this.sens = 'vertical';
			this.back = this.createFace (vraiStyle, 'back', 'rotateX(180deg) translateZ(' + height +'px)', null);
		}
		else this.back = this.createFace (vraiStyle, 'back', 'rotateY(180deg) translateZ(' + height +'px)', null);
		this.left = this.createFace (vraiStyle, 'left', 'rotateY(270deg) translateX(-50%)', 'center left');
		this.right = this.createFace (vraiStyle, 'right', 'rotateY(-270deg) translateX(50%)', 'center right');
		this.front = this.createFace (vraiStyle, 'front', 'translateZ(' + height +'px)', null);
		this.top = this.createFace (vraiStyle, 'top', 'rotateX(90deg) translateY(-50%)', 'top center');

		this.style.background = 'none';
		this.style.border = 'none';
	}
	createFace (computedStyle, name, transform, transformOrigin){
		const face = document.createElement ('p');
		face.style.transform = transform;
		if (transformOrigin) face.style.transformOrigin = transformOrigin;
		face.style.margin = '0';
		face.style.textAlign = 'center';
		face.style.position = 'absolute';
		face.style.top = '0';
		face.style.left = '0';
		face.style.width = computedStyle.width;
		face.style.height = computedStyle.height;
		face.style.color = computedStyle.color;
		face.style.background = computedStyle.background;
		face.style.backgroundPosition = 'center';
		face.style.backgroundSize = 'contain';
		face.style.border = computedStyle.border;
		face.id = name;
		this.appendChild (face);
		return face;
	}
}
class Rect extends Cube{
	connectedCallback(){
		super.connectedCallback();
		const depthStr = this.getAttribute ('depth');
		const depthUnit = depthStr.slice (-2);
		const dephtHalf = parseInt (depthStr.slice (0, -2)) /2;
		console.log (depthUnit, dephtHalf, this.back);
		const vraiStyle = getComputedStyle (this);
	}
}
customElements.define ('cube-dd', Cube);
customElements.define ('rect-dd', Rect);
