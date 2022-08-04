/* dépendances: text.js, ist.js, file.js, file-perso.js
*/
class Rencontre{
	constructor(){
		this.date ="";
		this.lieu ="";
		this.nom ="";
		this.id =0;
	}
}
class Personne{
	constructor(){
		this.prenom ="";
		this.nom ="";
		this.surnom ="";
		this.relation ="";
		this.naissance ="";
		this.evenements =[];
		this.couleurs =[];
		this.aime =[];
		this.deteste =[];
		this.opinionPolitique ="";
		this.infos =[];
		this.numeros =[];
		this.courriels =[];
		this.adresse ="";
		this.facebook ="";
		this.tweeter ="";
		this.entreprise ="";
		this.job ="";
		this.id =0;
	}
	read (text){
		this.nom = text.sliceWords ('nom:\t', '\n');
		this.prenom = text.sliceWords ('prénom:\t', '\n');
		this.relation = text.sliceWords ('relation:\t', '\n');
		if (text.contain ('surnom:')) this.surnom = text.sliceWords ('surnom:\t', '\n');
		if (text.contain ('naissance:')) this.naissance = text.sliceWords ('naissance:\t', '\n');
		if (text.contain ('surnom:')) this.surnom = text.sliceWords ('surnom:\t', '\n');
		if (text.contain ('couleurs:\t')) this.couleurs = text.sliceWords ('couleurs:\t', '\n');
		if (text.contain ('aime:\t')) this.aime = text.sliceWords ('aime:\t', '\n');
		if (text.contain ('deteste:\t')) this.deteste = text.sliceWords ('deteste:\t', '\n');
		if (text.contain ('adresse:\t')) this.adresse = text.sliceWords ('adresse:\t', '\n');
		if (text.contain ('facebook:\t')) this.facebook = text.sliceWords ('facebook:\t', '\n');
		if (text.contain ('tweeter:\t')) this.tweeter = text.sliceWords ('tweeter:\t', '\n');
		if (text.contain ('numeros:\t')) this.numeros = text.sliceWords ('numeros:\t', '\n');
		if (text.contain ('courriels:\t')) this.courriels = text.sliceWords ('courriels:\t', '\n');
		if (text.contain ('entreprise:\t')) this.entreprise = text.sliceWords ('entreprise:\t', '\n');
		if (text.contain ('job:\t')) this.job = text.sliceWords ('job:\t', '\n');
		if (text.contain ('opinions politiques:\t')) this.opinionPolitique = text.sliceWords ('opinions politiques:\t', '\n');
		if (text.contain ('****** infos ******')){
			text = text.sliceWords ('****** infos ******\n');
			var textList = text.split ('\n');
			var i=0; var len = textList.length;
			while (i< len && textList[i][0] !='*' && textList[i][0] !='='){
				this.infos.push (textList[i]);
				i=i+1;
			}
		}
		if (text.contain ('****** évenements ******')){
			text = text.sliceWords ('****** évenements ******\n');
			var textList = text.split ('\n');
			var i=0; var len = textList.length;
			while (i< len && textList[i][0] !='='){
				this.evenements.push (textList[i].split ('\t'));
				i=i+1;
			}
			this.evenements.sort();
		}
	}
	toTemplate (template){
		template = template.replace ('$nom', this.nom);
		template = template.replace ('$prenom', this.prenom);
		template = template.replace ('$surnom', this.surnom);
		template = template.replace ('$relation', this.relation);
		template = template.replace ('$couleurs', this.couleurs);
		template = template.replace ('$aime', this.aime);
		template = template.replace ('$deteste', this.deteste);
		template = template.replace ('$numeros', this.numeros);
		template = template.replace ('$courriels', this.courriels);
		template = template.replace ('$job', this.job);
		// écrire les infos
		if (template.contain ('$infos')){
			var f= template.index ('$infos');
			var templateEnd = template.slice (0,f);
			var d= templateEnd.rindex ('<');
			f= template.index ('>',f) +1;
			templateEnd = template.slice (f);
			var templateList = template.slice (d,f);
			template = template.slice (0,d);
			for (var i=0; i< this.infos.length; i++){
				template = template + templateList;
				template = template.replace ('$infos', this.infos[i]);
			}
			template = template + templateEnd;
		}
		// écrire les évênements
		if (template.contain ('$evenements')){
			var f= template.index ('$evenements');
			var templateEnd = template.slice (0,f);
			var d= templateEnd.rindex ('<');
			f= template.index ('>',f) +1;
			templateEnd = template.slice (f);
			var templateList = template.slice (d,f);
			template = template.slice (0,d);
			for (var i=0; i< this.evenements.length; i++){
				template = template + templateList;
				template = template.replace ('$evenementsDate', this.evenements[i][0]);
				template = template.replace ('$evenementsNom', this.evenements[i][1]);
			}
			template = template + templateEnd;
		}
		return template;
	}
}
function comparerPersonne (personneA, personneB){
	if (personneA.relation > personneB.relation) return 5;
	else if (personneA.relation < personneB.relation) return -5;
	else if (personneA.entreprise > personneB.entreprise) return 4;
	else if (personneA.entreprise < personneB.entreprise) return -4;
	else if (personneA.nom > personneB.nom) return 3;
	else if (personneA.nom < personneB.nom) return -3;
	else if (personneA.prenom > personneB.prenom) return 2;
	else if (personneA.prenom < personneB.prenom) return -2;
	else if (personneA.surnom > personneB.surnom) return 1;
	else if (personneA.surnom < personneB.surnom) return -1;
	else return 0;
}
class PersonneList extends Array{
	constructor(){
		super();
		this.fichier = 'contacts.txt';
	}
	sortPersonne = function(){ this.sort (comparerPersonne); }
	trouverParRelation = function (relation){
		var newList = new PersonneList();
		for (var p=0; p< this.length; p++) if (this[p].relation.contain (relation)) newList.push (this[p]);
		return newList;
	}
	trouverParNom = function (nom){
		var newList = new PersonneList();
		for (var p=0; p< this.length; p++) if (this[p].nom.contain (nom) || this[p].prenom.contain (nom) || this[p].surnom.contain (nom)) newList.push (this[p]);
		return newList;
	}
	trier = function(){ this.sort (comparerPersonne); }
	read = function(){
		var resText = fromFile (this.fichier);
		resText = resText.clean();
		var resList = resText.split (' ======');
		resList.shift();
		resList.shift();
		var personne = null;
		for (var p=0; p< resList.length; p++){
			personne = new Personne();
			personne.read (resList[p]);
			this.push (personne);
		}
		this.trier();
	}
	toTemplate = function (template){
		var personneList ="";
		for (var p=0; p< this.length; p++) personneList = personneList + this[p].toTemplate (template);
		return personneList;
	}
	listerRelations = function(){
		var relationList =[];
		for (var p=0; p< this.length; p++)
			if (! relationList.contain (this[p].relation)) relationList.push (this[p].relation);
		return relationList;
	}
}