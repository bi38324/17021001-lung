# -*- coding: utf-8 -*-
#
# Created by gaobiyu1702 on 17-10-10
#
from __future__ import absolute_import, unicode_literals
import requests

"""
Login 
"""

from flask import request, json
from flask_restful import Resource


class LoginInResource(Resource):
    def post(self):
        f = json.loads(request.get_data().decode('utf-8'))
        phone = f['phone']
        authcode = f['authcode']
        url = 'http://api.bto-dev.utoper.com/user/account/login/phone?phone='+phone+'&authcode='+authcode
        headers = {'content-type': 'application/json',
                   'appId': 'AP339457443459235841',
                   'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:22.0) Gecko/20100101 Firefox/22.0'}
        req = requests.post(url, headers=headers)
        if req.ok:
            msg = req.json()
            return msg
        return None
