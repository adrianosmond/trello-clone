import styled from 'styled-components';
import { AppContext } from 'contexts/AppContext';
import useColumnState from 'hooks/useColumnState';
import ColumnGrid from 'components/ColumnGrid';
import NewColumnForm from 'components/NewColumnForm';

const App = () => {
  const state = useColumnState();

  return (
    <AppContext.Provider value={state}>
      <Wrapper>
        <Title>Trello clone</Title>
        <ColumnGrid />
        <NewColumnForm />
      </Wrapper>
    </AppContext.Provider>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  & > * + * {
    margin-top: 2rem;
  }
`;

const Title = styled.h1`
  text-align: center;
  font-weight: 600;
  font-size: 2rem;
`;

export default App;
