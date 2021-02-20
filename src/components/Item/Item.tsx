import { FC, useRef } from 'react';
import { useAppContext } from 'contexts/AppContext';
import { IItem } from 'hooks/useColumnState';
import useItem from 'hooks/useItem';
import useOutsideClick from 'hooks/useOutsideClick';
import Card from 'components/Card';
import DeleteButton from 'components/DeleteButton';

const Item: FC<IItem> = ({ id, name }) => {
  const { editing, stopEditing } = useAppContext();
  const { remove, edit } = useItem(id);
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, () => {
    // Only stop editing if we're currently editing THIS item
    if (editing?.id === id) {
      stopEditing();
    }
  });

  return (
    <Card
      ref={ref}
      onClick={edit}
      selected={editing?.id === id}
      heading={name}
      actions={<DeleteButton onClick={remove} />}
    />
  );
};

export default Item;
