import { FC } from 'react';
import { useAppContext } from 'contexts/AppContext';
import Adder from 'components/Adder';

const NewColumnForm: FC = () => {
  const { addColumn, deselect } = useAppContext();

  return <Adder label="Add column" onAdd={addColumn} deselect={deselect} />;
};

export default NewColumnForm;
