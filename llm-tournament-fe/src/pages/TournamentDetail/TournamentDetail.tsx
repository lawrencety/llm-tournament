import React from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Container,
  Paper,
  Divider,
  Grid
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import { useGetTournament } from "../../apis/tournament";
import { useParams } from "react-router";
import { PromptMatch } from "../../components/Prompt/PromptMatch";
import {WinningPrompt} from "../../components/Prompt/WinningPrompt";

export const TournamentDetail = () => {
  const { tournamentId } = useParams();
  const navigate = useNavigate();
  const { data: tournament, isLoading, error, refetch } = useGetTournament({ id: Number(tournamentId) });

  const activePrompts = tournament?.prompts ? tournament.prompts.filter(prompt => !prompt.lost) : [];

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
          {error.message || 'Failed to fetch tournament'}
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
        <Grid container direction="column" alignItems="center" spacing={2}>
          <Grid sx={{ position: 'relative', top: -20, left: '-50%', transform: 'translateX(50%)',  height: 0}}>
            <Button  onClick={() => navigate('/tournaments')} startIcon={<ArrowBack />}>
              Back to Tournaments
            </Button>
          </Grid>
          <Grid>
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
          </Grid>
          <Grid sx={{ width: '100%', height: 1 }}>
            <Divider  />
          </Grid>
          <Grid>
            <Typography variant="h6">
              User Input:
            </Typography>
          </Grid>
          <Grid>
            <Typography variant="h6">
              {tournament.userInput}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {activePrompts.length === 1 && <WinningPrompt prompt={activePrompts[0]} />}

      {activePrompts.length > 1 && (
        <Grid container spacing={2} direction="column" alignItems="center">
          <Grid>
            <Typography variant="h4">
              Left or Right?
            </Typography>
          </Grid>
          <Grid>
            <PromptMatch activePrompts={activePrompts} />
          </Grid>
        </Grid>
      )}
    </Container>
  );
};