import { useAppContext } from 'contexts/AppContext';
import { useCallback } from 'react';
import { findItem } from './useColumnState';

export default (id: string) => {
  const { columns, removeItem, editItem, renameItem } = useAppContext();
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

  const rename = useCallback((name) => renameItem(item.id, name), [
    item.id,
    renameItem,
  ]);

  return { item, remove, edit, rename };
};
