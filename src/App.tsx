import styled from 'styled-components';
import { AppContext } from 'contexts/AppContext';
import useColumnState from 'hooks/useColumnState';
import NewColumnForm from 'components/NewColumnForm';
import NewItemForm from 'components/NewItemForm';

const App = () => {
  const state = useColumnState();

  return (
    <AppContext.Provider value={state}>
      <Wrapper>
        <Title>Trello clone</Title>
        <Grid>
          {state.columns.map((col) => (
            <li>
              <Column key={col.id}>
                <h2>{col.name}</h2>
                {col.items.length > 0 && (
                  <ItemList>
                    {col.items.map((item) => (
                      <Card key={item.id}>{item.name}</Card>
                    ))}
                  </ItemList>
                )}
                <NewItemForm columnId={col.id} />
              </Column>
            </li>
          ))}
        </Grid>
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

const Grid = styled.ul`
  display: flex;
  padding: 0.25rem;
  overflow-x: auto;
  max-width: 100%;
  & > * + * {
    margin-left: 1rem;
  }
`;

const Card = styled.div`
  padding: 0.5rem;
  border-radius: 0.25rem;
  box-shadow: 0 0 0.25rem rgba(0, 0, 0, 0.1);
  background-color: #fff;

  & > * + * {
    margin-top: 0.5rem;
  }
`;

const Column = styled(Card)`
  width: 18rem;
  flex-shrink: 0;
`;

const ItemList = styled.ul`
  background-color: #ccc;
  border-radius: 0.25rem;
  padding: 0.5rem;
  & > * + * {
    margin-top: 0.5rem;
  }
`;

export default App;
