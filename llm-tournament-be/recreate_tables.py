#!/usr/bin/env python3
"""
Script to recreate all database tables
"""

from app import app, db
from models import Tournament, Prompt

def recreate_tables():
    """Drop and recreate all tables"""
    with app.app_context():
        print("🗑️  Dropping all tables...")
        
        # Drop all tables
        db.drop_all()
        
        print("✅ All tables dropped")
        
        print("🏗️  Creating all tables...")
        
        # Create all tables
        db.create_all()
        
        print("✅ All tables created successfully")
        
        # Verify tables were created
        print("\n📋 Verifying table creation...")
        
        # Check if we can query the tables (this will fail if tables don't exist)
        try:
            tournament_count = Tournament.query.count()
            prompt_count = Prompt.query.count()
            
            print(f"✅ Tournament table: {tournament_count} records")
            print(f"✅ Prompt table: {prompt_count} records")
            
        except Exception as e:
            print(f"❌ Error verifying tables: {e}")
            return False
            
        print("\n🎉 Database tables recreated successfully!")
        return True

if __name__ == "__main__":
    print("🔄 Starting table recreation...")
    success = recreate_tables()
    
    if success:
        print("\n✅ Table recreation completed successfully!")
        print("💡 You can now run the seed script to populate with data:")
        print("   python seed.py")
    else:
        print("\n❌ Table recreation failed!")
