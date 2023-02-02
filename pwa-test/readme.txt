une pwa de test.
je veux vérifier de nombreuses choses.

la vérification de l'état de la connection internet

l'enregistrement des données
	dans la base du téléphonne
	dans une base en ligne
la récupération des données
	en ligne
	du téléphonne



console.log ('Initially ' + (window.navigator.onLine ? 'on' : 'off') + 'line');
window.addEventListener('online', () => console.log('Became online'));
window.addEventListener('offline', () => console.log('Became offline'));