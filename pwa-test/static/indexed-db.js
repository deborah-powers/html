// variables à utiliser par l'utilisateur, utilisées dans le code
var itemList =[];
function printList(){ console.log ("callback à surcharger pour afficher la liste d'objets"); }

// vérifier si mon navigateur supporte indexedDB
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: 'readwrite'};
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
if (! window.indexedDB) console.log ('votre navigateur ne supporte pas indexedDB.');

function connectIdb (callback){
	const request = window.indexedDB.open ('comodity_db', 3);
	request.onerror = function (event){ console.log ('erreur de chargement de la base de donnée locale'); };
	request.onsuccess = function (event){ callback (event.target.result); };
	request.onupgradeneeded = function (event){
		const database = event.target.result;
		database.onerror = function (event){ console.log ('erreur de chargement de la base de donnée locale'); };
		const objectStore = database.createObjectStore ('comodity_store', { autoIncrement: true });
		// var objectStore = database.createObjectStore ('comodity_store', {keyPath: 'name'});
		connectIdb (callback);
}}
function get (itemId, callback){
	function connectionCallback (database){
		const request = database.transaction (['comodity_store'], 'readonly').objectStore ('comodity_store').get (itemId);
		request.onerror = function (event){ console.log ("la récupération de l'objet "+ itemId +' à échouée'); };
		request.onsuccess = function(){ callback (request.result); };
	}
	connectIdb (connectionCallback);
}
function add (item, callback){
	function connectionCallback (database){
		const request = database.transaction (['comodity_store'], 'readwrite').objectStore ('comodity_store').add (item);
		request.onerror = function (event){ console.log ("l'insertion de l'objet à échouée", item); };
		request.onsuccess = function(){ callback (request.result); };
	}
	connectIdb (connectionCallback);
}
function put (item, callback){
	function connectionCallback (database){
		const request = database.transaction (['comodity_store'], 'readwrite').objectStore ('comodity_store').put (item);
		request.onerror = function (event){ console.log ("la modification de l'objet à échouée", item); };
		request.onsuccess = function(){ callback (request.result); };
	}
	connectIdb (connectionCallback);
}
function getAll (callback){
	function connectionCallback (database){
		var itemList =[];
		var objectStore = database.transaction ('comodity_store').objectStore ('comodity_store');
		objectStore.onerror = function (event){ console.log ("la récupération de la liste objets à échouée"); };
		objectStore.openCursor().onsuccess = function (event){
			var cursor = event.target.result;
			if (cursor){
				itemList.push (cursor.value);
				cursor.continue();
			}
			else callback (itemList);
	}}
	connectIdb (connectionCallback);
}
function del (itemId){
	function connectionCallback (database){
		const request = database.transaction (['comodity_store'], 'readwrite').objectStore ('comodity_store').delete (itemId);
		request.onerror = function (event){ console.log ("la suppression de l'objet "+ itemId +' à échouée'); };
		request.onsuccess = function (event){ console.log ("la suppression de l'objet "+ itemId +' à réussie'); };
	}
	connectIdb (connectionCallback);
}