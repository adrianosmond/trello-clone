import { FC, useCallback, useState } from 'react';
import styled from 'styled-components';
import Button from 'components/Button';
import Input from 'components/Input';

const Adder: FC<{
  onAdd: (name: string) => void;
  deselect: () => void;
  label: string;
}> = ({ onAdd, label, deselect }) => {
  const [newName, setNewName] = useState('');
  const add = useCallback(() => {
    if (newName.length > 0) {
      onAdd(newName);
      setNewName('');
    }
  }, [newName, onAdd]);

  return (
    <Form>
      <Input
        value={newName}
        type="text"
        onFocus={deselect}
        onChange={(event) => setNewName(event.target.value)}
        onKeyPress={(event) => {
          if (event.key === 'Enter') {
            add();
          }
        }}
      />
      <Button onClick={add}>{label}</Button>
    </Form>
  );
};

const Form = styled.div`
  display: flex;
  align-items: center;
  & > * + * {
    margin-left: 0.5rem;
  }
`;

export default Adder;
