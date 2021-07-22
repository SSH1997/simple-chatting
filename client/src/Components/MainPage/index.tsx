import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import styled from 'styled-components';

interface Chat {
  content: string;
  id: string;
  nickName: string;
}
interface Chats {
  chatList: Array<Chat>
}

const StyledChatDiv = styled.div`
  width: 600px;
  height: 800px;
  background-color: gray;
  overflow-y:auto;
`;

const StyledInput = styled.input`
  width: 600px;
  height: 50px;
`;

interface Props {
  isMine: boolean;
}

const Message = styled.div<Props>`
  width: 200px;
  height: 50px;
  margin-left: ${({ isMine }) => (isMine ? '400px' : '0')};
  background-color: ${({ isMine }) => (isMine ? 'yellow' : 'pink')};
`;

const createRandomId = () => Math.random().toString(36).substring(2, 6);

const MainPage: React.FC = () => {
  const [chats, setChats] = useState<Chats>({ chatList: [] });
  const [id, setId] = useState('');
  const [nickName, setNickName] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    const socketClient = io('http://localhost:3000');

    socketClient.on('newChat', (req) => {
      const { chatList } = chats;

      chatList.push(req);

      setChats({ chatList });
    });

    setId(localStorage.getItem('ID'));
    setNickName(localStorage.getItem('NickName'));
  }, []);

  const handleSendClick = () => {
    const input:HTMLInputElement = inputRef.current;

    axios.post('http://localhost:3000', { content: input.value, id, nickName });

    input.value = null;
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendClick();
    }
  };

  const handleLogoutClick = () => {
    localStorage.clear();

    window.location.reload();
  };

  return (
    <>
      <StyledChatDiv>
        {chats.chatList.map((element) => (
          <Message key={createRandomId()} isMine={element.id === id}>
            {element.content}
            by
            <br />
            {element.nickName}
          </Message>
        ))}
      </StyledChatDiv>
      <StyledInput type="text" ref={inputRef} onKeyDown={handleInputKeyDown} />
      <button type="button" onClick={handleSendClick}>emit</button>
      <button type="button" onClick={handleLogoutClick}>logout</button>
    </>
  );
};
export default MainPage;
