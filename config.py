# -*- coding: utf-8 -*-
import json
from pymongo.cursor import Cursor
from bson import ObjectId
from datetime import datetime


class APIEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        elif isinstance(o, datetime):
            return o.strftime('%Y-%m-%d_%H:%M:%S')
        elif isinstance(o, Cursor):
            return list(o)
        else:
            return json.dumps(o)


class Config(object):
    SECRET_KEY = '9601e458d573c7593ec47f745115ccb9aa77f7c83f0a62f5'
    RESTFUL_JSON = {'cls': APIEncoder}
    GITLAB_BLOB_URL = 'http://192.168.1.220:8518/og00/17020401_BDMS_TMS/blob/master'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = r'mysql+pymysql://www:www@db/bdms'    # 配置数据库

    def init_app(app):
        pass


class DevelopmentConfig(Config):
    DEBUG = True
    MONGO_HOST = '116.62.203.65'
    MONGO_PORT = 27017
    MONGO_DBNAME = 'bto'
    MONGO_USERNAME = 'bto'
    MONGO_PASSWORD = 'bto100'


class TestingConfig(Config):
    MONGO_HOST = '116.62.203.65'
    MONGO_PORT = 27017
    MONGO_DBNAME = 'bto'
    MONGO_USERNAME = 'bto'
    MONGO_PASSWORD = 'bto100'


class ProductionConfig(Config):
    DEBUG = False
    MONGO_HOST = '116.62.203.65'
    MONGO_PORT = 27017
    MONGO_DBNAME = 'bto'
    MONGO_USERNAME = 'bto'
    MONGO_PASSWORD = 'bto100'


config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,
    'default': ProductionConfig,
}
