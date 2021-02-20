import { FC, useCallback, useState } from 'react';
import styled from 'styled-components';
import { useAppContext } from 'contexts/AppContext';

const NewColumnForm: FC = () => {
  const { addColumn } = useAppContext();
  const [newColumnName, setNewColumnName] = useState('');
  const add = useCallback(() => {
    if (newColumnName.length > 0) {
      addColumn(newColumnName);
      setNewColumnName('');
    }
  }, [newColumnName, addColumn]);

  return (
    <Form>
      <Input
        value={newColumnName}
        type="text"
        onChange={(event) => setNewColumnName(event.target.value)}
        onKeyPress={(event) => {
          if (event.key === 'Enter') {
            add();
          }
        }}
      />
      <Button onClick={add}>Add column</Button>
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

const Input = styled.input`
  display: block;
  flex-grow: 1;
  padding: 0.25rem 0.5rem;
  border-bottom: 1px solid #ccc;
  outline: none;
  background-color: transparent;
  &:focus {
    border-bottom-color: #666;
  }
`;

const Button = styled.button`
  padding: 0.25rem 0.5rem;
  background-color: #ddd;
  color: #333;
  border-radius: 0.25rem;
`;

export default NewColumnForm;
