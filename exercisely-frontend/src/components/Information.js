import React, { useEffect, useState } from 'react';

import './Information.css';
const Information = ({ children }) => {
  const [displayComponent, setDisplayComponent] = useState(true);
  useEffect(() => {
    let timer = setTimeout(() => {
      setDisplayComponent(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (displayComponent) {
    return (
      <>
        {displayComponent && <div className='info-container'>{children}</div>}
      </>
    );
  }

  return null;
};

export default Information;
