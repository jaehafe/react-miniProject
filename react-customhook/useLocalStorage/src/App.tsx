// import React, { useState } from 'react';
import useLocalStorage from './useLocalStorage';
import useUpdateLogger from './useUpdateLogger';

const App = () => {
  const [value, setValue] = useLocalStorage('name', '');
  useUpdateLogger(value);

  return (
    <input
      type="text"
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setValue(e.target.value)
      }
    />
  );
};

export default App;
