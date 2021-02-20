import { FC, useRef } from 'react';
import styled from 'styled-components';
import { useAppContext } from 'contexts/AppContext';
import { IColumn } from 'hooks/useColumnState';
import useColumn from 'hooks/useColumn';
import useOutsideClick from 'hooks/useOutsideClick';
import Card from 'components/Card';
import DeleteButton from 'components/DeleteButton';
import Item from 'components/Item';
import NewItemForm from 'components/NewItemForm';

const Column: FC<IColumn> = ({ id, name, items }) => {
  const { editing, stopEditing } = useAppContext();
  const { remove, edit } = useColumn(id);
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, () => {
    // Only stop editing if we're currently editing THIS column
    if (editing?.id === id) {
      stopEditing();
    }
  });

  return (
    <Wrapper
      ref={ref}
      onClick={edit}
      selected={editing?.id === id}
      heading={name}
      actions={<DeleteButton onClick={remove} />}
    >
      {items.length > 0 && (
        <ItemList>
          {items.map((item) => (
            <li key={item.id}>
              <Item {...item} />
            </li>
          ))}
        </ItemList>
      )}
      <NewItemForm columnId={id} />
    </Wrapper>
  );
};

const Wrapper = styled(Card)`
  width: 18rem;
  padding-bottom: 1rem;
`;

const ItemList = styled.ul`
  background-color: #ccc;
  border-radius: 0.25rem;
  padding: 0.5rem;
  & > * + * {
    margin-top: 0.5rem;
  }
`;

export default Column;
