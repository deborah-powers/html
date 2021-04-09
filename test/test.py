#!/usr/bin/python3.9
# -*- coding: utf-8 -*-
"""
je peux tester ma pwa en local avec le script test.py, un serveur https python.
attention, il faut récupérer des certificats ssd grâce à mkcert.
https://github.com/FiloSottile/mkcert
suivre la procédure d'installation,
puis, dans le répertoire de destination de mes certificats
mkcert -install
mkcert deborah.powers.fr "*.deborah.powers.fr" www.deborah.powers.fr localhost 127.0.0.1

https://localhost:4443/
"""
from http.server import HTTPServer, BaseHTTPRequestHandler, SimpleHTTPRequestHandler
import ssl

httpd = HTTPServer (('localhost', 4443), SimpleHTTPRequestHandler)

httpd.socket = ssl.wrap_socket (httpd.socket,
	keyfile = 'test/deborah.powers.fr+4-key.pem',
	certfile = 'test/deborah.powers.fr+4.pem',
	server_side=True
)
print ('mon serveur tourne sur\nhttps://localhost:4443/')
httpd.serve_forever()