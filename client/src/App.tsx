import React, { useState } from 'react';

import LoginPage from './Components/LoginPage';
import MainPage from './Components/MainPage';

const App: React.FC = () => {
  const [nickName, setNickName] = useState(localStorage.getItem('NickName'));
  return !nickName ? <LoginPage /> : <MainPage />;
};
export default App;
