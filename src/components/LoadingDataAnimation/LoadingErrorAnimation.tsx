import Alert from '@mui/material/Alert';
import React from 'react';

export default function LoadingErrorAnimation(): React.ReactElement {
  return (
    <div className='d-flex align-items-center justify-content-center' style={{ padding: '20%' }}>
      <Alert variant='filled' severity='error'>
        Error chargement de donnees
      </Alert>
    </div>
  );
}
