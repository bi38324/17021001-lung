# -*- coding: utf-8 -*-
#
# Created by gaobiyu1702 on 17-9-26
#
from __future__ import absolute_import, unicode_literals
import json
"""
Lungcancer_2C Resource Module
"""

from flask import request, current_app, jsonify
from flask_restful import Resource
from bdms_tms.algorithms.lung_cancer_tester_2C_100level.test_TMS import Tester, lung_cancer

class Lungcancer2CResource(Resource):

    def get(self):
        source_code = getattr(Tester, '__source_code__', None)
        return {
            '__title__': Tester.__title__,
            '__doc__': Tester.__doc__,
            '__params__': Tester.__params__,
            '__version__': getattr(Tester, '__version__', 'V1.0'),
            '__source_code__': current_app.config['GITLAB_BLOB_URL'] + source_code if source_code else '#'
        }

    def post(self):
        f = json.loads(request.get_data())
        # f = request.json.get('f', None)
        # print(f['肺部疾病史'])
        if f:
            # tr = lung_cancer.delay(f)
            # with open('/home/gaobiyu/17020401-BDMS-API/images.json') as ff:
            tr = lung_cancer(f)
            return jsonify(tr)
        else:
            return {'msg': 'f参数必须输入'}, 400
