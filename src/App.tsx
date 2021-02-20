import styled from 'styled-components';
import { AppContext } from 'contexts/AppContext';
import useColumnState from 'hooks/useColumnState';
import useEditingState from 'hooks/useEditingState';
import ColumnGrid from 'components/ColumnGrid';
import NewColumnForm from 'components/NewColumnForm';

const App = () => {
  const columnState = useColumnState();
  const editingState = useEditingState();

  return (
    <AppContext.Provider
      value={{
        ...columnState,
        ...editingState,
      }}
    >
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
