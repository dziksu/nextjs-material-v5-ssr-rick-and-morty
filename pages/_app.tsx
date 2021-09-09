import React, { useState } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { getTheme } from '../utils/theme';
import { createEmotionCache } from '../utils/create-emotion-cache';
import { SettingsContext, SettingsProvider } from '../modules/settings/settings.provider';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import { ReactQueryDevtools } from 'react-query/devtools';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <CacheProvider value={emotionCache}>
          <SettingsProvider>
            <Head>
              <title>Rick & Morty</title>
              <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <SettingsContext.Consumer>
              {({ darkMode }) => (
                <ThemeProvider theme={getTheme(darkMode.value)}>
                  <CssBaseline />
                  <Component {...pageProps} />
                </ThemeProvider>
              )}
            </SettingsContext.Consumer>
          </SettingsProvider>
        </CacheProvider>
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
