import { useEffect } from 'react';
import { useAppContext } from 'contexts/AppContext';

export default () => {
  const { editing, moveUp, moveDown, moveLeft, moveRight } = useAppContext();

  useEffect(() => {
    const keyListener = (e: KeyboardEvent) => {
      if (editing) {
        const { type, id } = editing;

        switch (e.key) {
          case 'ArrowUp': {
            moveUp(type, id);
            break;
          }
          case 'ArrowDown': {
            moveDown(type, id);
            break;
          }
          case 'ArrowLeft': {
            moveLeft(type, id);
            break;
          }
          case 'ArrowRight': {
            moveRight(type, id);
            break;
          }
          default:
            break;
        }
      }
    };
    document.addEventListener('keyup', keyListener);

    return () => document.removeEventListener('keyup', keyListener);
  }, [editing]);
};