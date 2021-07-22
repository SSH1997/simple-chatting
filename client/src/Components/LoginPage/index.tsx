import React, { useRef } from 'react';

const LoginPage: React.FC = () => {
  const input = useRef(null);

  const createRandomId = () => Math.random().toString(36).substring(2, 7);

  const handleButtonClick = () => {
    const target: HTMLInputElement = input.current;

    localStorage.setItem('NickName', target.value);
    localStorage.setItem('ID', createRandomId());
    window.location.reload();
  };

  return (
    <div>
      <input type="text" ref={input} />
      <button type="button" onClick={handleButtonClick}>login</button>
    </div>
  );
};
export default LoginPage;
