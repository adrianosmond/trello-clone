import { useEffect } from 'react';
import { useAppContext } from 'contexts/AppContext';

export default () => {
  const {
    selected,
    moveUp,
    moveDown,
    moveLeft,
    moveRight,
    dismissKeyboardHint,
  } = useAppContext();

  useEffect(() => {
    const keyListener = (e: KeyboardEvent) => {
      if (selected) {
        const { type, id } = selected;

        switch (e.key) {
          case 'ArrowUp': {
            moveUp(type, id);
            dismissKeyboardHint();
            break;
          }
          case 'ArrowDown': {
            moveDown(type, id);
            dismissKeyboardHint();
            break;
          }
          case 'ArrowLeft': {
            moveLeft(type, id);
            dismissKeyboardHint();
            break;
          }
          case 'ArrowRight': {
            moveRight(type, id);
            dismissKeyboardHint();
            break;
          }
          default:
            break;
        }
      }
    };
    document.addEventListener('keyup', keyListener);

    return () => document.removeEventListener('keyup', keyListener);
  }, [moveDown, moveLeft, moveRight, moveUp, selected]);
};
