import React from 'react';
import styled from 'styled-components';

const StyledLoading = styled('div')`
  display: flex !important;
  flex-direction: row !important;
  margin-top: 20% !important;
  justify-content: center !important;
  z-index: 1050 !important; ;
`;




export default function LoadingDataAnimation(): JSX.Element {
  return (
    <StyledLoading>
      <div className='spinner-grow text-primary' role='status'>
        <span className='sr-only'></span>
      </div>
      <div className='spinner-grow text-secondary' role='status'>
        <span className='sr-only'></span>
      </div>
      <div className='spinner-grow text-success' role='status'>
        <span className='sr-only'></span>
      </div>
      <div className='spinner-grow text-danger' role='status'>
        <span className='sr-only'></span>
      </div>
      <div className='spinner-grow text-warning' role='status'>
        <span className='sr-only'></span>
      </div>
      <div className='spinner-grow text-info' role='status'>
        <span className='sr-only'></span>
      </div>
      <div className='spinner-grow text-light' role='status'>
        <span className='sr-only'></span>
      </div>
      <div className='spinner-grow text-dark' role='status'>
        <span className='sr-only'></span>
      </div>
    </StyledLoading>
  );
}
