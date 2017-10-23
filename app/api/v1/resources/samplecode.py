# -*- coding: utf-8 -*-
#
# Created by gaobiyu1702 on 17-10-10
#
from __future__ import absolute_import, unicode_literals
import requests

"""
SampleCode 
"""

from flask import request, json
from flask_restful import Resource


class SampleCodeResource(Resource):
    def post(self):
        f = json.loads(request.get_data().decode('utf-8'))
        accessToken = f['accessToken']
        url = 'http://api.bto-dev.utoper.com/gene/sample/list'
        headers = {'content-type': 'application/json',
                   'appId': 'AP339457443459235841',
                   'accessToken': accessToken}
        data = {'code': ''}
        req = requests.post(url, json=data, headers=headers)
        if req.ok:
            msg = req.json()
            if msg['items']:
                code = []
                for i in msg['items']:
                    a = i['sampleId']
                    url1 = 'http://api.bto-dev.utoper.com/gene/sample/show?sampleId=' + a
                    headers = {'content-type': 'application/json',
                               'appId': 'AP339457443459235841',
                               'accessToken': accessToken}
                    req = requests.post(url1, headers)
                    if req.ok:
                        examineeName = req.json()['examineeName']
                        code.append({'examineeName': examineeName, 'code': req.json()['code'], 'user': 'old'})
                return code
            msg = {'user': 'new'}
            return msg
        return req.json()


