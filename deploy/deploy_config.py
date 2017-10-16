# -*- coding: utf-8 -*-


bind = '0.0.0.0:3010'
workers = 1
chdir = '/var/www/lung-cancer/'
daemon = True
pidfile = '/var/run/lung-cancer.pid'
accesslog = '/var/log/lung-cancer.log'
errorlog = '/var/log/lung-cancer.log'
