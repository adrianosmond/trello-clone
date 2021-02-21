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
  seenKeyboardHint: boolean;
  dismissKeyboardHint: () => void;
}

const STORAGE_KEY = 'SEEN_ARROW_HINT';

const useEditingState = (): ISelectedState => {
  const [selected, setSelected] = useState<SelectedState | null>(null);
  const [seenKeyboardHint, setSeenKeyboardHint] = useState(
    !!localStorage.getItem(STORAGE_KEY),
  );

  const selectColumn = useCallback((columnId: string): void => {
    setSelected({ type: SelectedTypes.COLUMN, id: columnId });
  }, []);

  const selectItem = useCallback((itemId: string): void => {
    setSelected({ type: SelectedTypes.ITEM, id: itemId });
  }, []);

  const deselect = useCallback(() => {
    setSelected(null);
  }, []);

  const dismissKeyboardHint = useCallback(() => {
    setSeenKeyboardHint(true);
    localStorage.setItem(STORAGE_KEY, 'true');
  }, []);

  return {
    selected,
    selectColumn,
    selectItem,
    deselect,
    seenKeyboardHint,
    dismissKeyboardHint,
  };
};

export default useEditingState;
