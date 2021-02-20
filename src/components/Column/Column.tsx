import { FC } from 'react';
import styled from 'styled-components';
import { IColumn } from 'hooks/useColumnState';
import useColumn from 'hooks/useColumn';
import Card from 'components/Card';
import DeleteButton from 'components/DeleteButton';
import Item from 'components/Item';
import NewItemForm from 'components/NewItemForm';

const Column: FC<IColumn> = ({ id, name, items }) => {
  const { remove } = useColumn(id);

  return (
    <Wrapper heading={name} actions={<DeleteButton onClick={remove} />}>
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
