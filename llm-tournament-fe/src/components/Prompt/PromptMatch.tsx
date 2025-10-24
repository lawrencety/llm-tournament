import React, { useState } from 'react';
import {Prompt} from "../../models";
import {Box, Grid, Typography } from "@mui/material";
import {PromptCard} from "./PromptCard";
import {useUpdatePrompt} from "../../apis/prompt";

interface PromptMatchProps {
  activePrompts: Prompt[]
}

export const PromptMatch = (props: PromptMatchProps) => {
  const { activePrompts } = props;

  const [matchPrompts, setMatchPrompts] = useState<{left: Prompt, right: Prompt }>({ left: activePrompts[0], right: activePrompts[1]});
  const updatePrompt = useUpdatePrompt()

  const handlePromptLost = (id: number, side: 'left' | 'right') => {
    if (id) {
      updatePrompt.mutate({ id, lost: true })
      const newMatchPrompts = { ...matchPrompts };
      const newActivePrompts = activePrompts.filter(prompt => prompt.id !== id);
      newMatchPrompts[side] = newActivePrompts[1];
      setMatchPrompts(newMatchPrompts);
    }
  }

  // If there are no active prompts or not enough for a match, show message
  if (activePrompts.length < 2) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" color="text.secondary">
          No more matches available
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid size={{ xs: 6 }}>
          <PromptCard prompt={matchPrompts.left} onWin={() => handlePromptLost(matchPrompts.right.id, 'right')}/>
        </Grid>
        <Grid size={{ xs: 6 }}>
          <PromptCard prompt={matchPrompts.right} onWin={() => handlePromptLost(matchPrompts.left.id, 'left')}/>
        </Grid>
      </Grid>
    </Box>
  )
}