/* origine du code http://www.petercollingridge.co.uk/book/export/html/524
dépend de svg.js
utilisation
obj { cursor: move; }
<obj onmousedown='selectElement(evt)'/>
*/
var currentX =0;
var currentY =0;

function selectElement (evt){
	currentX = evt.clientX;
	currentY = evt.clientY;
	evt.target.setAttributeNS (null, 'onmousemove', 'moveElement(evt)');
	evt.target.setAttributeNS (null, 'onmouseup', 'deselectElement(evt.target)');
}
function deselectElement (target){
	target.removeAttributeNS (null, 'onmousemove');
	target.removeAttributeNS (null, 'onmouseup');
}
function moveElement (evt){
	var dx= evt.clientX - currentX;
	var dy= evt.clientY - currentY;
	currentX = evt.clientX;
	currentY = evt.clientY;
	if (evt.target.tagName == 'line') evt.target.drag (dx, dy);
	else{
		var nameX = 'x';
		var nameY = 'y';
		if (evt.target.tagName == 'circle' || evt.target.tagName == 'ellipse'){ nameX = 'cx'; nameY = 'cy'; }
		dx= parseInt (evt.target.getAttribute (nameX)) +dx;
		dy= parseInt (evt.target.getAttribute (nameY)) +dy;
		evt.target.setAttribute (nameX, dx);
		evt.target.setAttribute (nameY, dy);
	}
}
SVGLineElement.prototype.drag = function (dx, dy){
	var nb= dx+ parseInt (this.getAttribute ('x1'));
	this.setAttribute ('x1', nb);
	nb= dx+ parseInt (this.getAttribute ('x2'));
	this.setAttribute ('x2', nb);
	nb= dy+ parseInt (this.getAttribute ('y1'));
	this.setAttribute ('y1', nb);
	nb= dy+ parseInt (this.getAttribute ('y2'));
	this.setAttribute ('y2', nb);
}