const imageRotation = document.getElementsByTagName ('img')[1];
function goRotate(){
	imageRotation.src = imageModif.src;
	document.getElementById ('rotate-screen').className = 'current';
	document.getElementById ('main-screen').className ="";
}
function degreeTOradian (degree){ return degree * Math.PI / 180; }
function degreeTOcos (degree){ return Math.cos (degree * Math.PI / 180); }
function degreeTOsin (degree){ return Math.sin (degree * Math.PI / 180); }
function resetRotateSimple(){
	imageRef.rotation =0;
	imageRotation.style.transform ="";
}
function resetRotate(){
	resetRotateSimple();
	document.getElementById ('main-screen').className = 'current';
	document.getElementById ('rotate-screen').className ="";
}
function validateRotate(){
	// le canvas permet d'enregistrer les modifications
	const canvas = document.createElement ('canvas');
	const context = canvas.getContext ('2d');
	// calculer les dimensions de l'image après redressement
	const diag = Math.sqrt (imageModif.width * imageModif.width + imageModif.height * imageModif.height);
	const imgAngle = Math.atan (imageModif.height / imageModif.width);
	var ecartWidth =0;
	var ecartHeight =0;
	if (imageRef.rotation >0){
		canvas.width = degreeTOcos (imageRef.rotation) * imageModif.width - degreeTOcos (90+ imageRef.rotation) * imageModif.height;
		canvas.height = diag * (Math.sin (imgAngle + degreeTOradian (imageRef.rotation)));
		// TODO centrer l'imageModif
		ecartWidth = degreeTOcos (90+ imageRef.rotation) * imageModif.height;
		ecartHeight = - ecartWidth * degreeTOsin (- imageRef.rotation);
		ecartWidth *= - degreeTOcos (- imageRef.rotation);
	}
	else if (imageRef.rotation <0){
		canvas.width = diag * (Math.cos (imgAngle + degreeTOradian (imageRef.rotation)));
		canvas.height = degreeTOsin (90+ imageRef.rotation) * imageModif.height - degreeTOsin (imageRef.rotation) * imageModif.width;
		// TODO centrer l'imageModif
		ecartHeight = degreeTOsin (imageRef.rotation) * imageModif.width;
		ecartWidth = - ecartHeight * degreeTOcos (90- imageRef.rotation);
		ecartHeight *= - degreeTOsin (90- imageRef.rotation);
	}
	context.rotate (degreeTOradian (imageRef.rotation));
	// dessiner l'image modifiée
	context.drawImage (imageModif, ecartWidth, ecartHeight);
	imageModif.src = canvas.toDataURL();
	resetRotate();
}
function rotateLeft(){
	imageRef.rotation -=3;
	if (imageRef.rotation <-90) imageRef.rotation = -90;
	imageRotation.style.transform = 'rotate(' + imageRef.rotation + 'deg)';
}
function rotateRight(){
	imageRef.rotation +=3;
	if (imageRef.rotation >90) imageRef.rotation = 90;
	imageRotation.style.transform = 'rotate(' + imageRef.rotation + 'deg)';
}