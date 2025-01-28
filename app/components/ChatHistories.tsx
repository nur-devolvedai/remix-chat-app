import React, { useEffect, useRef, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import ReactMarkdown from "react-markdown";

interface Chat {
  id: string;
  prompt?: string;
  answer?: string;
}

interface ChatHistoriesProps {
  currentChat: Chat[];
  isStreaming: boolean;
}

const ChatHistories: React.FC<ChatHistoriesProps> = ({ currentChat, isStreaming }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isCopied, setIsCopied] = useState("");

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentChat]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(text);
      setTimeout(() => setIsCopied(""), 2000);
    });
  };

  const renderCodeBlock = ({ language, value }: { language: string; value: string }) => (
    <div className="relative bg-black text-white rounded-md p-4 w-80 lg:w-full">
      <SyntaxHighlighter language={language} style={oneDark} showLineNumbers className="overflow-x-auto">
        {value}
      </SyntaxHighlighter>
      <button
        onClick={() => copyToClipboard(value)}
        className="absolute top-2 right-2 text-white text-sm px-2 py-1 rounded hover:bg-gray-600"
      >
        {isCopied === value ? "Copied!" : "Copy code"}
      </button>
    </div>
  );

  useEffect(() => {
    if (!isStreaming && scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isStreaming]);

  return (
    <>
      {currentChat.map((chat) => (
        <div key={chat.id} className="mb-28 lg:mb-10">
          {chat.prompt && (
            <div className="flex justify-end">
              <div className="max-w-lg p-4 bg-[#f4f4f4] rounded-xl text-base text-gray-950 leading-6">
                <p className="text-left">{chat.prompt}</p>
              </div>
            </div>
          )}
          {chat.answer && (
            <div>
              <div className="flex justify-start my-2">
                <div className="flex items-start max-w-full text-base text-gray-950 leading-6">
                  <img
                    src="/logo-v2.png"
                    alt="Athena"
                    width={30}
                    height={30}
                  />
                  <div className="max-w-full break-words ml-2 markdown-content">
                    <ReactMarkdown
                      components={{
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        code({ node, inline, className, children, ...props }: any) {
                          const match = /language-(\w+)/.exec(className || "");
                          return !inline && match ? (
                            renderCodeBlock({
                              language: match[1],
                              value: String(children).replace(/\n$/, ""),
                            })
                          ) : (
                            <code
                              className={`inline-code ${className || ""} text-red-500 bg-gray-100 p-1 rounded`}
                              {...props}
                            >
                              {children}
                            </code>
                          );
                        },
                      }}
                    >
                      {chat.answer}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
              {/* <UserFeedback answer={chat.answer} /> */}
            </div>
          )}
          {isStreaming ? "" : <div ref={scrollRef}></div>}
        </div>
      ))}
    </>
  );
};

export default ChatHistories;
