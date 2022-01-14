import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import * as React from 'react';

export interface State extends SnackbarOrigin {
  open: boolean;
}

export default function LoadingErrorAnimation() {
  const [state, setState] = React.useState<State>({
    open: true,
    vertical: 'bottom',
    horizontal: 'right',
  });
  const { vertical, horizontal, open } = state;

  const handleClick = (newState: SnackbarOrigin) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ padding: '20%' }}
    >
      <Alert variant="filled" severity="error">
        Error loading data
      </Alert>

      {/* <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message='Error loading data'
        key={vertical + horizontal}
      /> */}
    </div>
  );
}
