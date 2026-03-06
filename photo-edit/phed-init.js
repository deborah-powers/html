const uploader = document.getElementsByTagName ('input')[0];

uploader.addEventListener ('change', function (event){
	resetHard();
	imageRef.src = URL.createObjectURL (event.target.files[0]);
	imageModif.src = imageRef.src;
	const p= event.target.files[0].name.lastIndexOf ('.');
	linkDownload.download = event.target.files[0].name.substring (0,p) +' bis' + event.target.files[0].name.substring (p);
	imageModif.alt = event.target.files[0].name.substring (0,p);
});
imageModif.onload = function(){
	if ('blob:' === imageModif.src.substring (0,5)) this.resizeWindow();
}
function downloadImage(){
	// retrouver les dimensions d'origine
	imgWidth = imageModif.width * imageRef.scale;
	imgHeight = imageModif.height * imageRef.scale;
	// hauteur maximale des images
	if (imgHeight >800){
		imageRef.scale = imgHeight / 800.0;
		imgWidth = parseInt (imgWidth / imageRef.scale);
		imgHeight = 800;
	}
	imageRef.scale =1;
	imageRef.xo =0;
	imageRef.xu =100;
	imageRef.yo =0;
	imageRef.yu =100;
	imageRef.rotation =0;
	// dessiner l'image
	const canvas = document.createElement ('canvas');
	const context = canvas.getContext ('2d');
	canvas.width = imgWidth;
	canvas.height = imgHeight;
	context.drawImage (imageModif, 0,0, imgWidth, imgHeight);
	// activer le lien
	linkDownload.href = canvas.toDataURL();
	linkDownload.click();
}
function dimensionToNb (dimension){
	// dimension = "20px"
	dimension = dimension.substring (0, dimension.length -2);
	dimensionNb = parseInt (dimension);
	return dimensionNb;
}
HTMLImageElement.prototype.resizeWindow = function(){
	const bodyStyle = window.getComputedStyle (document.body);
	var widthMax = document.body.clientWidth;
	const padding = 2* dimensionToNb (bodyStyle.paddingLeft);
	widthMax -= padding;
	if (this.width <= widthMax) return;
	imageRef.scale = this.width / widthMax;
	const scaleHeight = parseInt (this.height / imageRef.scale);
	this.width = widthMax;
	this.height = scaleHeight;
	const canvas = document.createElement ('canvas');
	const context = canvas.getContext ('2d');
	canvas.width = widthMax;
	canvas.height = scaleHeight;
	context.drawImage (this, 0,0, widthMax, scaleHeight);
	this.src = canvas.toDataURL();
}
function tumble90degree(){
	const canvas = document.createElement ('canvas');
	const context = canvas.getContext ('2d');
	canvas.width = imageModif.height;
	canvas.height = imageModif.width;
	context.rotate (Math.PI /2);
	context.drawImage (imageModif, 0, - imageModif.height, canvas.height, canvas.width);
	imageModif.width = canvas.width;
	imageModif.height = canvas.height;
	imageModif.src = canvas.toDataURL();
}