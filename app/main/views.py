# -*- coding: utf-8 -*-
from flask import render_template, Flask
from . import main


# 设置flask的变量用其他符号表示  解决与Vue.js 花括号的冲突


class CustomFlask(Flask):
    jinja_options = Flask.jinja_options.copy()
    jinja_options.update(dict(
        block_start_string='<%',
        block_end_string='%>',
        variable_start_string='%%',
        variable_end_string='%%',
        comment_start_string='<#',
        comment_end_string='#>',
    ))

app = CustomFlask(__name__)
app.config['DEBUG'] = True


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

