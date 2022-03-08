
function drawMandala (pattern, horizontal){
	var limit = pattern.getLimit();
	console.log (limit);
	var centerX = (limit.xmax + limit.xmin) /2;
	var centerY = (3* limit.ymax - limit.ymin) /2;
	if (horizontal && horizontal != undefined){
		centerX = (3* limit.xmax - limit.xmin) /2;
		centerY = (limit.ymax + limit.ymin) /2;
	}
	var group = createShape ('g', svg);
	group.drawGroup (pattern.id, centerX, centerY);
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
SVGPathElement.prototype.getLimit = function(){
	const alphabet = 'achlmqvz';
	var points = this.getPointsObj();
	var pointX = points[0][1][0];
	var pointY = points[0][1][1];
	var limit ={ xmin: points[0][1][0], ymin: points[0][1][0], xmax: points[0][1][1], ymax: points[0][1][1] };
	for (var p=1; p< points.length; p++){
		if (alphabet.contain (points[p][0])){ pointX += points[p].get(-1)[0]; pointY += points[p].get(-1)[1]; }
		else if (alphabet.toUpperCase().contain (points[p][0])){ pointX = points[p].get(-1)[0]; pointY = points[p].get(-1)[1]; }
		if (pointX < limit.xmin) limit.xmin = pointX;
		else if (pointX > limit.xmax) limit.xmax = pointX;
		if (pointY < limit.ymin) limit.ymin = pointY;
		else if (pointY > limit.ymax) limit.ymax = pointY;
	}
	return limit;
}
SVGGElement.prototype.getLimit = function(){
	var limit = this.children[0].getLimit();
	var limitChild = { xmin: 0, ymin: 0, xmax: 0, ymax: 0 };
	for (var c=1; c< this.children.length; c++){
		limitChild = this.children[c].getLimit();
		if (limitChild.xmin < limit.xmin) limit.xmin = limitChild.xmin;
		else if (limitChild.xmax > limit.xmax) limit.xmax = limitChild.xmax;
		if (limitChild.ymin < limit.ymin) limit.ymin = limitChild.ymin;
		else if (limitChild.ymax > limit.ymax) limit.ymax = limitChild.ymax;
	}
	return limit;
}
SVGCircleElement.prototype.getLimit = function(){
	var rayon = this.getAttributeNb ('r');
	var cx = this.getAttributeNb ('cx');
	var cy = this.getAttributeNb ('cy');
	var limit ={
		xmin: cx- rayon,
		ymin: cy- rayon,
		xmax: cx+ rayon,
		ymax: cy+ rayon
	};
	return limit;
}
SVGEllipseElement.prototype.getLimit = function(){
	var rx = this.getAttributeNb ('rx');
	var ry = this.getAttributeNb ('ry');
	var cx = this.getAttributeNb ('cx');
	var cy = this.getAttributeNb ('cy');
	var limit ={
		xmin: cx-rx,
		ymin: cy-ry,
		xmax: cx+rx,
		ymax: cy+ry
	};
	return limit;
}
SVGRectElement.prototype.getLimit = function(){
	var limit ={
		xmin: this.getAttributeNb ('x'),
		ymin: this.getAttributeNb ('y'),
		xmax: 0,
		ymax: 0
	};
	var tmp = this.getAttributeNb ('width');
	limit.xmax = limit.xmin;
	tmp = this.getAttributeNb ('height');
	limit.ymax = limit.ymin;
	return limit;
}
SVGPolygonElement.prototype.getLimit = function(){
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
SVGPolylineElement.prototype.getLimit = function(){
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