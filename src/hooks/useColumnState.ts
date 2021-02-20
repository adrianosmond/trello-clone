import { useCallback } from 'react';
import { Draft } from 'immer';
import { useImmerReducer } from 'use-immer';
import { v4 as uuidv4 } from 'uuid';
import { SelectedTypes } from './useSelectedState';

const STORAGE_KEY = 'APP_STATE';

export interface IItem {
  id: string;
  name: string;
}

export interface IColumn {
  id: string;
  name: string;
  items: IItem[];
}

export interface IColumnState {
  columns: IColumn[];
  addColumn: (name: string) => void;
  removeColumn: (columnId: string) => void;
  addItem: (columnId: string, name: string) => void;
  removeItem: (itemId: string) => void;
  renameColumn: (columnId: string, name: string) => void;
  renameItem: (itemId: string, name: string) => void;
  moveUp: (type: SelectedTypes, id: string) => void;
  moveDown: (type: SelectedTypes, id: string) => void;
  moveLeft: (type: SelectedTypes, id: string) => void;
  moveRight: (type: SelectedTypes, id: string) => void;
}

enum ActionTypes {
  ADD_COLUMN,
  ADD_ITEM,
  REMOVE_COLUMN,
  REMOVE_ITEM,
  RENAME_COLUMN,
  RENAME_ITEM,
  MOVE_UP,
  MOVE_DOWN,
  MOVE_LEFT,
  MOVE_RIGHT,
}

interface IAddColumnAction {
  type: ActionTypes.ADD_COLUMN;
  name: string;
}

interface IAddItemAction {
  type: ActionTypes.ADD_ITEM;
  columnId: string;
  name: string;
}

interface IRemoveColumnAction {
  type: ActionTypes.REMOVE_COLUMN;
  columnId: string;
}

interface IRemoveItemAction {
  type: ActionTypes.REMOVE_ITEM;
  itemId: string;
}

interface IRenameColumnAction {
  type: ActionTypes.RENAME_COLUMN;
  columnId: string;
  name: string;
}

interface IRenameItemAction {
  type: ActionTypes.RENAME_ITEM;
  itemId: string;
  name: string;
}

interface IMoveUpAction {
  type: ActionTypes.MOVE_UP;
  editingType: SelectedTypes;
  id: string;
}

interface IMoveDownAction {
  type: ActionTypes.MOVE_DOWN;
  editingType: SelectedTypes;
  id: string;
}

interface IMoveLeftAction {
  type: ActionTypes.MOVE_LEFT;
  editingType: SelectedTypes;
  id: string;
}

interface IMoveRightAction {
  type: ActionTypes.MOVE_RIGHT;
  editingType: SelectedTypes;
  id: string;
}

type Action =
  | IAddColumnAction
  | IAddItemAction
  | IRemoveColumnAction
  | IRemoveItemAction
  | IRenameColumnAction
  | IRenameItemAction
  | IMoveUpAction
  | IMoveDownAction
  | IMoveLeftAction
  | IMoveRightAction;

export const findColumn = (columns: IColumn[], id: string) => {
  const columnIndex = columns.findIndex((col) => col.id === id);
  const column = columns[columnIndex];

  return { column, columnIndex };
};

export const findItem = (columns: IColumn[], id: string) => {
  const columnIndex = columns.findIndex((col) =>
    col.items.some((item) => item.id === id),
  );
  const column = columns[columnIndex];
  const itemIndex = column.items.findIndex((item) => item.id === id);
  const item = column.items[itemIndex];

  return {
    column,
    columnIndex,
    item,
    itemIndex,
  };
};

const swapNeighbouringArrayItems = (arr: any[], idx1: number, idx2: number) => {
  if (idx1 < 0 || idx2 < 0 || idx1 > arr.length - 1 || idx2 > arr.length - 1) {
    return;
  }
  const tmp = arr[idx1];
  arr[idx1] = arr[idx2];
  arr[idx2] = tmp;
};

