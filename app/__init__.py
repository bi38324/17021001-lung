# -*- coding: utf-8 -*-
from flask import Flask
from flask_migrate import Migrate
from flask_pymongo import PyMongo
from celery import Celery
from flask_sqlalchemy import SQLAlchemy

from config import config


mongo = PyMongo()
celery = Celery(__name__)
db = SQLAlchemy()
migrate = Migrate()


def create_app(config_name='default'):
    app = Flask(__name__)
    app.config.from_object(config[config_name])

    config[config_name].init_app(app)
    db.init_app(app)
    mongo.init_app(app)
    celery.conf.update(app.config)
    migrate.init_app(app, db)

    from .main import main
    from .api.v1 import api_v1_bp
    app.register_blueprint(main)
    app.register_blueprint(api_v1_bp, url_prefix='/api/v1/')
    app.jinja_env.variable_start_string = '${'
    app.jinja_env.variable_end_string = '}'

    return app

