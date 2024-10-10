import React, { useState } from 'react';

export const ChatContext = React.createContext({
  channel: null,
  setChannel: (channel: string) => {},
  thread: null,
  setThread: (thread: string) => {},
});

export const ChatProvider = ({ children }: any) => {
  const [channel, setChannel] = useState<string>('');
  const [thread, setThread] = useState<string>('');

  return <ChatContext.Provider value={{ channel, setChannel, thread, setThread }}>{children}</ChatContext.Provider>;
};

export const useChatContext = () => React.useContext(ChatContext);