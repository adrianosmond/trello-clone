import styled from 'styled-components';

export enum ButtonVariants {
  DEFAULT,
  ICON,
}

interface IButton {
  variant?: ButtonVariants;
}

const Button = styled.button<IButton>`
  padding: ${({ variant }) =>
    variant === ButtonVariants.ICON ? `0.25rem;` : '0.25rem 0.5rem'};
  background-color: #ddd;
  color: #333;
  border-radius: 0.25rem;
`;

export default Button;
