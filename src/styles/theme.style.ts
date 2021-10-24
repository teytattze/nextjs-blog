import { createTheme } from '@mui/material';
import breakpoints from './breakpoints.style';
import palette from './palette.style';
import typography from './typography.style';

export const theme = createTheme({
	breakpoints: { ...breakpoints },
	palette: { ...palette },
	typography: { ...typography },
});
