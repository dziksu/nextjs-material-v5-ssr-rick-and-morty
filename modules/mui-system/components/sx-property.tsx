import { alpha, Box, Paper } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import React from 'react';
import Typography from '@mui/material/Typography';

export const SxProperty: React.FC = () => {
  return (
    <>
      <Typography sx={{ m: 10, mt: 5, fontSize: { sm: 20, md: 40 } }} variant="body1">
        <strong>SX</strong> property
      </Typography>
      <Paper
        elevation={4}
        sx={{
          display: 'flex',
          boxShadow: 20,

          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          bgcolor: 'background.default',
          overflow: 'hidden',
          borderRadius: '12px',
          fontWeight: 'bold',
        }}
      >
        <Box
          component="img"
          sx={{
            height: 233,
            width: 350,
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
            ':hover': {
              opacity: 0.6,
            },
          }}
          alt="The house from the offer."
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'center', md: 'flex-start' },
            m: 3,
            minWidth: { md: 350 },
          }}
        >
          <Box component="span" sx={{ fontSize: 16, mt: 1 }}>
            123 Main St, Phoenix AZ
          </Box>
          <Box component="span" sx={{ color: 'primary.main', fontSize: 22 }}>
            $280,000 — $310,000
          </Box>
          <Box
            sx={{
              mt: 1.5,
              p: 0.5,
              backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
              borderRadius: '5px',
              color: 'primary.main',
              fontWeight: 'medium',
              display: 'flex',
              fontSize: 12,
              alignItems: 'center',
              '& svg': {
                fontSize: 21,
                mr: 0.5,
              },
            }}
          >
            <ErrorOutlineIcon />
            CONFIDENCE SCORE 85%
          </Box>
        </Box>
      </Paper>
    </>
  );
};
