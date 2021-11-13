import { createTheme } from '@mui/material';
import breakpoints from './breakpoints.style';
import palette from './palette.style';
import typography from './typography.style';

const theme = createTheme({
  breakpoints: { ...breakpoints },
  palette: { ...palette },
  typography: { ...typography },
});

theme.shadows[1] = '0 0 0 1px rgba(0, 0, 0, 0.05)';
theme.shadows[2] = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
theme.shadows[3] =
  '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)';
theme.shadows[4] =
  '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
theme.shadows[5] =
  '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
theme.shadows[6] =
  '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
theme.shadows[7] = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';

export { theme };
