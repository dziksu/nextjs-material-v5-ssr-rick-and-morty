import Image from 'next/Image';
import { Avatar, Button, Container, Divider, Grid, Paper, Slider, Stack } from '@mui/material';
import React, { useState } from 'react';
import { imageLoader } from '../../utils/image-loader';
import { useCharacterQuery } from './hooks/use-character.query';
import Typography from '@mui/material/Typography';
import Link from '../shared/link';
import Box from '@mui/material/Box';

type Props = {
  characterId: number;
};

export const CharacterPage: React.FC<Props> = (props) => {
  const { data, refetch, remove } = useCharacterQuery(props.characterId);
  const [avatarSize, setAvatarSize] = useState(300);

  return (
    <Container component="main" maxWidth="md" sx={{ mt: 5 }}>
      <Box sx={{ my: 3 }}>
        <Link href="/">{'< Go back'}</Link>
      </Box>
      <Paper elevation={3} sx={{ mt: 8, p: 5, borderRadius: 10 }}>
        <Grid container sx={{ p: 0 }}>
          <Grid item lg={6}>
            <Avatar sx={{ width: avatarSize, height: avatarSize }}>
              {data?.character.image && <Image loader={imageLoader} src={data?.character.image || ''} layout="fill" />}
            </Avatar>
          </Grid>
          <Grid item lg={6}>
            <Typography variant={'h6'}>{data?.character.name}</Typography>
            <Typography variant={'body1'}>{data?.character.type}</Typography>
            <Typography variant={'body1'}>{data?.character.gender}</Typography>
            <Typography variant={'body1'}>{data?.character.species}</Typography>
            <Divider sx={{ mt: 3 }} />
            <Box sx={{ py: 3 }}>
              <Button variant={'contained'} color={'primary'} onClick={() => refetch()}>
                Refetch
              </Button>
              <Button sx={{ ml: 2 }} variant={'contained'} color={'error'} onClick={() => remove()}>
                Remove
              </Button>
            </Box>
            <Divider sx={{ mb: 3 }} />
            <Stack spacing={2} direction="row" alignItems="center">
              <Typography>{avatarSize}</Typography>
              <Slider max={500} min={100} value={avatarSize} onChange={(_, size) => setAvatarSize(size as number)} />
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};
