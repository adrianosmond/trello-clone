import { FC, InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Input from 'components/Input';

const EditableHeader: FC<
  InputHTMLAttributes<HTMLInputElement> & {
    heading: string;
  }
> = ({ heading, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    inputRef?.current?.focus();
  }, [isEditing]);

  if (isEditing) {
    return (
      <Input
        ref={inputRef}
        value={heading}
        onChange={onChange}
        onKeyPress={(event) => {
          if (event.key === 'Enter') {
            setIsEditing(false);
          }
        }}
        onBlur={() => setIsEditing(false)}
      />
    );
  }
  return <TextButton onClick={() => setIsEditing(true)}>{heading}</TextButton>;
};

const TextButton = styled.button`
  text-align: left;
  border-bottom: 2px solid transparent;
  &:active {
    outline: none;
  }
  &:hover {
    border-bottom-color: #999;
  }
`;

export default EditableHeader;
