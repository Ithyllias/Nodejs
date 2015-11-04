# Nodejs
projet Node.js IUT Robert-Schuman automne 2015

# SYNOPSIS
Ce projet consiste a créer un jeu de snake serveur-client construit en utilisant uniquement des librairies de javascript. Le serveur est un
serveur NodeJS et express généré avec express generator. Le jeu est jouable en multijoueur sans limite de joueur.
ATTENTION! Lorsqu'un serpent est généré s'il n'y a plus d'espace le joueur perdra automatiquement.

# INSTALLATION
L'installation du serveur est très simple. Il s'agit de faire un clône du répertoire GIT sur votre ordinateur hôte, puis de générer ou installer
un certificat pour permettre au serveur d'utiliser HTTPS. Voici la marche à suivre pour générer son propre certificat et l'installer :
Windows
	1. Téléchargez openSSL à l'adresse suivante https://www.js.openssl.org/source/ et l'installer (Assurez-vous d'avoir la bonne version pour votre système).
	2. Ouvrez le dossier ou vous avez installer openSSL puis aller dans bin et exéctuer openSSL.exe, qui devrais vous ouvrir une fenêtre d'invite de commande.
	3. Dans cette fenêtre, entrez d'abord la commande suivante : genrsa -des3 -out privatekey.pem (le nom privatekey.pem est important pour assurer le bon fonctionnement du programme)
	4. Cette commande vous invitera à entrer un mot de passe pour l'utilisation de la clé. Il est fortement recommandé d'en choisir un, mais pas obligatoire.
	5. Ensuite, vous devriez avoir un fichier "privatekey.pem" créé dans le répertoire bin. Exécuter maintenant la commande suivante : req -config ../openssl.cnf -new -key privatekey.pem -out certrequest.csr
	6. Vous devriez maintenant devoir entrer le mot de passe précédemment créé pour la clé privée privatekey.pem (obligatoire), suivi d'une série d'informations à remplir (recommandé mais pas obligatoire) pour vous 
	   identifier auprès des utilisateurs futurs
	7. Vous devriez maintenant avoir aussi un fichier appelé "certrequest.csr" dans votre répertoire bin. Maintenant nous allons générer le certificat avec cette dernière commande :
	   x509 -req -in certrequest.csr -signkey privatekey.pem -out certificate.pem (on vous demandera à nouveau le mot de passe de la clé privée que vous avez choisi plus tôt)
	8. Vérifiez que vous avez bien les 3 fichiers suivants : "privatekey.pem", "certrequest.csr" et "certificate.pem" et copier les 3 fichiers.
	9. Allez dans le dossier ou vous avez précédemment clôner le répertoire git comprenant le programme puis naviguer dans snakes/. Si le dossier "ssl" n'existe pas, créez-le et collez-y les 3 fichiers que vous venez
	   de générer ("privatekey.pem", "certrequest.csr" et "certificate.pem").

Linux
	1. Ouvrir un terminal et assurez-vous d'avoir accès aux droits admin, puis entrez la commande suivante : apt-get install openssl.
	3. Dans ce même terminal, entrez d'abord la commande suivante : genrsa -des3 -out PATH/privatekey.pem (le nom privatekey.pem est important pour assurer le bon fonctionnement du programme)
	 NB.: Il est fortement suggéré de définir comme path l'endroit ou vous avez clôner le répertoire GIT et de créer l'arborescence suivante si elle n'existe pas : GIT_CLONE/snakes/ssl/privatekey.pem.
	4. Cette commande vous invitera à entrer un mot de passe pour l'utilisation de la clé. Il est fortement recommandé d'en choisir un, mais pas obligatoire.
	5. Ensuite, vous devriez avoir un fichier "privatekey.pem" créé. Exécuter maintenant la commande suivante : req -new -key PATH/privatekey.pem -out PATH/certrequest.csr (Nous suggérons encore une fois le même PATH)
	6. Vous devriez maintenant devoir entrer le mot de passe précédemment créé pour la clé privée privatekey.pem (obligatoire), suivi d'une série d'informations à remplir (recommandé mais pas obligatoire) pour vous 
	   identifier auprès des utilisateurs futurs
	7. Vous devriez maintenant avoir aussi un fichier appelé "certrequest.csr" dans votre répertoire choisi. Maintenant nous allons générer le certificat avec cette dernière commande :
	   x509 -req -in PATH/certrequest.csr -signkey PATH/privatekey.pem -out PATH/certificate.pem (on vous demandera à nouveau le mot de passe de la clé privée que vous avez choisi plus tôt)
	8. Vérifiez que vous avez bien les 3 fichiers suivants : "privatekey.pem", "certrequest.csr" et "certificate.pem" et copier les 3 fichiers s'il ne sont pas déjà dans GIT_CLONE/snakes/ssl/.
	9. Allez dans le dossier ou vous avez précédemment clôner le répertoire git comprenant le programme puis naviguer dans snakes/. Si le dossier "ssl" n'existe pas, créez-le et collez-y les 3 fichiers que vous venez
	   de générer ("privatekey.pem", "certrequest.csr" et "certificate.pem").
	   
Vous devriez maintenant avoir un serveur https à votre disposition. Il faut ensuite le rendre fonctionnel.

La première étape est d'installer nodeJS sur votre ordinateur hôte.
Windows :
	1. Téléchargez l'installateur Windows depuis le site https://nodejs.org/download/.
	2. Lancez l'installateur (le fichier .msi précédemment téléchargé).
	3. Suivez les étapes de l'installateur (Acceptez les licenses, cliquez le bouton NEXT plusieurs fois et acceptez les paramètres d'installation par défaut).
	4. Redémarrez votre ordinateur.
Linux :
	1. Assurez vous d'avoir déjà installer Ruby 1.8.6 et GCC 4.2 ou plus récents, sinon il faudra les installer
	2. Ouvrez un terminal et utilisez la commande suivante pour installer homebrew (logiciel qui simpliefiera beaucoup l'installation de node mais aussi de plusieurs autres logiciel open source) :
	   ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/linuxbrew/go/install)"
	3. Ajoutez les 3 lignes suivantes aux fichiers .bashrc et .zshrc :
		export PATH="$HOME/.linuxbrew/bin:$PATH"
		export MANPATH="$HOME/.linuxbrew/share/man:$MANPATH"
		export INFOPATH="$HOME/.linuxbrew/share/info:$INFOPATH"
	4. Toujours dans le terminal, inscrire la commande suivante : brew install node
	5. Laissez le système procéder au téléchargement, à la compilation puis à l'installation des fichiers nécessaires.
	
Vous devriez maintenant avoir node et npm d'installés sur votre ordinateur.
Pour activer le service de votre serveur https il faut maintenant ouvrir une autre fenêtre d'invite de commande (terminal sous linux) puis naviguer jusqu'à la racine du site. cd GIT_CLONE/snakes.
Lorsque vous êtes à cet endroit, il ne reste qu'a écrire la commande "npm start". Pour un mode "debug" qui permet de voir les erreurs potentiellement générée par l'application, écrire plutôt la commande :
set DEBUG=snakes & npm start

Vous devriez maintenant avoir une application fonctionnelle accessible via https://localhost:8080

Pour exécuter les tests il faut plutôt aller dans GIT_CLONE/snakes/test et entrer la commande : node tests

