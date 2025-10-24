# LLM Tournament Backend

A Flask-based REST API for managing AI agent tournaments where different prompts compete against each other.

## 🏗️ Architecture

- **Framework**: Flask
- **Database**: SQLite with SQLAlchemy ORM
- **CORS**: Enabled for frontend integration
- **Models**: Tournament and Prompt entities

## 📋 Prerequisites

- Python 3.7+
- pip (Python package installer)

## 🚀 Quick Start

### 1. Install Dependencies

```bash
pip install flask flask-sqlalchemy flask-cors sqlalchemy-utils
```

### 2. Database Setup

The application will automatically create the database and tables on first run. However, if you need to recreate the database:

```bash
# Drop and recreate all tables
python3 recreate_db.py
```

### 3. Seed Sample Data

Populate the database with sample tournaments and prompts:

```bash
python3 seed.py
```

This will create:
- 2 tournaments (Creative Writing Mastery & Code Review Excellence)
- 30 prompts per tournament with sample LLM responses
- All prompts automatically added to Round 1 matches

### 4. Run the Application

```bash
python3 app.py
```

The API will be available at `http://localhost:5000`

## 🗄️ Database Models

### Tournament
- `id`: Primary key
- `name`: Tournament name
- `user_input`: User's question for the LLM
- `start_date`: Tournament start date
- `end_date`: Tournament end date

### Prompt
- `id`: Primary key
- `tournament_id`: Foreign key to Tournament
- `prompt`: AI agent instructions
- `result`: LLM response to the prompt
- `lost`: Boolean flag for elimination status
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp

## 🔌 API Endpoints

### Tournaments

- `GET /tournaments` - List all tournaments
- `GET /tournaments/<id>` - Get tournament details with prompts
- `POST /tournaments` - Create new tournament

### Prompts

- `GET /prompts/<id>` - Get prompt details
- `PATCH /prompts/<id>` - Update prompt (lost field only)

## 🛠️ Development

### Project Structure

```
llm-tournament-be/
├── app.py              # Main Flask application
├── db.py              # Database configuration
├── models.py          # SQLAlchemy models
├── seed.py            # Database seeding script
├── tournament/        # Tournament routes
│   └── routes.py
└── prompt/           # Prompt routes
    └── routes.py
```