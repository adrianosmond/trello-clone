import { FC, useRef } from 'react';
import { useAppContext } from 'contexts/AppContext';
import { IItem } from 'hooks/useColumnState';
import useItem from 'hooks/useItem';
import useOutsideClick from 'hooks/useOutsideClick';
import Card from 'components/Card';
import DeleteButton from 'components/DeleteButton';
import EditableHeader from 'components/EditableHeader';

const Item: FC<IItem> = ({ id, name }) => {
  const { selected, deselect } = useAppContext();
  const { remove, select, rename } = useItem(id);
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, () => {
    // Only deselect if we've currently selected THIS item
    if (selected?.id === id) {
      deselect();
    }
  });

  return (
    <Card
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
    />
  );
};

export default Item;
