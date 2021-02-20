import { FC } from 'react';
import { useAppContext } from 'contexts/AppContext';
import Adder from 'components/Adder';

const NewColumnForm: FC = () => {
  const { addColumn } = useAppContext();

  return <Adder label="Add column" onAdd={addColumn} />;
};

export default NewColumnForm;
