import * as React from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import { EmotionCache } from '@emotion/utils';
import { theme } from '../styles/theme.style';
import { createEmotionCache } from '../lib/emotion-cache';
import { AppProps } from 'next/app';
import { AuthProvider } from '../modules/auth/auth.context';
import { DefaultLayout } from '../layouts/default-layout';
import { SnackbarProvider } from '../components/snackbar-provider';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp({
	Component,
	emotionCache = clientSideEmotionCache,
	pageProps,
}: AppProps & { emotionCache: EmotionCache }) {
	const [queryClient] = React.useState(() => new QueryClient());

	return (
		<CacheProvider value={emotionCache}>
			<Head>
				<title>My Blog</title>
				<meta name="viewport" content="initial-scale=1, width=device-width" />
			</Head>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<QueryClientProvider client={queryClient}>
					<Hydrate state={pageProps.dehydratedState}>
						<SnackbarProvider>
							<AuthProvider>
								<DefaultLayout>
									<Component {...pageProps} />
								</DefaultLayout>
							</AuthProvider>
						</SnackbarProvider>
						<ReactQueryDevtools initialIsOpen={false} />
					</Hydrate>
				</QueryClientProvider>
			</ThemeProvider>
		</CacheProvider>
	);
}
