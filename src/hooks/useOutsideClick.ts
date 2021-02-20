import { RefObject, useEffect } from 'react';

const useOutsideClick = (
  ref: RefObject<HTMLElement>,
  callback: ((e: MouseEvent) => void) | undefined,
) => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (e.target instanceof Node && !ref?.current?.contains(e.target)) {
        callback?.(e);
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
};

export default useOutsideClick;
