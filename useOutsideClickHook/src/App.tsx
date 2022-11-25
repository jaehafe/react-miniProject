import React, { useRef, useState } from 'react';
import useOutsideClick from './components/useOutsideClick';
import './App.css';

const App = () => {
  const [show, setShow] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => {
    setShow(false);
  });

  return (
    <div className="app">
      <button onClick={() => setShow(!show)} className="st_btn">
        Menu
      </button>
      {show && (
        <div ref={ref} className="st_mdl">
          <h4>
            this is a menu <small>(click outside to close)</small>
          </h4>
          <input type="text" />
          <button onClick={() => setShow(false)}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default App;
