import styled from 'styled-components';

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

export default Input;
