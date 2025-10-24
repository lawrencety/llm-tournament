import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { theme } from './theme';
import { Routing } from './Routing';

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box 
          sx={{ 
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
            backgroundAttachment: 'fixed',
            '&::before': {
              content: '""',
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(17, 153, 142, 0.1) 0%, rgba(56, 239, 125, 0.1) 100%)',
              zIndex: -1,
            }
          }}
        >
          <Routing />
        </Box>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;