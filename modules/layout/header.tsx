import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Image from 'next/Image';
import Switch from '@mui/material/Switch';
import { SettingsContext } from '../settings/settings.provider';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Stack } from '@mui/material';
import Link from '../shared/link';

export const Header: React.FC = () => {
  const { darkMode } = useContext(SettingsContext);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Stack direction="row" alignItems="center">
            <Box sx={{ py: 1, mr: 2 }}>
              <Image src="/rick-and-morty.png" width={50} height={50} layout="fixed" />
            </Box>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Rick & Morty
            </Typography>
          </Stack>

          <Stack justifyContent="center" direction="row" flexGrow={1}>
            <Stack direction={'row'} spacing={2}>
              <Typography variant={'body1'} sx={{ ':hover': { opacity: 0.7 } }}>
                <Link href="/" sx={{ color: 'inherit', textDecoration: 'none' }}>
                  Characters
                </Link>
              </Typography>
              <Typography variant={'body1'} sx={{ ':hover': { opacity: 0.7 } }}>
                <Link href="/system" sx={{ color: 'inherit', textDecoration: 'none' }}>
                  MUI v5 System
                </Link>
              </Typography>
            </Stack>
          </Stack>

          <FormControlLabel
            labelPlacement="start"
            control={
              <Switch
                inputProps={{ 'aria-label': 'Dark Mode' }}
                checked={darkMode.value}
                onChange={(_, checked) => darkMode.set(checked)}
              />
            }
            label="Dark theme"
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
};
