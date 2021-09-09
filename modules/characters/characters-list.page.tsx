import {
  alpha,
  Avatar,
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  InputBase,
  Paper,
  Grid,
  Card,
  CardContent,
  Stack,
  Box,
  Skeleton,
  styled,
} from '@mui/material';
import React, { useRef, useState } from 'react';
import { useCharactersQuery } from './hooks/use-characters.query';
import Link from '../shared/link';
import { imageLoader } from '../../utils/image-loader';
import SearchIcon from '@mui/icons-material/Search';
import ImageNext from 'next/Image';
import Typography from '@mui/material/Typography';

const Search = styled(Paper)(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(2, 1, 2, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
  },
}));

export const CharactersList: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [search, setSearch] = useState('');

  const characters = useCharactersQuery(1, search);

  return (
    <Container component="main" maxWidth="md">
      <Search sx={{ mt: 5 }} elevation={2}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          inputRef={inputRef}
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
          value={search}
          onChange={(event) => setSearch(event.target.value || '')}
        />
      </Search>
      {characters.isLoading && (
        <Grid container spacing={3} sx={{ mt: 5 }}>
          {new Array(8).fill(null).map((_, i) => (
            <Grid item lg={6} key={i}>
              <Skeleton component="div" height={'150px'} variant={'rectangular'} sx={{ borderRadius: 2 }} />
            </Grid>
          ))}
        </Grid>
      )}
      <Grid container spacing={3} sx={{ mt: 5, mb: 5 }}>
        {characters.data?.characters?.results?.map((x) => (
          <Grid item lg={6} key={x?.id}>
            <Card elevation={3} sx={{ ':hover': { boxShadow: 5 } }}>
              <Link href={`/characters/${x?.id}`} sx={{ textDecoration: 'none', color: 'inherit' }}>
                <Stack direction="row">
                  <Box sx={{ position: 'relative', width: '150px', height: '150px', minWidth: '150px' }}>
                    <ImageNext
                      loader={imageLoader}
                      src={x?.image || ''}
                      alt={x?.image || ''}
                      layout="fill"
                      quality={75}
                    />
                  </Box>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', width: '100%' }}
                    >
                      {x?.name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {x?.gender}
                    </Typography>
                    <Typography variant="body2" color={x?.status === 'Alive' ? 'success.main' : 'error.main'}>
                      {x?.status}
                    </Typography>
                    <Typography variant={'caption'} color="text.primary">
                      {x?.location?.name}
                    </Typography>
                  </CardContent>
                </Stack>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
