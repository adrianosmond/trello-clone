import { FC, ReactNode } from 'react';
import styled from 'styled-components';

const Card: FC<{
  heading: ReactNode;
  actions: ReactNode;
}> = ({ heading, actions, children }) => (
  <Wrapper>
    <Header>
      {heading}
      <CardActions>{actions}</CardActions>
    </Header>
    {children}
  </Wrapper>
);

const Wrapper = styled.div`
  padding: 0.5rem;
  border-radius: 0.25rem;
  box-shadow: 0 0 0.25rem rgba(0, 0, 0, 0.1);
  background-color: #fff;

  & > * + * {
    margin-top: 0.5rem;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
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
