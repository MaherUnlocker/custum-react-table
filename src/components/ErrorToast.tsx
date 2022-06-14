import React from 'react';
import { toast } from 'react-toastify';

export default function ErrorToast(message: string): JSX.Element {
  return (
    <React.Fragment>
      {toast.error(message, {
        className: 'error-toast',
        position: toast.POSITION.TOP_CENTER,
        autoClose: 10000,
        theme: 'colored',
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })}
    </React.Fragment>
  );
}
