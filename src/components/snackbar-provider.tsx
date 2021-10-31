import * as React from 'react';
import { SnackbarKey, SnackbarProvider as NotistackProvider } from 'notistack';
import { NextComponentType } from 'next';

export const SnackbarProvider: NextComponentType = ({ children }) => {
	const notistackRef = React.createRef<NotistackProvider>();

	return (
		<NotistackProvider
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'center',
			}}
			autoHideDuration={3000}
			disableWindowBlurListener
			maxSnack={3}
			preventDuplicate
			ref={notistackRef}
		>
			{children}
		</NotistackProvider>
	);
};
