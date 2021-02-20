import { useCallback, useState } from 'react';

export enum EditingTypes {
  COLUMN,
  ITEM,
}

export type EditingState = {
  type: EditingTypes;
  id: string;
};

export interface IEditingState {
  editing: EditingState | null;
  editColumn: (columnId: string) => void;
  editItem: (itemId: string) => void;
  stopEditing: () => void;
}

const useEditingState = (): IEditingState => {
  const [editing, setEditing] = useState<EditingState | null>(null);

  const editColumn = useCallback((columnId: string): void => {
    setEditing({ type: EditingTypes.COLUMN, id: columnId });
  }, []);

  const editItem = useCallback((itemId: string): void => {
    setEditing({ type: EditingTypes.ITEM, id: itemId });
  }, []);

  const stopEditing = useCallback((): void => {
    setEditing(null);
  }, []);

  return {
    editing,
    editColumn,
    editItem,
    stopEditing,
  };
};

export default useEditingState;
