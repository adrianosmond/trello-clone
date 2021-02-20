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
  const { selected, deselect } = useAppContext();
  const { remove, select, rename } = useColumn(id);
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, () => {
    // Only deselect if we've currently selected THIS column
    if (selected?.id === id) {
      deselect();
    }
  });

  return (
    <Wrapper
      ref={ref}
      onClick={select}
      selected={selected?.id === id}
      heading={
        <EditableHeader
          heading={name}
          onChange={(event) => rename(event.target.value)}
          deselect={deselect}
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
