#!/usr/bin/env python3
"""
Script to recreate the database with the current models
"""

import os
from app import app, db
from models import Tournament, Prompt

def recreate_database():
    """Recreate the database with current models"""
    
    with app.app_context():
        # Drop all tables
        print("Dropping all existing tables...")
        db.drop_all()
        
        # Create all tables based on current models
        print("Creating tables based on current models...")
        db.create_all()
        
        print("✅ Database recreated successfully!")
        print("Available tables:")
        
        # List all tables
        inspector = db.inspect(db.engine)
        tables = inspector.get_table_names()
        for table in tables:
            print(f"  - {table}")

if __name__ == "__main__":
    recreate_database()
