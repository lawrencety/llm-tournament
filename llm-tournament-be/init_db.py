#!/usr/bin/env python3
"""
Initialize database with fresh tables
"""

from app import app, db
from models import Tournament, Prompt

def init_database():
    """Initialize the database with fresh tables"""
    with app.app_context():
        print("Initializing database...")
        
        # Drop all existing tables
        db.drop_all()
        print("Dropped existing tables")
        
        # Create all tables
        db.create_all()
        print("Created new tables")
        
        # Verify tables exist
        try:
            # Test queries to ensure tables exist
            Tournament.query.count()
            Prompt.query.count()
            print("Database initialized successfully!")
            return True
        except Exception as e:
            print(f"Error initializing database: {e}")
            return False

if __name__ == "__main__":
    init_database()
