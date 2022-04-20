import 'bootstrap/dist/css/bootstrap.min.css';

import Select from 'react-select';
import styled from 'styled-components';

export type StyledSelectInputPropsType = {
  placeholder: string;
  name: string;
} & typeof Select;

export const StyledSelectInput = styled(Select)<typeof Select>`
  font-family: 'Segoe UI';
  font-size: 16px;
  border-radius: 6px;
`;
