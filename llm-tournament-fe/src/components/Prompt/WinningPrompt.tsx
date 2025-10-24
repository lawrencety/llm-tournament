import React from 'react';
import {Prompt} from "../../models";
import { Card, CardContent, Typography, Grid, Paper} from "@mui/material";
import { Star, CheckCircle} from "@mui/icons-material";

interface WinningPromptProps {
  prompt: Prompt;
}

export const WinningPrompt = (props: WinningPromptProps) => {
  const { prompt } = props;

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12 }}>
        <Paper 
          sx={{
            p: 3,
            background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)'
          }}
        >
          <Grid container justifyContent="center" sx={{ pb: 2 }}>
            <Grid>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: '#8b4513',
                }}
              >
                🏆 WINNER! 🏆
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <Card sx={{background: 'rgba(255, 255, 255, 0.95)'}}>
                <CardContent>
                  <Grid container alignItems="start">
                    <Grid>
                      <CheckCircle sx={{ color: '#4caf50', mr: 1 }} />
                    </Grid>
                    <Grid>
                      <Typography
                        variant="h6"
                        sx={{
                          color: '#2e7d32',
                        }}
                      >
                        WINNING RESULT
                      </Typography>
                    </Grid>
                  </Grid>
                  <Typography
                    variant="body1" 
                    sx={{
                      fontStyle: 'italic',
                      p: 2,
                      bgcolor: '#f8f9fa',
                      border: '1px solid #e0e0e0'
                    }}
                  >
                    {prompt.result}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Card sx={{background: 'rgba(255, 255, 255, 0.95)'}}>
                <CardContent>
                  <Grid container alignItems="start">
                    <Grid>
                      <Star sx={{ color: '#ff9800', mr: 1 }} />
                    </Grid>
                    <Grid>
                      <Typography
                        variant="h6"
                        sx={{
                          color: '#e65100',
                          fontWeight: 600,
                        }}
                      >
                        WINNING PROMPT
                      </Typography>
                    </Grid>
                  </Grid>
                  <Typography
                    variant="body1" 
                    sx={{ 
                      p: 2,
                      bgcolor: '#f8f9fa',
                      border: '1px solid #e0e0e0'
                    }}
                  >
                    {prompt.prompt}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}