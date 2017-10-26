# -*- coding: utf-8 -*-
#
# Created by gaobiyu1702 on 17-10-10
#
from __future__ import absolute_import, unicode_literals
import requests
from app import mongo


"""
Login 
"""

from flask import request, json
from flask_restful import Resource


class LoginInResource(Resource):
    def post(self):
        f = json.loads(request.get_data().decode('utf-8'))
        print(f)
        phone = f['phone']
        authcode = f['authcode']
        real = f['val']
        # 创建插入mongo的document
        document = {
            'phone': phone,
            'relations': real['基本信息']['与受检人关系'],
            'Information': {
                'name': real['基本信息']['姓名'],
                'relation': real['基本信息']['与受检人关系'],
                'sex': real['基本信息']['性别'],
                'age': real['基本信息']['年龄'],
                'weight': real['基本信息']['体重'],
                'height': real['基本信息']['身高'],
                'local': real['基本信息']['常住地']
            },
            'goodFood': real['摄入蔬菜水果频次'],
            'badFood': real['摄入腌制蔬菜或烟熏肉类频次'],
            'smokeDuration': real['吸烟年限'],
            'smokeFrequency': real['吸烟频率'],
            'smokeSecond': real['是否被动吸烟(二手烟)'],
            'lungDH': real['肺部疾病史'],
            'lungFH': real['肺癌家族史'],
            'jobHistory': real['职业接触史'],
            'sport': real['运动情况']
        }
        
        data = mongo.db.relation.insert(document)
        if data:
            print(data)
        else:
            print({'msg': '失败'}, 400)

        url = 'http://api.bto-dev.utoper.com/user/account/login/phone?phone='+phone+'&authcode='+authcode
        headers = {'content-type': 'application/json',
                   'appId': 'AP339457443459235841',
                   'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:22.0) Gecko/20100101 Firefox/22.0'}
        req = requests.post(url, headers=headers)
        if req.ok:
            msg = req.json()
            return msg
        else:
            error_msg = '验证码有误'
            return error_msg
