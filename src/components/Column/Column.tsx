import { FC, useRef } from 'react';
import styled, { css } from 'styled-components';
import { useAppContext } from 'contexts/AppContext';
import { IColumn } from 'hooks/useColumnState';
import useColumn from 'hooks/useColumn';
import useOutsideClick from 'hooks/useOutsideClick';
import Card from 'components/Card';
import DeleteButton from 'components/DeleteButton';
import EditableHeader from 'components/EditableHeader';
import Item from 'components/Item';
import NewItemForm from 'components/NewItemForm';

const Column: FC<IColumn> = ({ id, name, items }) => {
  const { editing, stopEditing } = useAppContext();
  const { remove, edit, rename } = useColumn(id);
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
      heading={
        <EditableHeader
          heading={name}
          onChange={(event) => rename(event.target.value)}
        />
      }
      actions={<DeleteButton onClick={remove} />}
    >
      <ItemList empty={items.length === 0}>
        {items.length === 0 && <EmptyState>Nothing to see here...</EmptyState>}
        {items.map((item) => (
          <li key={item.id}>
            <Item {...item} />
          </li>
        ))}
      </ItemList>
      <NewItemForm columnId={id} />
    </Wrapper>
  );
};

const Wrapper = styled(Card)`
  width: 18rem;
  padding-bottom: 1rem;
`;

const emptyStyles = css`
  pointer-events: none;
`;

interface IItemListProps {
  empty?: boolean;
}

const ItemList = styled.ul<IItemListProps>`
  background-color: #ccc;
  border-radius: 0.25rem;
  padding: 0.5rem;
  box-shadow: inset 0 0 0.25rem rgba(0, 0, 0, 0.1);
  & > * + * {
    margin-top: 0.5rem;
  }
  ${({ empty }) => empty && emptyStyles}
`;

const EmptyState = styled.div`
  color: #666;
  text-align: center;
`;

export default Column;
