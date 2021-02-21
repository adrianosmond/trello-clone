import { FC } from 'react';
import styled from 'styled-components';
import { useAppContext } from 'contexts/AppContext';
import useKeyListener from 'hooks/useKeyListener';
import Column from 'components/Column';

const ColumnGrid: FC = () => {
  const { columns, seenKeyboardHint, selected } = useAppContext();
  useKeyListener();

  if (columns.length === 0) {
    return null;
  }

  return (
    <>
      <Grid>
        {columns.map((column) => (
          <li key={column.id}>
            <Column {...column} />
          </li>
        ))}
        {!seenKeyboardHint && (
          <Hint selected={!!selected}>
            <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
            </Icon>
            <span>Use the arrow keys to move a selected item</span>
          </Hint>
        )}
      </Grid>
    </>
  );
};

const Grid = styled.ul`
  display: flex;
  padding: 1rem;
  overflow-x: auto;
  max-width: 100%;
  & > * + * {
    margin-left: 1rem;
  }
`;

interface IHint {
  selected: boolean;
}

const Hint = styled.p<IHint>`
  position: fixed;
  display: flex;
  top: 0;
  left: 50%;
  margin: 0;
  padding: 0.5rem 1rem;
  transform: translateX(-50%) translateY(-100%);
  transition: transform 0.2s;
  background-color: #333;
  color: #f5f5f5;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  font-size: 0.75rem;
  min-width: 12rem;

  ${({ selected }) => selected && `transform: translateX(-50%) translateY(0);`};
  & > * + * {
    margin-left: 0.5rem;
  }
`;

const Icon = styled.svg`
  width: 1rem;
  height: 1rem;
  fill: currentColor;
`;

export default ColumnGrid;
