import React from 'react';
import { Message, User } from '../../../../types';
import { ChatMessage } from '../ChatMessage';
import { TypingIndicator } from '../TypingIndicator';
import { ChatInput } from '../ChatInput';
import { theme } from '../../../../shared/utils/theme';

interface ChatContainerProps {
  messages: Message[];
  isTyping: boolean;
  typingUser: User;
  onSendMessage: (content: string) => void;
}

export function ChatContainer({ 
  messages, 
  isTyping, 
  typingUser, 
  onSendMessage 
}: ChatContainerProps) {
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="h-full flex flex-col">
      <div 
        className="flex-1 overflow-y-auto p-4 space-y-4"
        style={{ backgroundColor: theme.colors.background.secondary }}
      >
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            isOwnMessage={message.sender.role === 'User'}
          />
        ))}
        {isTyping && <TypingIndicator sender={typingUser} />}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput onSendMessage={onSendMessage} />
    </div>
  );
}