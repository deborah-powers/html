// vérifier si mon navigateur supporte indexedDB
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: 'readwrite'};
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
if (! window.indexedDB) console.log ('votre navigateur ne supporte pas indexedDB.');

document.body.init();
debbyPlay.comodities =[];
debbyPlay.prioList =[
	{ nb: '1', color: '#0F0' },
	{ nb: '2', color: '#880' },
	{ nb: '3', color: '#A50' },
	{ nb: '4', color: '#F00' }
];
const comodities =[
	{ name: 'bonbons', level: '1' },
	{ name: 'gâteaux', level: '2' },
	{ name: 'lait', level: '3' },
	{ name: 'barres chocolatées', level: '4' }
];
// l'affichage
function sortByPrio (productA, productB){
	if (productA.level > productB.level) return -1;
	else if (productA.level < productB.level) return 1;
	else if (productA.name < productB.name) return -1;
	else return 1;
}
function setPrio (name, level){
	var i=0;
	while (i< debbyPlay.comodities.length){
		if (debbyPlay.comodities[i].name == name){
			debbyPlay.comodities[i].level = level;
			itemUpdate (name, level);
			i= debbyPlay.comodities.length;
	} i++; }
	debbyPlay.comodities.sort (sortByPrio);
	document.body.load();
}
// indexed db
var database;
var request = window.indexedDB.open ('comodity_db', 3);
request.onerror = function (event){ console.log ('erreur de chargement de la base de donnée locale'); }
request.onsuccess = function (event){
	database = request.result;
	itemList();
}
request.onupgradeneeded = function (event){
	var database = event.target.result;
	// var objectStore = database.createObjectStore ('comodity_store', { autoIncrement: true });
	var objectStore = database.createObjectStore ('comodity_store', {keyPath: 'name'});
	objectStore.createIndex ('level', 'level', { unique: false });
	for (var i in comodities) objectStore.add (comodities[i]);
	debbyPlay.comodities.sort (sortByPrio);
	document.body.load();
}
function itemList(){
	debbyPlay.comodities =[];
	var objectStore = database.transaction ('comodity_store').objectStore ('comodity_store');
	objectStore.openCursor().onsuccess = function (event){
		var cursor = event.target.result;
		if (cursor){
			debbyPlay.comodities.push (cursor.value);
			cursor.continue();
		}
		else{
			debbyPlay.comodities.sort (sortByPrio);
			document.getElementsByTagName ('section')[0].load();
}}}
function itemAdd(){
	var input = document.getElementsByTagName ('input')[0];
	var comodity ={ name: input.value, level: '4' };
	var request = database.transaction (['comodity_store'], 'readwrite').objectStore ('comodity_store').add (comodity);
	request.onsuccess = function (event){ itemList(); }
	request.onerror = function (event){ console.log ('le nouvel article, '+ comodity.name +" n'a pas put être créé"); }
}
function itemUpdate (nameCom, levelCom){
	var request = database.transaction (['comodity_store'], 'readwrite').objectStore ('comodity_store').put ({ name: nameCom, level: levelCom });
	request.onsuccess = function (event){ itemList(); }
	request.onerror = function (event){ console.log ('le nouvel article, '+ nameCom +" n'a pas put être modifié"); }
}
function itemDelete (name){
	var request = database.transaction (['comodity_store'], 'readwrite').objectStore ('comodity_store').delete (name);
	request.onsuccess = function (event){ itemList(); }
	request.onerror = function (event){ console.log ("l'article,", name, "n'a pas put être supprimé"); }
}