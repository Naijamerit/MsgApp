import React, { createContext, useState } from 'react';
import Chatlist from './Chatlist';
import ChatMsg from './ChatMsg';
import { data } from './Data';
import './style.css';

export const MsgContext = createContext([]);

export default function ChatApp() {
  const [text, setText] = useState('');
  const [chats, setChats] = useState(data);
  const showMsg = chats.filter((el) => el.active === true);
  const id = showMsg[0].id;
  const name = showMsg[0].name;

  function openMsg(ev) {
    const chatMsg = chats.map((el) => {
      if (ev.target.id === el.id) {
        el.active = true;
      } else {
        el.active = false;
      }
      return el;
    });

    setChats(chatMsg);
  }

  function sendMsg(ev, id) {
    ev.preventDefault();
    const newMsg = chats.map((textMsg) => {
      if (textMsg.id === id && text !== '') {
        textMsg.msg = [
          ...textMsg.msg,
          {
            id: textMsg.msg.length + 1,
            text: text,
            time: new Date().toLocaleTimeString(),
          },
        ];
      }
      return textMsg;
    });

    setChats(newMsg);
    setText('');
  }

  return (
    <div className="main">
      <MsgContext.Provider
        value={{ chats, showMsg, openMsg, setText, id, sendMsg, text, name }}
      >
        <Chatlist />
        <ChatMsg />
      </MsgContext.Provider>
    </div>
  );
}
