# -*- coding: utf-8 -*-
from flask import render_template
from . import main
# from functools import wraps
# from flask import make_response


# def allow_cross_domain(fun):
#     @wraps(fun)
#     def wrapper_fun(*args, **kwargs):
#         rst = make_response(fun(*args, **kwargs))
#         rst.headers['Access-Control-Allow-Origin'] = 'docs.bto-dev.utoper.com:8081/user/'
#         rst.headers['Access-Control-Allow-Methods'] = 'PUT,GET,POST,DELETE'
#         allow_headers = "Referer,Accept,Origin,User-Agent"
#         rst.headers['Access-Control-Allow-Headers'] = allow_headers
#         return rst
#     return wrapper_fun


@main.route('/')
def index():
    return render_template('index.html')


# 调查问卷
@main.route('/questionnaire/')
def questionnaire():
    return render_template('questionnaire.html')


# 个人信息
@main.route('/info/')
# @allow_cross_domain
def info():
    return render_template('info.html')


# 报告信息
@main.route('/canvas/')
# @allow_cross_domain
def canvas():
    return render_template('canvas.html')
