import { useImmerReducer } from 'use-immer';

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
}

const appColumnsReducer = () => {};

const useColumnState = (): IColumnState => {
  let initialState;
  try {
    initialState = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]');
  } catch (e) {
    // Just in case we have some malformed JSON saved
    initialState = [];
  }

  const [columns] = useImmerReducer(appColumnsReducer, initialState);

  return {
    columns,
  };
};

export default useColumnState;
