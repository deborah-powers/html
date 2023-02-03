créer une pwa.
échanger entre une bdd en ligne et une bdd sur le téléphonne.

l'enregistrement des données
	dans la base du téléphonne
	dans une base en ligne
la récupération des données
	en ligne
	du téléphonne

======================== développement ========================

https://developer.mozilla.org/fr/docs/Web/Progressive_web_apps
https://web.dev/learn/pwa/


======================== test en local ========================

je peux tester ma pwa en local avec le script test.py, un serveur https python.
attention, il faut récupérer des certificats ssd grâce à mkcert.
https://github.com/FiloSottile/mkcert
suivre la procédure d'installation,
puis, dans le répertoire de destination de mes certificats
mkcert -install
mkcert deborah.powers.fr "*.deborah.powers.fr" www.deborah.powers.fr localhost 127.0.0.1

https://localhost:4443/

>>>>>>> fafd22a (boulot 02/03 16:15)
