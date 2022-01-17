import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import * as React from 'react';

export default function LoadingErrorAnimation() {
  return (
    <div className='d-flex align-items-center justify-content-center' style={{ padding: '20%' }}>
      <Alert variant='filled' severity='error'>
        Error loading data
      </Alert>

     
    </div>
  );
}
