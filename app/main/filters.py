# -*- coding: utf-8 -*-
from __future__ import unicode_literals, absolute_import
from app.main import main
import time


@main.template_filter('ctime')
def timectime(s):
    return time.ctime(s)  # datetime.datetime.fromtimestamp(s)
