import React, { useEffect, useState } from 'react';
import { alpha, Box, Button, Paper, Stack, Switch } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Typography from '@mui/material/Typography';
import { green, purple, blue, red } from '@mui/material/colors';
// import Card from '@mui/material/Card';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import CardMedia from '@mui/material/CardMedia';
import { styled } from '@mui/material';
import dynamic from 'next/dynamic';

const Card = dynamic(() => import('@mui/material/Card'));
const CardHeader = dynamic(() => import('@mui/material/CardHeader'));
const CardContent = dynamic(() => import('@mui/material/CardContent'));
const CardActions = dynamic(() => import('@mui/material/CardActions'));
const Collapse = dynamic(() => import('@mui/material/Collapse'));
const Avatar = dynamic(() => import('@mui/material/Avatar'));
const ShareIcon = dynamic(() => import('@mui/icons-material/Share'));
const ExpandMoreIcon = dynamic(() => import('@mui/icons-material/ExpandMore'));
const MoreVertIcon = dynamic(() => import('@mui/icons-material/MoreVert'));
const ButtonGroup = dynamic(() => import('@mui/material/ButtonGroup'));
const Fab = dynamic(() => import('@mui/material/Fab'));
const AddIcon = dynamic(() => import('@mui/icons-material/Add'));
const EditIcon = dynamic(() => import('@mui/icons-material/Edit'));
const FavoriteIcon = dynamic(() => import('@mui/icons-material/Favorite'));
const NavigationIcon = dynamic(() => import('@mui/icons-material/Navigation'));

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    dashed: true;
  }
}

declare module '@mui/material/styles' {
  interface Theme {
    sizes: {
      appBar: number;
    };
  }
  interface ThemeOptions {
    sizes?: {
      appBar: number;
    };
  }
}

const generateTheme = (dark: boolean) =>
  createTheme({
    // extra params
    sizes: {
      appBar: 55,
    },
    // pallete
    palette: {
      mode: dark ? 'dark' : 'light',
      primary: {
        main: purple[400],
      },
      secondary: {
        main: green[500],
      },
      contrastThreshold: 3,
      tonalOffset: 0.1,
    },
    //typography
    typography: {
      fontFamily: [
        '"Helvetica Neue"',
        'Arial',
        '"Segoe UI"',
        'sans-serif',
        '"Apple Color Emoji"',
        '-apple-system',
        'BlinkMacSystemFont',
        'Roboto',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      button: {
        fontSize: 'larger',
      },
    },
    //spacing
    spacing: 3,
    //breakpoints
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
    //components defaultProps & styleOverrides & variants
    components: {
      MuiButton: {
        defaultProps: {
          size: 'large',
        },
        styleOverrides: {
          contained: {
            borderRadius: 0,
          },
          outlined: {
            borderRadius: 30,
          },
        },
        variants: [
          {
            props: { variant: 'dashed' },
            style: {
              textTransform: 'lowercase',
              border: `2px dashed ${blue[500]}`,
            },
          },
          {
            props: { variant: 'dashed', color: 'secondary' },
            style: {
              textTransform: 'lowercase',
              border: `4px dashed ${red[500]}`,
            },
          },
        ],
      },
    },
    //transitions
    transitions: {
      duration: {
        shortest: 150,
        shorter: 200,
        short: 250,
        // most basic recommended timing
        standard: 300,
        // this is to be used in complex animations
        complex: 375,
        // recommended when something is entering screen
        enteringScreen: 225,
        // recommended when something is leaving screen
        leavingScreen: 195,
      },
    },
  });

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const CustomTheme: React.FC = () => {
  const [dark, setDark] = useState(false);
  const [theme, setTheme] = useState(generateTheme(dark));
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const buttons = [<Button key="one">One</Button>, <Button key="two">Two</Button>, <Button key="three">Three</Button>];

  useEffect(() => {
    setTheme(generateTheme(dark));
  }, [dark]);

  return (
    <ThemeProvider theme={theme}>
      <Paper sx={{ p: 10 }}>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography sx={{ mb: 2, mt: 5, fontSize: { sm: 20, md: 40 } }} variant="body1">
            Custom theme
          </Typography>
          <Switch value={dark} onChange={(_, val) => setDark(val)} />
        </Stack>
        <Paper
          elevation={4}
          sx={{
            display: 'flex',
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
              height: 250,
              width: 350,
              maxHeight: { xs: 233, md: 167 },
              maxWidth: { xs: 350, md: 250 },
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
            <Button variant={'contained'} color="primary">
              123 Main St, Phoenix AZ
            </Button>
            <Button variant={'outlined'} color="secondary" sx={{ mt: 1 }}>
              $280,000 — $310,000
            </Button>

            <Button variant={'dashed'} sx={{ mt: 1 }}>
              Dashed!
            </Button>
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

        <Box
          sx={{
            mt: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '& > *': {
              m: 1,
            },
          }}
        >
          <ButtonGroup size="small" aria-label="small button group">
            {buttons}
          </ButtonGroup>
          <ButtonGroup color="secondary" aria-label="medium secondary button group">
            {buttons}
          </ButtonGroup>
          <ButtonGroup size="large" aria-label="large button group">
            {buttons}
          </ButtonGroup>
        </Box>

        <Paper sx={{ '& > :not(style)': { m: 1 }, mt: 5, p: 5 }} elevation={10}>
          <Stack
            justifyContent="center"
            direction="row"
            spacing={6}
            sx={{
              flexDirection: {
                lg: 'row',
                md: 'column',
              },
            }}
          >
            <Fab color="primary" aria-label="add">
              <AddIcon />
            </Fab>
            <Fab color="secondary" aria-label="edit">
              <EditIcon />
            </Fab>
            <Fab variant="extended">
              <NavigationIcon sx={{ mr: 1 }} />
              Navigate
            </Fab>
            <Fab disabled aria-label="like">
              <FavoriteIcon />
            </Fab>
          </Stack>
        </Paper>

        <Stack justifyContent="center" direction="row">
          <Card sx={{ maxWidth: 345, m: 10 }} elevation={6}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  R
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title="Shrimp and Chorizo Paella"
              subheader="September 14, 2016"
            />
            <CardMedia
              component="img"
              height="194"
              image="https://rickandmortyapi.com/api/character/avatar/1.jpeg?w=3840&q=75"
              alt="Paella dish"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1
                cup of frozen peas along with the mussels, if you like.
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
              <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>Method:</Typography>
                <Typography paragraph>
                  Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes.
                </Typography>
                <Typography paragraph>
                  Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken,
                  shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes. Transfer
                  shrimp to a large plate and set aside, leaving chicken and chorizo in the pan. Add pimentón, bay
                  leaves, garlic, tomatoes, onion, salt and pepper, and cook, stirring often until thickened and
                  fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                </Typography>
                <Typography paragraph>
                  Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook without
                  stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add
                  reserved shrimp and mussels, tucking them down into the rice, and cook again without stirring, until
                  mussels have opened and rice is just tender, 5 to 7 minutes more. (Discard any mussels that don’t
                  open.)
                </Typography>
                <Typography>Set aside off of the heat to let rest for 10 minutes, and then serve.</Typography>
              </CardContent>
            </Collapse>
          </Card>
        </Stack>
      </Paper>
    </ThemeProvider>
  );
};
