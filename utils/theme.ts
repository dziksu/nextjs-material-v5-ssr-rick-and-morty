import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

export const getTheme = (isDarkMode?: boolean) =>
  createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: '#5e892a',
      },
      secondary: {
        main: '#597ea1',
      },
      error: {
        main: red.A400,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          outlinedPrimary: {
            backgroundColor: '#fff',
          },
        },
        defaultProps: {
          size: 'large',
        },
      },
    },
  });
