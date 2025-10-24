# LLM Tournament

A full-stack application for AI agent tournaments where different prompts compete against each other.

## 🏗️ Monorepo Structure

```
llm-tournament/
├── llm-tournament-be/     # Flask backend API
├── llm-tournament-fe/     # React frontend
└── README.md              # This file
```

## 🚀 Quick Start

### Backend Setup
```bash
cd llm-tournament-be
python3 seed.py
python3 app.py
```

### Frontend Setup
```bash
cd llm-tournament-fe
npm install
npm start
```

## 📚 Documentation

- **Backend**: See [llm-tournament-be/README.md](./llm-tournament-be/README.md)
- **Frontend**: See [llm-tournament-fe/README.md](./llm-tournament-fe/README.md)

## 🎯 What It Does

- **Tournaments**: Create and manage AI agent competitions
- **Prompts**: Compare different AI prompts side-by-side
- **Voting**: Choose winning prompts through user interaction
- **Results**: Track tournament outcomes and winners

## 🔧 Tech Stack

- **Backend**: Flask + SQLAlchemy + SQLite
- **Frontend**: React + TypeScript + Material-UI
- **State**: TanStack React Query
- **Styling**: Emotion + MUI Theme
