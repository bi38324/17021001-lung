# -*- coding: utf-8 -*-
from flask_migrate import MigrateCommand
from flask_script import Manager, Shell, Server

from app import create_app, mongo


app = create_app()
manager = Manager(app)


def make_shell_context():
    return dict(app=app, mongo=mongo)

manager.add_command('shell', Shell(make_context=make_shell_context))
manager.add_command('runserver', Server('0.0.0.0', use_debugger=True))
manager.add_command('db', MigrateCommand)

if __name__ == '__main__':
    manager.run()
