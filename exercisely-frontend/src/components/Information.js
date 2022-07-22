import React, { useState } from 'react';
import { useEffect } from 'react';

const Information = ({ type, msg }) => {
  const [componentStyle, setComponentStyle] = useState(null);
  useEffect(() => {
    const errorCss = {
      backgroundColor: 'var(--danger-background)',
      color: 'var(--danger-text)',
      width: '90vw',
      border: '1px solid red',
    };
    const infoCss = {
      backgroundColor: 'var(--success-background)',
      color: 'var(--success-text)',
      width: '90vw',
      border: '1px solid green',
    };
    if (type === 'error') {
      setComponentStyle(errorCss);
    } else {
      setComponentStyle(infoCss);
    }
  }, [type]);

  return (
    <div style={componentStyle}>
      <h3>{msg}</h3>
    </div>
  );
};

export default Information;
