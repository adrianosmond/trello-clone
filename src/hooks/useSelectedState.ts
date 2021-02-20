import { useCallback, useState } from 'react';

export enum SelectedTypes {
  COLUMN,
  ITEM,
}

export type SelectedState = {
  type: SelectedTypes;
  id: string;
};

export interface ISelectedState {
  selected: SelectedState | null;
  selectColumn: (columnId: string) => void;
  selectItem: (itemId: string) => void;
  deselect: () => void;
}

const useEditingState = (): ISelectedState => {
  const [selected, setSelected] = useState<SelectedState | null>(null);

  const selectColumn = useCallback((columnId: string): void => {
    setSelected({ type: SelectedTypes.COLUMN, id: columnId });
  }, []);

  const selectItem = useCallback((itemId: string): void => {
    setSelected({ type: SelectedTypes.ITEM, id: itemId });
  }, []);

  const deselect = useCallback((): void => {
    setSelected(null);
  }, []);

  return {
    selected,
    selectColumn,
    selectItem,
    deselect,
  };
};

export default useEditingState;
