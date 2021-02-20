import { useAppContext } from 'contexts/AppContext';
import { useCallback } from 'react';
import { findItem } from './useColumnState';

export default (id: string) => {
  const { columns, removeItem, editItem } = useAppContext();
  const { item } = findItem(columns, id);

  const remove = useCallback(() => removeItem(item.id), [item.id, removeItem]);

  const edit = useCallback(
    (event) => {
      event.stopPropagation();
      // Only count clicks on the actual element, not its children
      if (event.target === event.currentTarget) {
        editItem(id);
      }
    },
    [editItem, id],
  );

  return { item, remove, edit };
};
