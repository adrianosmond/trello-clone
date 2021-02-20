import { useAppContext } from 'contexts/AppContext';
import { useCallback } from 'react';
import { findItem } from './useColumnState';

export default (id: string) => {
  const { columns, removeItem } = useAppContext();
  const { item } = findItem(columns, id);

  const remove = useCallback(() => removeItem(item.id), [item.id, removeItem]);

  return { item, remove };
};
