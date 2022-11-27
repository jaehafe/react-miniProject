import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

// type SetValue<T> = Dispatch<SetStateAction<T>>

function getSavedValue(key: any, initialValue: any): any {
  const savedValue = JSON.parse(localStorage.getItem(key));
  if (savedValue) return savedValue;

  if (initialValue instanceof Function) return initialValue();
  return initialValue;
}

//
const useLocalStorage = (key: string, initialValue: any) => {
  const [value, setValue] = useState(() => {
    return getSavedValue(key, initialValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
};

export default useLocalStorage;
