import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import styled from 'styled-components';

export type StyledLabelPropsType = {
  children: React.ReactNode;
};

export const StyledLabel = styled.label<StyledLabelPropsType>`
  font-family: 'Segoe UI Semibold';
  color: #2b2828;
  font-size: 16px;
`;
