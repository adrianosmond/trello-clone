import { useCallback } from 'react';
import { Draft } from 'immer';
import { useImmerReducer } from 'use-immer';
import { v4 as uuidv4 } from 'uuid';

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
  addItem: (columnId: string, name: string) => void;
}

enum ActionTypes {
  ADD_COLUMN,
  ADD_ITEM,
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

type Action = IAddColumnAction | IAddItemAction;

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

  return {
    columns,
    addColumn,
    addItem,
  };
};

export default useColumnState;
