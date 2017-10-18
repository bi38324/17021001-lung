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
                   'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:22.0) Gecko/20100101 Firefox/22.0',
                   'accessToken': accessToken}
        req = requests.post(url, headers=headers)
        if req.ok:
            msg = req.json()
            if msg['item']:
                return msg['item']
            return None
        return None
