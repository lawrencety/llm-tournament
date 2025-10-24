from flask import request, jsonify
from app import app
from db import db
from models import Prompt

@app.route('/prompts/<int:prompt_id>', methods=['PATCH'])
def update_prompt(prompt_id):
    try:
        prompt = Prompt.query.get_or_404(prompt_id)
        
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        if 'lost' not in data:
            return jsonify({'error': 'Only the "lost" field can be updated'}), 400
        
        if not isinstance(data['lost'], bool):
            return jsonify({'error': 'The "lost" field must be a boolean value'}), 400
        
        prompt.lost = data['lost']
        
        from datetime import datetime
        prompt.updated_at = datetime.now()
        
        db.session.commit()
        
        return jsonify({
            'message': 'Prompt updated successfully',
            'prompt': prompt.to_json()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Failed to update prompt: {str(e)}'}), 500

@app.route('/prompts/<int:prompt_id>', methods=['GET'])
def get_prompt(prompt_id):
    try:
        prompt = Prompt.query.get_or_404(prompt_id)
        return jsonify(prompt.to_json()), 200
        
    except Exception as e:
        return jsonify({'error': f'Failed to get prompt: {str(e)}'}), 500
