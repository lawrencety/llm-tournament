import {
  Box,
  Grid,
  Typography,
  Alert,
  Button,
  Container,
  Paper,
  Skeleton
} from "@mui/material";
import React from 'react';
import { useGetTournaments } from '../../apis/tournament';
import { TournamentCard } from '../../components/Tournament/TournamentCard';
import { Tournament } from "../../models";

export const Tournaments = () => {
  const { data: tournaments = [], isLoading, error, refetch } = useGetTournaments();

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
        >
          {error.message || 'Failed to fetch tournaments'}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container alignItems="center" direction="column" spacing={2} sx={{ pb: 4 }}>
        <Grid>
          <Typography variant="h2">
            LLM Tournament
          </Typography>
        </Grid>
        <Grid>
          <Typography variant="h6">
            Decide which LLM Agent Prompt works best in side-by-side matchups.
          </Typography>
        </Grid>
      </Grid>
      {isLoading ? (
        <Box>
          <Grid container spacing={3}>
            {[...Array(6)].map((_, index) => (
              <Grid size={{ md: 4, sm: 6, xs: 12 }} key={index}>
                <Paper sx={{ p: 3, height: 300 }}>
                  <Skeleton variant="text" width="80%" height={40} />
                  <Skeleton variant="text" width="60%" height={20} sx={{ mt: 1 }} />
                  <Skeleton variant="rectangular" height={100} sx={{ mt: 2 }} />
                  <Skeleton variant="text" width="40%" height={20} sx={{ mt: 2 }} />
                  <Skeleton variant="text" width="50%" height={20} sx={{ mt: 1 }} />
                  <Skeleton variant="rectangular" width={120} height={36} sx={{ mt: 2 }} />
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : tournaments.length === 0 ? (
        <Paper>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            No tournaments available
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Check back later for new AI agent tournaments.
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {tournaments.map((tournament: Tournament) => (
            <Grid size={{ md: 4, sm: 6, xs: 12 }} key={tournament.id}>
              <TournamentCard tournament={tournament} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};