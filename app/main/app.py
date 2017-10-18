# -*- coding: utf-8 -*-
from __future__ import unicode_literals, absolute_import
from flask import Flask, request, jsonify
from flask_cors import CORS

# 设定一个应用程序
app = Flask(__name__)

# r'/*' 是通配符，让本服务器所有的 URL 都允许跨域请求
CORS(app, resources=r'/*')


# 根目录返回一个问候字符串
@app.route("/")
def hello():
    string = "Hello, I am a Flask server running inside a Docker container on a VM instance of Google Cloud Platform!\nNice to meet you!"
    return string


# /json URL 会接受 POST 请求
@app.route("/json", methods=['GET', 'POST'])
def color():
    # 服务器上的日志记录
    app.logger.debug("JSON received...This is interesting!")
    app.logger.debug(request.get_json(force=True))

    # 取得客户端 POST 过来的 json 数据
    request_json = request.get_json(force=True)

    # 当正常接收到数据时，执行以下步骤
    if request_json:
        # 从字典中取出数据
        name = request_json['name']
        gender = request_json['gender']

        # 处理数据
        name = name + 'ROCK'
        gender = gender + 'ROLL'

        # 服务器端打印结果，仅供肉眼检查
        print(name)
        print(gender)

        # 返回 JSON 格式的数据
        return jsonify({
            "name": name,
            "gender": gender
        })
    else:
        # 若发生错误，未接收到数据，则返回错误信息
        return "Sorry, no json data received."


if __name__ == "__main__":
    app.run()
