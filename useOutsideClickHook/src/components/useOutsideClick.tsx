import React, { useEffect } from 'react';

const useOutsideClick = (ref: any, callback: any) => {
  useEffect(() => {
    const handleClick = (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };
    // document.addEventListener('click', handleClick);
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('touchstart', handleClick);

    return () => {
      // document.addEventListener('click', handleClick);
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleClick);
    };
  }, [ref, callback]);
};

export default useOutsideClick;
