import { ReactElement } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../src/utils/theme';
import createEmotionCache from '../src/utils/createEmotionCache';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider, Hydrate } from 'react-query';
import '../styles/globals.css';
import dayjs from 'dayjs';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

import 'dayjs/locale/ko';
import useAppToWebMessage from '@/hooks/useAppToWebMessage';
import SnackBarAlert from '@/components/common/SnackBarAlert';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
const queryClient = new QueryClient();
dayjs.locale('ko');

interface NarrangoAppProps extends AppProps<{ dehydratedState: unknown }> {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
  session: Session;
}

export default function NarrangoApp(props: NarrangoAppProps) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
    session
  } = props;
  
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);

  useAppToWebMessage<'string'>('UUID');

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <SessionProvider session={session}>
          <CacheProvider value={emotionCache}>
            <Head>
              <meta
                name="viewport"
                content="initial-scale=1, width=device-width"
              />
              <title>Create Next App</title>
              <meta name="description" content="Generated by create next app" />
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <ThemeProvider theme={theme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <SnackBarAlert />
              {getLayout(<Component {...pageProps} />)}
            </ThemeProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </CacheProvider>
        </SessionProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}