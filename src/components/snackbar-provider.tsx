import * as React from 'react';
import { SnackbarKey, SnackbarProvider as NotistackProvider } from 'notistack';
import { NextComponentType } from 'next';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const SnackbarProvider: NextComponentType = ({ children }) => {
	const notistackRef = React.createRef<NotistackProvider>();

	const handleDismiss = (key: SnackbarKey) => () => {
		if (notistackRef.current) {
			notistackRef.current.closeSnackbar(key);
		}
	};

	return (
		<NotistackProvider
			maxSnack={3}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'center',
			}}
			preventDuplicate
			ref={notistackRef}
			action={(key) => (
				<IconButton onClick={handleDismiss(key)}>
					<CloseIcon />
				</IconButton>
			)}
		>
			{children}
		</NotistackProvider>
	);
};
