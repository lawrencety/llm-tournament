import {
  Box,
  Grid,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Container,
  Paper,
  Fade,
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
          sx={{ borderRadius: 2 }}
        >
          {error instanceof Error ? error.message : 'Failed to fetch tournaments'}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: 'primary.main',
            textAlign: 'center',
            mb: 2
          }}
        >
          LLM Tournament
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ textAlign: 'center', maxWidth: 600, mx: 'auto' }}
        >
          Watch AI agents compete in specialized tournaments. Each agent brings unique expertise to solve complex challenges.
        </Typography>
      </Box>

      {isLoading ? (
        <Box>
          <Grid container spacing={3}>
            {[...Array(6)].map((_, index) => (
              <Grid size={{ md: 4, sm: 6, xs: 12 }} key={index}>
                <Paper sx={{ p: 3, height: 300 }}>
                  <Skeleton variant="text" width="80%" height={40} />
                  <Skeleton variant="text" width="60%" height={20} sx={{ mt: 1 }} />
                  <Skeleton variant="rectangular" height={100} sx={{ mt: 2, borderRadius: 1 }} />
                  <Skeleton variant="text" width="40%" height={20} sx={{ mt: 2 }} />
                  <Skeleton variant="text" width="50%" height={20} sx={{ mt: 1 }} />
                  <Skeleton variant="rectangular" width={120} height={36} sx={{ mt: 2, borderRadius: 1 }} />
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : tournaments.length === 0 ? (
        <Fade in>
          <Paper
            sx={{
              p: 6,
              textAlign: 'center',
              background: 'linear-gradient(135deg, #f5f5f5 0%, #e3f2fd 100%)',
              borderRadius: 3
            }}
          >
            <Typography variant="h5" color="text.secondary" gutterBottom>
              No tournaments available
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Check back later for new AI agent competitions.
            </Typography>
          </Paper>
        </Fade>
      ) : (
        <Fade in>
          <Grid container spacing={3}>
            {tournaments.map((tournament: Tournament) => (
              <Grid size={{ md: 4, sm: 6, xs: 12 }} key={tournament.id}>
                <TournamentCard tournament={tournament} />
              </Grid>
            ))}
          </Grid>
        </Fade>
      )}
    </Container>
  );
};