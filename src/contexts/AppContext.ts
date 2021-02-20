import { useContext, createContext } from 'react';
import { IColumnState } from 'hooks/useColumnState';
import { ISelectedState } from 'hooks/useSelectedState';

export type IAppContext = IColumnState & ISelectedState;

export const AppContext = createContext<IAppContext>({
  columns: [],
  addColumn: () => {},
  addItem: () => {},
  removeColumn: () => {},
  removeItem: () => {},
  renameColumn: () => {},
  renameItem: () => {},
  moveUp: () => {},
  moveDown: () => {},
  moveLeft: () => {},
  moveRight: () => {},
  selected: null,
  selectColumn: () => {},
  selectItem: () => {},
  deselect: () => {},
});

export const useAppContext = () => useContext(AppContext);
