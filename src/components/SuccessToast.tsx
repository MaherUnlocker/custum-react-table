import React from 'react';

import { toast } from 'react-toastify';

import { CheckboxIcon } from './assets/CheckboxIcon';

import './Style.css';
export default function SuccessToast(message: string): React.ReactElement {
  return (
    <React.Fragment>
      {toast.success(message, {
        className: 'success-toast',
        position: toast.POSITION.TOP_CENTER,
        autoClose: 10000,
        theme: 'colored',
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        icon: <CheckboxIcon height={25} width={25} fill="white" />,
      })}
    </React.Fragment>
  );
}
