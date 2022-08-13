import React, { useEffect, useState } from 'react';

import './Error.css';
const Error = ({ children }) => {
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
        {displayComponent && <div className='error-container'>{children}</div>}
      </>
    );
  }

  return null;
};

export default Error;
