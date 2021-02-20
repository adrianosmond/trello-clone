import { useContext, createContext } from 'react';
import { IColumnState } from 'hooks/useColumnState';
import { IEditingState } from 'hooks/useEditingState';

export type IAppContext = IColumnState & IEditingState;

export const AppContext = createContext<IAppContext>({
  columns: [],
  addColumn: () => {},
  addItem: () => {},
  removeColumn: () => {},
  removeItem: () => {},
  moveUp: () => {},
  moveDown: () => {},
  moveLeft: () => {},
  moveRight: () => {},
  editing: null,
  editColumn: () => {},
  editItem: () => {},
  stopEditing: () => {},
});

export const useAppContext = () => useContext(AppContext);
