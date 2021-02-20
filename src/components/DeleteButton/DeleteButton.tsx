import { ButtonHTMLAttributes, FC } from 'react';
import styled from 'styled-components';
import Button, { ButtonVariants } from 'components/Button';

const IconButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  onClick,
}) => (
  <Button onClick={onClick} variant={ButtonVariants.ICON}>
    <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </Icon>
  </Button>
);

const Icon = styled.svg`
  width: 1rem;
  height: 1rem;
  fill: currentColor;
`;

export default IconButton;
