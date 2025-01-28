import React, { useEffect, useRef, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import ReactMarkdown from "react-markdown";
import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { parseMessage } from "~/utils/responseParseUtils";

export const loader: LoaderFunction = async () => {
  return json({});
};

interface BotResponseProps {
  streamData: string[];
  copiedIndex: number | null;
  llmName: string;
  copyToClipboard: (content: string, index: number) => void;
}

const BotResponse: React.FC<BotResponseProps> = ({
  streamData,
  llmName,
}) => {
  const [isAtBottom, setIsAtBottom] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isAtBottom && containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [streamData, isAtBottom]);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const atBottom = scrollTop + clientHeight >= scrollHeight - 10;
    setIsAtBottom(atBottom);
  };

  const renderCodeBlock = ({
    language,
    value,
  }: {
    language: string;
    value: string;
  }) => (
    <div className="relative group bg-black text-white rounded-md p-4 w-80 lg:w-full">
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        className="overflow-x-auto overflow-y-hidden"
        showLineNumbers
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );

  const renderMarkdown = (content: string) => (
    <div className="max-w-full break-words markdown-content">
      <ReactMarkdown
        components={{
          code({ inline, className, children, ...props }: any) {
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
        {content}
      </ReactMarkdown>
    </div>
  );

  return (
    <div
      className="flex flex-col w-full overflow-y-auto scrollbar-hidden max-h-[80vh]"
      ref={containerRef}
      onScroll={handleScroll}
      style={{ scrollBehavior: "smooth" }}
    >
      <div className="flex justify-start mb-6">
        <div className="flex items-start max-w-full text-base text-gray-950 leading-6 font-sans">
          <p className="text-gray-500 italic">{llmName}</p>
        </div>
        <div className="max-w-full text-gray-950 mt-2 break-words">
          {streamData.length === 0 ? (
            <p className="text-gray-500 italic">{llmName}</p>
          ) : (
            parseMessage(streamData.join("")).map((segment) =>
              segment.type === "code"
                ? renderMarkdown(`\`\`\`${segment.language || ""}\n${segment.content}\n\`\`\``)
                : renderMarkdown(segment.content)
            )
          )}
          <div className="my-4"></div>
        </div>
      </div>
    </div>
  );
};

export default BotResponse;
