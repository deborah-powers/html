
function createGroupFromPolygon (polygon){
	var limits = polygon.limits();
	var centerX = (limits.xmax + limits.xmin) /2;
	var centerY = (3* limits.ymax - limits.ymin) /2;
	var group = createShape ('g', svg);
	group.createGroup (polygon.id, centerX, centerY);
}
SVGGElement.prototype.drawGroup = function (drawingId, centerX, centerY){
	var use = createShape ('use', this);
	use.setAttributeNS (xlinkNs, 'xlink:href', '#' + drawingId);
	this.adduse (drawingId, centerX, centerY, 60);
	this.adduse (drawingId, centerX, centerY, 120);
	this.adduse (drawingId, centerX, centerY, 180);
	this.adduse (drawingId, centerX, centerY, 240);
	this.adduse (drawingId, centerX, centerY, 300);
}
SVGGElement.prototype.adduse = function (drawingId, centerX, centerY, angle){
	var use = createShape ('use', this);
	use.setAttributeNS (xlinkNs, 'xlink:href', '#' + drawingId);
	use.setAttribute ('transform', 'rotate('+ angle +', '+ centerX +','+ centerY +')');
}
SVGPolygonElement.prototype.limits = function(){
	var points = this.getPoints();
	var limit ={ xmin: points[0][0], ymin: points[0][1], xmax: points[0][0], ymax: points[0][1] };
	for (var p=1; p< points.length; p++){
		if (points[p][0] < limit.xmin) limit.xmin = points[p][0];
		else if (points[p][0] > limit.xmax) limit.xmax = points[p][0];
		if (points[p][1] < limit.ymin) limit.ymin = points[p][1];
		else if (points[p][1] > limit.ymax) limit.ymax = points[p][1];
	}
	return limit;
}
SVGPolylineElement.prototype.limits = function(){
	var points = this.getPoints();
	var limit ={ xmin: points[0][0], ymin: points[0][1], xmax: points[0][0], ymax: points[0][1] };
	for (var p=1; p< points.length; p++){
		if (points[p][0] < limit.xmin) limit.xmin = points[p][0];
		else if (points[p][0] > limit.xmax) limit.xmax = points[p][0];
		if (points[p][1] < limit.ymin) limit.ymin = points[p][1];
		else if (points[p][1] > limit.ymax) limit.ymax = points[p][1];
	}
	return limit;
}