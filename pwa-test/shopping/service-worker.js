// gérer le cache
const cacheName = 'shopping';
const filesToCache =[
	'/portfolio/shopping/index.html',
	'/portfolio/shopping/utils/structure.css',
	'/portfolio/shopping/utils/color.css',
	'/portfolio/shopping/utils/debbyPlay.css',
	'/portfolio/shopping/utils/debbyPlay.js',
	'/portfolio/shopping/utils/text.js',
	'/portfolio/shopping/service-launcher.js',
	'/portfolio/shopping/indexed-db.js',
	'/portfolio/shopping/style.css'
];
// mettre en cache le contenu de l'app
self.addEventListener ('install', function (event){
	event.waitUntil (caches.open (cacheName).then (function (cache){
		return cache.addAll (filesToCache);
}));});
// rendre le contenu de l'app hors-ligne
self.addEventListener ('fetch', function (event){
	event.respondWith (
	caches.match (event.request).then (function (response){
		return response || fetch (event.request);
}));});
