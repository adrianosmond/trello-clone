import { useAppContext } from 'contexts/AppContext';
import { useCallback } from 'react';
import { findColumn } from './useColumnState';

export default (id: string) => {
  const { columns, removeColumn } = useAppContext();
  const { column } = findColumn(columns, id);

  const remove = useCallback(() => removeColumn(column.id), [
    column.id,
    removeColumn,
  ]);

  return {
    column,
    remove,
  };
};
