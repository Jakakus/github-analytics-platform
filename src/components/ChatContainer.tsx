import React from 'react';
import { Message } from '../types';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import WelcomeScreen from './WelcomeScreen';

interface ChatContainerProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  thinking: boolean;
  inputValue?: string;
  setInputValue?: React.Dispatch<React.SetStateAction<string>>;
}

const ChatContainer: React.FC<ChatContainerProps> = ({ messages, onSendMessage, thinking, inputValue, setInputValue }) => {
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <WelcomeScreen />
        ) : (
          <div className="p-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            
            {thinking && (
              <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 animate-pulse p-4">
                <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-600"></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-600 animation-delay-200"></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-600 animation-delay-400"></div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      
      <ChatInput onSendMessage={onSendMessage} disabled={thinking} inputValue={inputValue} setInputValue={setInputValue} />
    </div>
  );
};

export default ChatContainer;