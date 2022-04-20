import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import styled from 'styled-components';

export type StyledH2PropsType = {
  children: React.ReactNode;
};

export const StyledH2 = styled.h2<StyledH2PropsType>`
  font-family: 'Segoe UI Semibold';
  color: #2b2828;
  font-size: 20px;
`;
