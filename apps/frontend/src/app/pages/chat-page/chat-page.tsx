import React, { useState, useEffect, FormEvent } from 'react';
import { io, Socket } from 'socket.io-client';
import {
  Message,
  ServerToClientEvents,
  ClientToServerEvents,
  ChatUser,
} from '@org/shared-types';
import { MessageForm } from '../../components/message-form/message-form';
import { Messages } from '../../components/messages/messages';
import { ChatLayout } from '../../layouts/chat.loyout';

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();

export function ChatPage(): JSX.Element {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState<Message[]>([]);
  const [user, setUser] = useState<ChatUser>();

  useEffect(() => {
    // const currentUser = await fetch('http://localhost:8080/api/users/')
    // if (currentUser.userId) {
    //   setUser(currentUser);
    // }

    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('chat', (e) => {
      setMessages((messages) => [e, ...messages]);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('chat');
    };
  }, []);

  const sendMessage = (e: FormEvent<HTMLFormElement>) => {
    if (user) {
      socket.emit('chat', {
        user: {
          userId: user.userId,
          userName: user.userName,
        },
        timeSent: new Date(Date.now()).toLocaleString('en-US'),
        message: "hello"
      });
    }
  };
  return (
    <ChatLayout>
      <Messages user={{ userId: "2", userName: "man" }} messages={messages}></Messages>
      <MessageForm sendMessage={sendMessage}></MessageForm>
    </ChatLayout>
  );
}