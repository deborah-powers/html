function goCrop(){
	for (var screen of screens){
		if (screen.id === 'crop-screen'){
			screen.className = 'current';
			var imageFrame = screen.getElementsByTagName ('svg')[0];
			imageFrame.style.backgroundImage = 'url(' + imageModif.src +')';
			imageFrame.width.baseVal.value = imageModif.width;
			imageFrame.height.baseVal.value = imageModif.height;
			imageFrame = document.getElementById ('slider-frame');
			imageFrame.style.height = (12+ imageModif.height) + 'px';
			imageFrame = document.getElementsByClassName ('slider vertical')[0];
			imageFrame.style.height = imageModif.height + 'px';
		}
		else screen.className ="";
}}
function validateCrop(){
	const canvas = document.createElement ('canvas');
	const context = canvas.getContext ('2d');
	imageRef.xo *= imageModif.width;
	imageRef.xo /=100;
	imageRef.xu *= imageModif.width;
	imageRef.xu /=100;
	imageRef.yo *= imageModif.height;
	imageRef.yo /=100;
	imageRef.yu *= imageModif.height;
	imageRef.yu /=100;
	canvas.width = (imageRef.xu - imageRef.xo);
	canvas.height = (imageRef.yu - imageRef.yo);
	context.drawImage (imageModif, - imageRef.xo, - imageRef.yo);
	imageModif.src = canvas.toDataURL();
	imageRef.dst = imageModif.src;
	linkDownload.href = imageModif.src;
	imageRef.xo =0;
	imageRef.xu =100;
	imageRef.yo =0;
	imageRef.yu =100;
//	document.body.appendChild (canvas);
	document.getElementById ('main-screen').className = 'current';
	document.getElementById ('crop-screen').className ="";
}
var imageFrame = document.getElementsByTagName ('svg')[0];
const movingLines = imageFrame.getElementsByTagName ('line');
const movingInputs = imageFrame.parentElement.getInputsByType ('range');
movingInputs[0].onchange = function(){
	imageRef.xo = parseInt (this.value);
	imageRef.xo /=2;
	movingLines[0].x1.baseVal.valueAsString = imageRef.xo + '%';
	movingLines[0].x2.baseVal.valueAsString = imageRef.xo + '%';
}
movingInputs[1].onchange = function(){
	imageRef.xu = parseInt (this.value);
	imageRef.xu /=2;
	imageRef.xu +=50;
	movingLines[1].x1.baseVal.valueAsString = imageRef.xu + '%';
	movingLines[1].x2.baseVal.valueAsString = imageRef.xu + '%';
}
movingInputs[2].onchange = function(){
	imageRef.yo = parseInt (this.value);
	imageRef.yo /=2;
	movingLines[2].y1.baseVal.valueAsString = imageRef.yo + '%';
	movingLines[2].y2.baseVal.valueAsString = imageRef.yo + '%';
}
movingInputs[3].onchange = function(){
	imageRef.yu = parseInt (this.value);
	imageRef.yu /=2;
	imageRef.yu +=50;
	movingLines[3].y1.baseVal.valueAsString = imageRef.yu + '%';
	movingLines[3].y2.baseVal.valueAsString = imageRef.yu + '%';
}