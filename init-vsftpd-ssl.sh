#!/bin/bash

export $(xargs < .env)
mkdir ui/certbot/conf/live/vsftpd
sudo openssl req -new -x509 -nodes -days 1095 -out ui/certbot/conf/live/vsftpd/vsftpd.cert.pem -keyout ui/certbot/conf/live/vsftpd/vsftpd.key.pem -subj /CN="$SERVER_ADDRESS"