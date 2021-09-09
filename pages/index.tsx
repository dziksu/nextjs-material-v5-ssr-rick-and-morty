import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { Header } from '../modules/layout';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { getCharacters, CharactersList } from '../modules/characters';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <meta name="description" content="Rick and Morty APP" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <CharactersList />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['characters', 1, ''], getCharacters(1, ''));
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Home;
