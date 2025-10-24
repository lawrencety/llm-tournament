import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
} from '@mui/material';
import { Link } from "react-router";
import { Tournament } from "../../models";

interface TournamentCardProps {
  tournament: Tournament;
}

export const TournamentCard: React.FC<TournamentCardProps> = ({
  tournament,
}) => {

  return (
    <Card>
      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">
            {tournament.name}
          </Typography>
        </Box>

        <Typography variant="body2">
          {tournament.userInput}
        </Typography>
      </CardContent>
      <CardActions sx={{ p: 2 }}>
        <Link to={`/tournament/${tournament.id}`} style={{ textDecoration: 'none' }}>
          <Button variant="contained">
            View Tournament
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};