const appColumnsReducer = (draft: Draft<IColumn[]>, action: Action) => {
  switch (action.type) {
    case ActionTypes.ADD_COLUMN: {
      const { name } = action;
      draft.push({ id: uuidv4(), name, items: [] });
      break;
    }

    case ActionTypes.ADD_ITEM: {
      const { columnId, name } = action;
      const { columnIndex } = findColumn(draft, columnId);
      draft[columnIndex].items.push({ id: uuidv4(), name });
      break;
    }

    case ActionTypes.REMOVE_COLUMN: {
      const { columnId } = action;
      const { columnIndex } = findColumn(draft, columnId);
      draft.splice(columnIndex, 1);
      break;
    }

    case ActionTypes.REMOVE_ITEM: {
      const { itemId } = action;
      const { columnIndex, itemIndex } = findItem(draft, itemId);
      draft[columnIndex].items.splice(itemIndex, 1);
      break;
    }

    case ActionTypes.RENAME_COLUMN: {
      const { columnId, name } = action;
      const { columnIndex } = findColumn(draft, columnId);
      draft[columnIndex].name = name;
      break;
    }

    case ActionTypes.RENAME_ITEM: {
      const { itemId, name } = action;
      const { columnIndex, itemIndex } = findItem(draft, itemId);
      draft[columnIndex].items[itemIndex].name = name;
      break;
    }

    case ActionTypes.MOVE_UP: {
      const { editingType, id } = action;
      if (editingType === SelectedTypes.COLUMN) break;

      const { columnIndex, itemIndex } = findItem(draft, id);
      swapNeighbouringArrayItems(
        draft[columnIndex].items,
        itemIndex - 1,
        itemIndex,
      );
      break;
    }

    case ActionTypes.MOVE_DOWN: {
      const { editingType, id } = action;
      if (editingType === SelectedTypes.COLUMN) break;

      const { columnIndex, itemIndex } = findItem(draft, id);
      swapNeighbouringArrayItems(
        draft[columnIndex].items,
        itemIndex,
        itemIndex + 1,
      );
      break;
    }

    case ActionTypes.MOVE_LEFT: {
      const { editingType, id } = action;
      if (editingType === SelectedTypes.COLUMN) {
        const { columnIndex } = findColumn(draft, id);
        swapNeighbouringArrayItems(draft, columnIndex, columnIndex - 1);
      } else {
        const { columnIndex, itemIndex } = findItem(draft, id);
        if (columnIndex > 0) {
          draft[columnIndex - 1].items.push(
            ...draft[columnIndex].items.splice(itemIndex, 1),
          );
        }
      }
      break;
    }

    case ActionTypes.MOVE_RIGHT: {
      const { editingType, id } = action;
      if (editingType === SelectedTypes.COLUMN) {
        const { columnIndex } = findColumn(draft, id);
        swapNeighbouringArrayItems(draft, columnIndex, columnIndex + 1);
      } else {
        const { columnIndex, itemIndex } = findItem(draft, id);
        if (columnIndex < draft.length - 1) {
          draft[columnIndex + 1].items.push(
            ...draft[columnIndex].items.splice(itemIndex, 1),
          );
        }
      }
      break;
    }

    default:
      throw new Error('Unexpected action type');
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
};

const useColumnState = (): IColumnState => {
  let initialState;
  try {
    initialState = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]');
  } catch (e) {
    // Just in case we have some malformed JSON saved
    initialState = [];
  }

  const [columns, dispatch] = useImmerReducer(appColumnsReducer, initialState);

  const addColumn = useCallback(
    (name: string): void => dispatch({ type: ActionTypes.ADD_COLUMN, name }),
    [dispatch],
  );

  const addItem = useCallback(
    (columnId: string, name: string): void =>
      dispatch({ type: ActionTypes.ADD_ITEM, columnId, name }),
    [dispatch],
  );

  const removeColumn = useCallback(
    (columnId: string): void =>
      dispatch({ type: ActionTypes.REMOVE_COLUMN, columnId }),
    [dispatch],
  );

  const removeItem = useCallback(
    (itemId: string): void =>
      dispatch({ type: ActionTypes.REMOVE_ITEM, itemId }),
    [dispatch],
  );

  const renameColumn = useCallback(
    (columnId: string, name: string): void =>
      dispatch({ type: ActionTypes.RENAME_COLUMN, columnId, name }),
    [dispatch],
  );

  const renameItem = useCallback(
    (itemId: string, name: string): void =>
      dispatch({ type: ActionTypes.RENAME_ITEM, itemId, name }),
    [dispatch],
  );

  const moveUp = useCallback(
    (type: SelectedTypes, id: string): void =>
      dispatch({ type: ActionTypes.MOVE_UP, editingType: type, id }),
    [dispatch],
  );

  const moveDown = useCallback(
    (type: SelectedTypes, id: string): void =>
      dispatch({ type: ActionTypes.MOVE_DOWN, editingType: type, id }),
    [dispatch],
  );

  const moveLeft = useCallback(
    (type: SelectedTypes, id: string): void =>
      dispatch({ type: ActionTypes.MOVE_LEFT, editingType: type, id }),
    [dispatch],
  );

  const moveRight = useCallback(
    (type: SelectedTypes, id: string): void =>
      dispatch({ type: ActionTypes.MOVE_RIGHT, editingType: type, id }),
    [dispatch],
  );

  return {
    columns,
    addColumn,
    addItem,
    removeColumn,
    removeItem,
    renameColumn,
    renameItem,
    moveUp,
    moveDown,
    moveLeft,
    moveRight,
  };
};

export default useColumnState;
