import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[80%] rounded-lg px-4 py-2 ${
          message.role === 'user'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
        }`}
      >
        {message.role === 'assistant' ? (
          <div className="prose dark:prose-invert max-w-none">
            <ReactMarkdown
              rehypePlugins={[rehypeHighlight]}
              components={{
                code: ({ node, className, children, ...props }) => (
                  <code
                    className={`${className} block p-4 rounded-lg`}
                    {...props}
                  >
                    {children}
                  </code>
                ),
                p: ({ children }) => <p className="mb-2">{children}</p>,
                ul: ({ children }) => <ul className="list-disc pl-4 mb-2">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal pl-4 mb-2">{children}</ol>,
                li: ({ children }) => <li className="mb-1">{children}</li>,
                a: ({ href, children }) => (
                  <a href={href} className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                    {children}
                  </a>
                ),
                h1: ({ children }) => <h1 className="text-2xl font-bold mb-4">{children}</h1>,
                h2: ({ children }) => <h2 className="text-xl font-bold mb-3">{children}</h2>,
                h3: ({ children }) => <h3 className="text-lg font-bold mb-2">{children}</h3>,
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic mb-2">
                    {children}
                  </blockquote>
                ),
                pre: ({ children }) => <pre className="mb-2">{children}</pre>,
                table: ({ children }) => (
                  <div className="overflow-x-auto mb-2">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      {children}
                    </table>
                  </div>
                ),
                th: ({ children }) => (
                  <th className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-left">{children}</th>
                ),
                td: ({ children }) => <td className="px-4 py-2 border-t">{children}</td>,
                hr: () => <hr className="my-4 border-gray-200 dark:border-gray-700" />,
                img: ({ src, alt }) => (
                  <img src={src} alt={alt} className="max-w-full h-auto rounded-lg my-2" />
                )
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        ) : (
          <p className="whitespace-pre-wrap">{message.content}</p>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;