import { ButtonProps } from 'reactstrap';
import React from 'react';
import styled from 'styled-components';

type Variant =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'reminder'
  | 'success'
  | 'info'
  | 'warning'
  | 'light'
  | 'link';

export type StyledButtonPropsType = {
  variant: Variant;
  children: React.ReactNode;
  rounded?: boolean;
  outline?: boolean;
  disabled?: boolean;
  block?: boolean;
} & ButtonProps;

export const StyledButton = styled.button<StyledButtonPropsType>`
  background: ${({ outline, variant }: StyledButtonPropsType) =>
    outline
      ? 'transparent'
      : variant === 'primary'
      ? '#323333'
      : variant === 'secondary'
      ? '#626368'
      : variant === 'danger'
      ? '#E30613'
      : variant === 'reminder'
      ? '#AE0F0A'
      : variant === 'success'
      ? '#34C38F'
      : variant === 'info'
      ? '#0077D7'
      : variant === 'warning'
      ? '#F1B44C'
      : variant === 'light'
      ? '#f8f9fa'
      : variant === 'link'
      ? 'transparent'
      : '#F8F8FB'};

  color: ${({ variant, outline }: StyledButtonPropsType) =>
    outline
      ? variant === 'primary'
        ? '#323333'
        : variant === 'secondary'
        ? '#626368'
        : variant === 'danger'
        ? '#E30613'
        : variant === 'reminder'
        ? '#AE0F0A'
        : variant === 'success'
        ? '#34C38F'
        : variant === 'info'
        ? '#0077D7'
        : variant === 'warning'
        ? '#F1B44C'
        : variant === 'light'
        ? '#000'
        : variant === 'link'
        ? '#007bff'
        : '#F8F8FB'
      : variant === 'light'
      ? '#000'
      : variant === 'link'
      ? '#007bff'
      : '#fff'};

  border: ${({ variant, outline }: StyledButtonPropsType) =>
    outline ? '1px solid' : variant !== 'light' ? 'none' : '1px solid'};

  border-color: ${({ variant }: StyledButtonPropsType) =>
    variant === 'primary'
      ? '#323333'
      : variant === 'secondary'
      ? '#626368'
      : variant === 'danger'
      ? '#E30613'
      : variant === 'reminder'
      ? '#AE0F0A'
      : variant === 'success'
      ? '#34C38F'
      : variant === 'info'
      ? '#0077D7'
      : variant === 'warning'
      ? '#F1B44C'
      : variant === 'light'
      ? '#C6C6C6'
      : variant === 'link'
      ? 'transparent'
      : '#F8F8FB'};

  ${({ rounded }: StyledButtonPropsType) =>
    rounded ? `border-radius: 6px;` : `border-radius: 0;`}

  ${({ block }: StyledButtonPropsType) =>
    block ? `display: block; width:100%;` : ` display: flex; min-width: 150px;`}

    ${({ disabled }: StyledButtonPropsType) =>
    disabled === true
      ? `opacity: 0.5;pointer-events: none;user-select: none;`
      : ``}

    justify-content: center;
  align-items: center;
  min-height: 45px;
  font-weight: 400;
  line-height: 1.5;
  text-align: center;
  text-decoration: none;
  padding: 12px 10px;
  font-size: 16px;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:hover {
    opacity: ${({ disabled }: StyledButtonPropsType) =>
      disabled === true ? `0.5` : `0.85`};
    background: ${({ variant }: StyledButtonPropsType) =>
      variant === 'primary'
        ? '#323333'
        : variant === 'secondary'
        ? '#626368'
        : variant === 'danger'
        ? '#E30613'
        : variant === 'reminder'
        ? '#AE0F0A'
        : variant === 'success'
        ? '#34C38F'
        : variant === 'info'
        ? '#0077D7'
        : variant === 'warning'
        ? '#F1B44C'
        : variant === 'light'
        ? '#f9fafb'
        : variant === 'link'
        ? 'transparent'
        : '#F8F8FB'};
    color: ${({ variant, outline }: StyledButtonPropsType) =>
      outline
        ? ['primary', 'secondary', 'danger', 'reminder', 'success'].includes(
            variant
          )
          ? '#fff;'
          : ['info', 'warning'].includes(variant)
          ? '#000'
          : variant === 'light'
          ? '#2B2828'
          : variant === 'link'
          ? '#0056b3'
          : '#F8F8FB'
        : variant === 'light'
        ? '#2B2828'
        : variant === 'link'
        ? '#0056b3'
        : '#fff'};
    border-color: ${({ variant }: StyledButtonPropsType) =>
      variant === 'primary'
        ? '#323333'
        : variant === 'secondary'
        ? '#626368'
        : variant === 'danger'
        ? '#E30613'
        : variant === 'reminder'
        ? '#AE0F0A'
        : variant === 'success'
        ? '#34C38F'
        : variant === 'info'
        ? '#0077D7'
        : variant === 'warning'
        ? '#F1B44C'
        : variant === 'light'
        ? '#C6C6C6'
        : '#F8F8FB'};

    text-decoration: ${({ variant }: StyledButtonPropsType) =>
      variant === 'link' ? `underline` : ``};
  }
`;
