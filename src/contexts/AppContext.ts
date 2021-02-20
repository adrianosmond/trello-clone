import { useContext, createContext } from 'react';
import { IColumnState } from 'hooks/useColumnState';

export const AppContext = createContext<IColumnState>({
  columns: [],
  addColumn: () => {},
  addItem: () => {},
});

export const useAppContext = () => useContext(AppContext);
