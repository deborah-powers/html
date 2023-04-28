String.prototype.replace = function (wordOld, wordNew){
	if (this.indexOf (wordOld) >=0){
		if (! wordNew) wordNew ="";
		var tabText = this.split (wordOld);
		return tabText.join (wordNew);
	}
	else return this;
}
String.prototype.paramsToUrl = function (params){
	let queryStr = '?';
	if (this.indexOf ('?') >=0) queryStr = '&';
	for (var i in params) queryStr = queryStr +i+'='+ params[i] +'&';
	queryStr = queryStr.slice (0, queryStr.length -1);
	queryStr = this + queryStr;
	return queryStr;
}
String.prototype.paramsFromUrl = function(){
	let params ={};
	const d= this.indexOf ('?') +1;
	if (d>0){
		let queryStr = this.slice (d, this.length);
		queryStr = queryStr.replace ('=', '&')
		const queryLst = queryStr.split ('&');
		for (var i=0; i< queryLst.length; i=i+2) params [queryLst[i]] = queryLst[i+1];
	}
	return params;
}
Location.prototype.getParams = function(){
	let params ={};
	if (this.search && this.search.length >1){
		let queryStr = this.search.slice (1, this.search.length);
		queryStr = queryStr.replace ('=', '&')
		const queryLst = queryStr.split ('&');
		for (var i=0; i< queryLst.length; i=i+2) params [queryLst[i]] = queryLst[i+1];
	}
	return params;
}
params = window.location.getParams();
console.log (params);
console.dir (window.location);
