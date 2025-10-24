from flask import Flask
from flask_cors import CORS
from sqlalchemy import create_engine
from sqlalchemy_utils import database_exists, create_database
from db import db

app = Flask(__name__)
app.config['SECRET_KEY'] = 'my-secret'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///llm_tournament.db'

CORS(app)

engine = create_engine(app.config['SQLALCHEMY_DATABASE_URI'])
if not database_exists(engine.url):
    create_database(engine.url)

db.init_app(app)

from models import Tournament, Prompt

with app.app_context():
    db.create_all()

@app.shell_context_processor
def make_shell_context():
    return dict(db=db, Tournament=Tournament, Prompt=Prompt)

from tournament.routes import *
from prompt.routes import *


if __name__ == '__main__':
    app.run(debug=True)