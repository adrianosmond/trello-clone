import { FC, useCallback } from 'react';
import { useAppContext } from 'contexts/AppContext';
import Adder from 'components/Adder';

const NewItemForm: FC<{
  columnId: string;
}> = ({ columnId }) => {
  const { addItem } = useAppContext();
  const addItemToColumn = useCallback(
    (name: string) => {
      addItem(columnId, name);
    },
    [addItem, columnId],
  );

  return <Adder label="Add item" onAdd={addItemToColumn} />;
};

export default NewItemForm;
