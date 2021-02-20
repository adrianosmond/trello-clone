import { useAppContext } from 'contexts/AppContext';
import { useCallback } from 'react';
import { findColumn } from './useColumnState';

export default (id: string) => {
  const { columns, removeColumn, selectColumn, renameColumn } = useAppContext();
  const { column } = findColumn(columns, id);

  const remove = useCallback(() => removeColumn(column.id), [
    column.id,
    removeColumn,
  ]);

  const select = useCallback(
    (event) => {
      event.stopPropagation();
      // Only count clicks on the actual element, not its children
      if (event.target === event.currentTarget) {
        selectColumn(column.id);
      }
    },
    [column.id, selectColumn],
  );

  const rename = useCallback((name) => renameColumn(column.id, name), [
    column.id,
    renameColumn,
  ]);

  return {
    column,
    remove,
    select,
    rename,
  };
};
