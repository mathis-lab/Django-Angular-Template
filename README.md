# Django-Angular Template

## Table of Contents
1. [General Info](#general-info)
3. [Installation](#installation)
### General Info
***

A template for Django Api & Angular Front WebApp
## Technologies
***
A list of technologies used within the project:
* [Django](https://www.djangoproject.com/): Version 4.0.2 
* [Angulare](https://angular.io/): Version 13.2.0
* [Docker](https://www.docker.com/): Version 20.10.7
* [Nginx](https://www.nginx.com/): Version 1.19.0
* [PostgreSQL](https://www.postgresql.org/): Version lastest
* [Vsftpd](https://doc.ubuntu-fr.org/vsftpd): Version lastest
* [Gunicorn](https://www.nginx.com/): Version 20.1.0
* [Certbot](https://certbot.eff.org/): Version lastest

## Installation
***
To install this repo, you gave to follow these instructions.

### Python 3.10

```
$ cd djangoApp
$ pip install -r requirements.txt
```

### Django
```
$ cd djangoApp
$ python manage.py makemigrations
$ python manage.py migrate
$ python managy.py init
$ python manage.py runserver
```

### Angular
```
$ cd ui/app
$ npm install -g @angular/cli 
$ npm install
$ ng serve
```

For unrestricted cmd on Visual code : ``$ set-executionpolicy unrestricted``

### Script for Docker
Docker Compose
```
$ docker-compose up --build --detach
$ docker-compose stop
$ docker logs [container_name]
```

SSL key gen :
```
$ chmod +x init-letsencrypt.sh
$ sudo ./init-letsencrypt.sh
$ chmod +x init-vsftpd-ssl.sh
$ sudo ./init-vsftpd-ssl.sh
$ sudo chmod -R 744 ui/certbot/
```

Copy statics files to docker :
```
$ docker cp data/DataPricer/ container_id:/data/DataPricer/
```

Create super user : 
```
$ docker exec -it container_id python manage.py createsuperuser
```

Force recreate :
```
$ docker system prune
$ docker-compose build --no-cache
$ docker-compose up --build --force-recreate
```

##Server Preprod & Prod

Under Windows PowerShell, to generate ssh key :
``
$ ssh-keygen
``

To connect to the server :
``
$ ssh [nom_de_la_session]@[nom_du_serveur]
``

