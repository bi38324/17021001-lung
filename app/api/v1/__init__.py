# -*- coding: utf-8 -*-
#
# Created by lixing1611 on 17-4-18
#
from __future__ import absolute_import, unicode_literals
from flask import Blueprint
from flask_restful import Api


from .resources.lungcancer_2C import Lungcancer2CResource
from .resources.authcode import AuthCodeResource
from .resources.login import LoginInResource
from .resources.samplecode import SampleCodeResource


api_v1_bp = Blueprint('api_v1', __name__)
api_v1 = Api(api_v1_bp)

api_v1.add_resource(Lungcancer2CResource, 'algorithm/lung-cancer-2C/',
                    endpoint='api_v1.algorithm.lung_cancer_tester_2C')
api_v1.add_resource(AuthCodeResource, 'account/authcode/phone/',
                    endpoint='api_v1.account.authcode')
api_v1.add_resource(LoginInResource, 'account/login/phone/',
                    endpoint='api_v1.account.login')
api_v1.add_resource(SampleCodeResource, '/sample/list/',
                    endpoint='api_v1.sample.list')
