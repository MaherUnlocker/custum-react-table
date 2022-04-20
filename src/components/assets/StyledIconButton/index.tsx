import 'bootstrap/dist/css/bootstrap.min.css';

import { StyledButton, StyledButtonPropsType } from '../StyledButton';

import styled from 'styled-components';

export type StyledIconButtonPropsType = {
  icon: string;
} & StyledButtonPropsType;

export const StyledIconButton = styled(StyledButton)<StyledIconButtonPropsType>`
  border: unset;
  background: transparent;
  color: #2b2828;
  &:hover {
    background: #ffffff;
    color: #2b2828;
    border-radius: 6px;
    border: solid 1px #caccd4;
  }
  padding: 10px;
  margin: 10px;
  min-width: 45px;
  min-height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: unset;
`;
