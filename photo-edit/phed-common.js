const imageRef = { src: "", xo: 0, yo: 0, xu: 100, yu: 100, scale: 1, rotation: 0 };
const imageModif = document.getElementsByTagName ('img')[0];
const linkDownload = document.getElementsByTagName ('a')[0];

function resetHard(){
	resetRotateSimple();
	resetCropSimple()
	document.getElementById ('main-screen').className = 'current';
	document.getElementById ('crop-screen').className ="";
	document.getElementById ('rotate-screen').className ="";
	imageModif.src = imageRef.src;
}
HTMLElement.prototype.getInputsByType = function (typeName){
	const inputs = this.getElementsByTagName ('input');
	var inputsFin =[];
	for (var inp of inputs){
		if (typeName === inp.type) inputsFin.push (inp);
	}
	return inputsFin;
}