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
import { DefaultLayout } from '../layouts/default';
import { SnackbarProvider } from 'notistack';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp({
	Component,
	emotionCache = clientSideEmotionCache,
	pageProps,
}: AppProps & { emotionCache: EmotionCache }) {
	return (
		<CacheProvider value={emotionCache}>
			<Head>
				<title>My Blog</title>
				<meta name="viewport" content="initial-scale=1, width=device-width" />
			</Head>
			<ThemeProvider theme={theme}>
				{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
				<CssBaseline />
				<SnackbarProvider
					maxSnack={3}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'center',
					}}
				>
					<AuthProvider>
						<DefaultLayout>
							<Component {...pageProps} />
						</DefaultLayout>
					</AuthProvider>
				</SnackbarProvider>
			</ThemeProvider>
		</CacheProvider>
	);
}
