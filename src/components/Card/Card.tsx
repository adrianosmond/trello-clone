import { HTMLAttributes, ReactNode, forwardRef } from 'react';
import styled, { css } from 'styled-components';

interface Props extends HTMLAttributes<HTMLDivElement> {
  heading: ReactNode;
  actions: ReactNode;
  selected?: boolean;
}

const Card = forwardRef<HTMLDivElement, Props>(
  ({ heading, actions, selected, children, ...props }, ref) => (
    <Wrapper selected={selected} {...props} ref={ref}>
      <Header>
        {heading}
        <CardActions>{actions}</CardActions>
      </Header>
      {children}
    </Wrapper>
  ),
);

interface ISelectable {
  selected?: boolean;
}

const selectedCardStyles = css`
  background-color: #333;
  color: #f5f5f5;
  outline: none;
  box-shadow: 0 0 0.25rem rgba(0, 0, 0, 0.5);
`;

const Wrapper = styled.div<ISelectable>`
  padding: 0.5rem;
  border-radius: 0.25rem;
  box-shadow: 0 0 0.25rem rgba(0, 0, 0, 0.1);
  background-color: #fff;
  color: #333;
  cursor: pointer;

  & > * + * {
    margin-top: 0.5rem;
  }

  ${({ selected }) => selected && selectedCardStyles}
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  pointer-events: none;
  & > * {
    pointer-events: all;
  }
  & > * + * {
    margin-left: 0.5rem;
  }
`;

const CardActions = styled.div`
  display: flex;
  align-items: flex-start;
  & > * + * {
    margin-left: 0.25rem;
  }
`;

export default Card;
