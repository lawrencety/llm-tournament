# LLM Tournament Frontend

A React-based frontend for managing AI agent tournaments where different prompts compete against each other.

## 🏗️ Architecture

- **Framework**: React 18 with TypeScript
- **UI Library**: Material-UI (MUI) v5
- **State Management**: TanStack React Query
- **Routing**: React Router v6
- **Styling**: Emotion

## 📋 Prerequisites

- Node.js 16+
- npm or yarn
- Backend API running on `http://localhost:5000`

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm start
```

The application will be available at `http://localhost:3000`

## 🎯 Features

### Tournament Management
- **Tournament List**: View all available tournaments
- **Tournament Details**: Detailed tournament information
- **Match Interface**: Side-by-side prompt comparison
- **Winner Selection**: Choose winning prompts

## 🗂️ Project Structure

```
llm-tournament-fe/
├── public/                 # Static assets
├── src/
│   ├── apis/              # API service layer
│   │   ├── index.ts       # API configuration
│   │   ├── tournament.ts  # Tournament API calls
│   │   └── prompt.ts      # Prompt API calls
│   ├── components/         # Reusable components
│   │   ├── Tournament/    # Tournament components
│   │   └── Prompt/        # Prompt components
│   ├── pages/             # Page components
│   │   ├── Tournaments/   # Tournament list page
│   │   └── TournamentDetail/ # Tournament detail page
│   ├── theme.ts           # MUI theme configuration
│   ├── App.tsx            # Main application component
│   ├── models.ts          # TypeScript interfaces
│   └── index.tsx          # Application entry point
```

## 🔌 API Integration

### Tournament API
- `GET /tournaments` - Fetch all tournaments
- `GET /tournaments/:id` - Fetch tournament details

### Prompt API
- `GET /prompts/:id` - Fetch prompt details
- `PATCH /prompts/:id` - Update prompt win/lose

### React Query Hooks
```typescript
// Tournament hooks
const { data: tournaments } = useGetTournaments();
const { data: tournament } = useGetTournament({ id: tournamentId });

// Prompt hooks
const { data: prompt } = useGetPrompt({ id: promptId });
const updatePrompt = useUpdatePrompt();
```

## 🛠️ Development

### Key Technologies

- **React Query**: Server state management
- **Material-UI**: Component library
- **TypeScript**: Type safety
- **React Router**: Client-side routing

## 📄 License

This project is part of the LLM Tournament system for AI agent competitions.