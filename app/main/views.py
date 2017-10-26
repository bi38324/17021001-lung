# -*- coding: utf-8 -*-
from flask import render_template, Flask
from . import main


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
def canvas():
    return render_template('canvan.html')


