# -*- coding: utf-8 -*-
#
# Created by lixing1611 on 17-4-18
#
from __future__ import absolute_import, unicode_literals
from flask import json
from copy import deepcopy
from bson import ObjectId
import requests

"""
小工具
"""


class BsonSerializer(object):
    def __init__(self, bson):
        self.bson = deepcopy(bson)

    def serialize_object_id(self):
        self.bson['_id'] = str(self.bson['_id'])
        return self.bson

    @staticmethod
    def serialize_cursor(cursor):
        """
        序列化一个查询结果，里面包含ObjectID
        :param cursor: query cursor object
        :return: serialization list
        """
        qrs = []
        for record in cursor:
            record['_id'] = str(record['_id'])
            qrs.append(record)
        return qrs

    @staticmethod
    def serialize_fs_files(cursor):
        qrs = []
        for record in cursor:
            record['_id'] = str(record['_id'])
            record['uploadDate'] = str(record['uploadDate'])
            qrs.append(record)
        return qrs

    @staticmethod
    def serialize_fs_file(fs_file):
        fs_file['_id'] = str(fs_file['_id'])
        fs_file['uploadDate'] = str(fs_file['uploadDate'])
        return fs_file

    def serialize_ov_item(self):
        for site in self.bson.get('sites'):
            info = site['info']
            site['info'] = {'collection': info.collection, '_id': str(info.id)}
        return self.bson


class MongoPagination(object):
    def __init__(self, clt):
        self.clt = clt  # collection

    def query(self, query_dict, fields=None, last_id=None, limit=10):
        query_dict = deepcopy(query_dict)
        if last_id:
            query_dict['_id'] = {'$gt': ObjectId(last_id)}
            if fields:
                return self.clt.find(query_dict, fields).sort('_id', 1).limit(limit)
            else:
                return self.clt.find(query_dict).sort('_id', 1).limit(limit)
        else:
            if fields:
                return self.clt.find(query_dict, fields).sort('_id', 1).limit(limit)
            else:
                return self.clt.find(query_dict).sort('_id', 1).limit(limit)


def proxy_api(host, api, data):
    url = host + api
    s = json.dumps(data)
    # url = 'http://api.bto-dev.utoper.com/user/account/authcode/phone?phone=15700064975&flag=flag'
    headers = {'content-type': 'application/json',
               'appId': 'AP339457443459235841',
               'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:22.0) Gecko/20100101 Firefox/22.0'}
    req = requests.post(url, data=s, headers=headers)
    print(req)
    if req.ok():
        return req.json()
    return None
