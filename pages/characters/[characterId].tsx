import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { Header } from '../../modules/layout';
import { getCharacter } from '../../modules/characters/hooks/use-character.query';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { CharacterPage } from '../../modules/characters';

type Props = {
  characterId: number;
};

const Character: NextPage<Props> = (props) => {
  return (
    <div>
      <Head>
        <meta name="description" content="Rick and Morty APP" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <CharacterPage characterId={props.characterId} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();

  const characterId = Number(context.query.characterId);

  await queryClient.prefetchQuery(['character', characterId], getCharacter(characterId));

  return {
    props: {
      characterId: characterId,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Character;
