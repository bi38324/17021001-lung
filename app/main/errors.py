# -*- coding: utf-8 -*-
from flask import jsonify

from . import main


@main.app_errorhandler(404)
def page_not_found(e):
    return jsonify({'msg': 'page not found'}), 404


@main.app_errorhandler(500)
def internal_server_error(e):
    return jsonify({'msg': 'internal server error'}), 500
