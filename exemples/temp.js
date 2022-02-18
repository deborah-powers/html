const svgWidth = svg.getAttributeNb ('width');
const svgHeight = svg.getAttributeNb ('height');

class DragLimit{
	constructor(){
		this.minX =0;
		this.maxX =0;
		this.minY =0;
		this.maxY =0;
}}
SVGCircleElement.prototype.getDragLimit = function(){
	var rNbr = this.getAttributeNb ('r');
	var limit = new DragLimit();
	limit.minX = rNbr;
	limit.maxX = svgWidth - rNbr;
	limit.minY = rNbr;
	limit.maxY = svgHeight - rNbr;
	return limit;
}
var circle = svg.getElementsByTagNameNS (svgNs, 'circle')[0];
var limit = circle.getDragLimit();
console.log (limit);

