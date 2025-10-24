from flask import request, jsonify
from app import app
from db import db
from models import Tournament, Prompt

@app.route('/tournaments', methods=['GET'])
def get_tournaments():
    tournaments = Tournament.query.all()
    return jsonify([tournament.to_json() for tournament in tournaments])

@app.route('/tournaments', methods=['POST'])
def create_tournament():
    data = request.json
    tournament = Tournament(
        name=data['name'], 
        user_input=data['user_input'], 
        start_date=data['start_date'], 
        end_date=data['end_date']
    )
    db.session.add(tournament)
    db.session.commit()
    return jsonify(tournament.to_json()), 201

@app.route('/tournaments/<int:id>', methods=['GET'])
def get_tournament(id):
    tournament = Tournament.query.get_or_404(id)
    
    from sqlalchemy.orm import aliased
    
    tournament_data = tournament.to_json()

    tournament_data['prompts'] = []
    prompts = Prompt.query.filter_by(tournament_id=id).all()
    for prompt in prompts:
        prompt_data = prompt.to_json()
        tournament_data['prompts'].append(prompt_data)

    return jsonify(tournament_data)
