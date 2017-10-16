#!/bin/bash

gunicorn -c deploy/deploy_config.py manage:app && flower -A bdms_tms.tms:app