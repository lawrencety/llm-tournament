import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  IconButton,
  Tooltip
} from '@mui/material';
import { Link } from "react-router";
import {
  CalendarToday,
  Schedule,
  EmojiEvents,
  Psychology,
  Code,
  Edit,
  ArrowForward
} from '@mui/icons-material';
import { Tournament } from "../../models";

interface TournamentCardProps {
  tournament: Tournament;
}

export const TournamentCard: React.FC<TournamentCardProps> = ({
  tournament,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusChip = () => {
    const now = new Date();
    const startDate = new Date(tournament.startDate);
    const endDate = new Date(tournament.endDate);

    if (now < startDate) {
      return <Chip label="Upcoming" color="primary" size="small" icon={<Schedule />} />;
    } else if (now >= startDate && now <= endDate) {
      return <Chip label="Active" color="success" size="small" icon={<EmojiEvents />} />;
    } else {
      return <Chip label="Completed" color="default" size="small" icon={<EmojiEvents />} />;
    }
  };

  const getTournamentIcon = () => {
    const name = tournament.name.toLowerCase();
    if (name.includes('creative') || name.includes('writing')) {
      return <Edit color="primary" />;
    } else if (name.includes('code') || name.includes('review')) {
      return <Code color="primary" />;
    }
    return <Psychology color="primary" />;
  };

  const getTournamentColor = () => {
    const name = tournament.name.toLowerCase();
    if (name.includes('creative') || name.includes('writing')) {
      return 'linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%)';
    } else if (name.includes('code') || name.includes('review')) {
      return 'linear-gradient(135deg, #4ecdc4 0%, #6dd5ed 100%)';
    }
    return 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)';
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: getTournamentColor(),
        }
      }}
    >
      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box sx={{ mr: 1.5, display: 'flex', alignItems: 'center' }}>
            {getTournamentIcon()}
          </Box>
          <Typography
            variant="h6"
            component="h2"
            sx={{
              flexGrow: 1,
              fontWeight: 600,
              lineHeight: 1.3
            }}
          >
            {tournament.name}
          </Typography>
          {getStatusChip()}
        </Box>

        <Typography
          variant="body2"
          color="text.primary"
          sx={{
            mb: 3,
            lineHeight: 1.6,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {tournament.userInput}
        </Typography>

        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          p: 2,
          bgcolor: 'grey.50',
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'grey.200'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CalendarToday sx={{ fontSize: 16, color: 'text.primary' }} />
            <Typography variant="caption" color="text.primary" sx={{ fontWeight: 500 }}>
              <strong>Start:</strong> {formatDate(tournament.startDate)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CalendarToday sx={{ fontSize: 16, color: 'text.primary' }} />
            <Typography variant="caption" color="text.primary" sx={{ fontWeight: 500 }}>
              <strong>End:</strong> {formatDate(tournament.endDate)}
            </Typography>
          </Box>
        </Box>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <Link to={`/tournament/${tournament.id}`} style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            endIcon={<ArrowForward />}
            sx={{
              width: '100%',
              py: 1.5,
              fontWeight: 600,
              borderRadius: 2,
              textTransform: 'none'
            }}
          >
            View Tournament
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};