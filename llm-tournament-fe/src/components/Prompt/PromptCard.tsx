import React, { useState } from 'react';
import {Prompt} from "../../models";
import {Card, CardContent, Typography, Button, Box, Collapse, IconButton} from "@mui/material";
import {ExpandMore, ExpandLess} from "@mui/icons-material";

interface PromptCardProps {
  prompt: Prompt;
  onWin: () => void;
}

export const PromptCard = (props: PromptCardProps) => {
  const { prompt, onWin } = props;
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h6" component="h3" sx={{ fontWeight: 600, color: 'primary.main' }}>
            AI Agent Prompt
          </Typography>
          <IconButton
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            size="small"
          >
            {expanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>

        <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6 }}>
          {prompt.result}
        </Typography>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: 'text.secondary' }}>
              Full Prompt Instructions:
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.6, fontStyle: 'italic' }}>
              {prompt.prompt}
            </Typography>
          </Box>
        </Collapse>
      </CardContent>

      <Box sx={{ p: 2, pt: 0 }}>
        <Button
          variant="contained"
          color="success"
          onClick={onWin}
          fullWidth
          sx={{
            py: 1.5,
            fontWeight: 600,
            borderRadius: 2,
            textTransform: 'none'
          }}
        >
          This One Wins! 🏆
        </Button>
      </Box>
    </Card>
  );
};