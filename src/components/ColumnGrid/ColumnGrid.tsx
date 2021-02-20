import { FC } from 'react';
import styled from 'styled-components';
import { useAppContext } from 'contexts/AppContext';
import Column from 'components/Column';

const ColumnGrid: FC = () => {
  const { columns } = useAppContext();

  if (columns.length === 0) {
    return null;
  }

  return (
    <Grid>
      {columns.map((column) => (
        <li key={column.id}>
          <Column {...column} />
        </li>
      ))}
    </Grid>
  );
};

const Grid = styled.ul`
  display: flex;
  padding: 0.25rem;
  overflow-x: auto;
  max-width: 100%;
  & > * + * {
    margin-left: 1rem;
  }
`;

export default ColumnGrid;
