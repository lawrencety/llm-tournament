import React from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Container,
  Grid,
  Paper,
  Chip,
  Divider,
  IconButton
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import { useGetTournament } from "../../apis/tournament";
import { useParams } from "react-router";
import { PromptMatch } from "../../components/Prompt/PromptMatch";
import { PromptCard } from "../../components/Prompt/PromptCard";

export const TournamentDetail = () => {
  const { tournamentId } = useParams();
  const navigate = useNavigate();
  const { data: tournament, isLoading, error, refetch } = useGetTournament({ id: Number(tournamentId) });

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={() => refetch()}>
              Retry
            </Button>
          }
          sx={{ borderRadius: 2 }}
        >
          {error instanceof Error ? error.message : 'Failed to fetch tournament'}
        </Alert>
      </Container>
    );
  }

  if (!tournament) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="warning" sx={{ borderRadius: 2 }}>
          Tournament not found
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper sx={{ p: 4, mb: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <IconButton onClick={() => navigate('/tournaments')} color="primary" aria-label="back to tournaments">
              <ArrowBack />
            </IconButton>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 700,
                color: 'primary.main',
                flexGrow: 1,
                textAlign: 'center'
              }}
            >
              {tournament.name}
            </Typography>
            <Box sx={{ width: 48 }} />
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Typography
            variant="h6"
            color="text.primary"
            sx={{
              mb: 3,
              maxWidth: '800px',
              mx: 'auto',
              textAlign: 'center',
              lineHeight: 1.6
            }}
          >
            {tournament.userInput}
          </Typography>
        </Box>
      </Paper>

      {tournament.prompts && tournament.prompts.length > 1 && (
        <Box>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              textAlign: 'center',
              mb: 3,
              color: 'primary.main',
              fontWeight: 700
            }}
          >
            Choose Your Winner
          </Typography>
          <PromptMatch prompts={tournament.prompts} />
        </Box>
      )}
    </Container>
  );
};