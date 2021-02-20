import { useAppContext } from 'contexts/AppContext';
import { useCallback } from 'react';
import { findColumn } from './useColumnState';

export default (id: string) => {
  const { columns, removeColumn, editColumn, renameColumn } = useAppContext();
  const { column } = findColumn(columns, id);

  const remove = useCallback(() => removeColumn(column.id), [
    column.id,
    removeColumn,
  ]);

  const edit = useCallback(
    (event) => {
      event.stopPropagation();
      // Only count clicks on the actual element, not its children
      if (event.target === event.currentTarget) {
        editColumn(column.id);
      }
    },
    [column.id, editColumn],
  );

  const rename = useCallback((name) => renameColumn(column.id, name), [
    column.id,
    renameColumn,
  ]);

  return {
    column,
    remove,
    edit,
    rename,
  };
};
