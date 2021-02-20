import { FC } from 'react';
import { IItem } from 'hooks/useColumnState';
import useItem from 'hooks/useItem';
import Card from 'components/Card';
import DeleteButton from 'components/DeleteButton';

const Item: FC<IItem> = ({ id, name }) => {
  const { remove } = useItem(id);

  return <Card heading={name} actions={<DeleteButton onClick={remove} />} />;
};

export default Item;
