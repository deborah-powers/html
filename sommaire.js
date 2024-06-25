var titles = document.getElementsByTagName ('h1');
const titleH2 = document.getElementsByTagName ('h2')[0];
var sommaire = "<section id='sommaire'>";
// que des titres h1
if (titleH2 === undefined && titles.length >0) for (var h=0; h< titles.length; h++){
	titles[h].id = 'title-' +h;
	sommaire = sommaire + "<a href='#title-" +h+ "'>" + titles[h].innerHTML + '</a>';
}
// titres h1 et h2
else if (titleH2 !== undefined && titles.length >0){
	titles = document.querySelectorAll ('h1,h2');
	var h1nb =0;
	var h2nb =0;
	for (var h=0; h< titles.length; h++){
		if (titles[h].tagName === 'H1'){
			h1nb +=1;
			h2nb =0;
			titles[h].id = 'title-' + h1nb;
			sommaire = sommaire + "<a href='#title-" + h1nb + "' class='h1'>" + titles[h].innerHTML + '</a>';
		}
		else{
			h2nb +=1;
			titles[h].id = 'title-' + h1nb +'-'+ h2nb;
			sommaire = sommaire + "<a href='#title-" + h1nb +'-'+ h2nb + "'>" + titles[h].innerHTML + '</a>';
		}
	}
}
sommaire = sommaire + '</section>';
document.body.innerHTML = sommaire + document.body.innerHTML;


