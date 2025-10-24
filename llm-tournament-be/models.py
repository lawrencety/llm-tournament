from db import db

class Tournament(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    user_input = db.Column(db.String(2000), nullable=False)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'userInput': self.user_input,
            'startDate': self.start_date.isoformat() if self.start_date else None,
            'endDate': self.end_date.isoformat() if self.end_date else None
        }

class Prompt(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tournament_id = db.Column(db.Integer, db.ForeignKey('tournament.id'), nullable=False)
    prompt = db.Column(db.String(4000), nullable=False)
    result = db.Column(db.String(4000), nullable=False)
    lost = db.Column(db.Boolean, default=False, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)

    def to_json(self):
        return {
            'id': self.id,
            'tournament_id': self.tournament_id,
            'prompt': self.prompt,
            'result': self.result,
            'lost': self.lost,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }