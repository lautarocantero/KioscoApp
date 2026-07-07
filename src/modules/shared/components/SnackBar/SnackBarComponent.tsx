import Snackbar from '@mui/material/Snackbar';
import { useContext } from 'react';
import { SnackBarContext } from './SnackBarContext';
import { Alert } from '@mui/material';
import type { SnackBarState } from '@typings/ui/snackbar.types';

const SimpleSnackbar = (): React.ReactNode => {
  {/*─────────────────── 🔎 non‑null assertion operator '!' 🔎 ───────────────────*/}
  {/*─────────────────── por si el contexto es undefined en algun momento ───────────────────*/}
  const { snackBar, closeSnackBar }: { snackBar: SnackBarState, closeSnackBar: () => void } = useContext(SnackBarContext)!;

  return ( 
    <Snackbar 
      open={snackBar.open} 
      autoHideDuration={6000} 
      onClose={closeSnackBar} > 
        <Alert 
          onClose={closeSnackBar} 
          severity={snackBar.color} 
          sx={{ 
            width: '100%' 
          }}> 
            {snackBar.message} 
        </Alert> 
    </Snackbar> );
}

export default SimpleSnackbar;
