import { useState, useRef } from "react";
import type { MetaFunction } from "@remix-run/node";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabledEnter?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabledEnter }) => {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (disabledEnter && event.key === "Enter") {
      event.preventDefault();
      return;
    } else if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendButton();
    }
  };

  const handleSendButton = () => {
    if (message.trim()) {
      const sanitizedMessage = message.replace(/'/g, "’").replace(/"/g, "”");
      onSendMessage(sanitizedMessage);
      setMessage("");
    }
  };

  return (
    <div className="relative max-w-screen-xl mx-auto w-full bg-white lg:w-2/5">
      <textarea
        ref={inputRef}
        value={message}
        placeholder="Message Athena..."
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        className={`input pt-2 text-black input-bordered w-full my-2 px-2 bg-[#f4f4f4] resize-none overflow-y-auto ${
          message ? "rounded-xl" : "rounded-2xl"
        }`}
        style={{ resize: "none", overflowY: "auto", height: "50px" }}
      ></textarea>
      <button
        style={{
          cursor: "pointer",
          backgroundColor: message ? "black" : "#eaeded",
        }}
        disabled={disabledEnter}
        onClick={handleSendButton}
        className="absolute bottom-1 right-0 m-2 mb-4 py-1 px-1 rounded-full flex items-center pointer-events-auto"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="icon-2xl"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.1918 8.90615C15.6381 8.45983 16.3618 8.45983 16.8081 8.90615L21.9509 14.049C22.3972 14.4953 22.3972 15.2189 21.9509 15.6652C21.5046 16.1116 20.781 16.1116 20.3347 15.6652L17.1428 12.4734V22.2857C17.1428 22.9169 16.6311 23.4286 15.9999 23.4286C15.3688 23.4286 14.8571 22.9169 14.8571 22.2857V12.4734L11.6652 15.6652C11.2189 16.1116 10.4953 16.1116 10.049 15.6652C9.60265 15.2189 9.60265 14.4953 10.049 14.049L15.1918 8.90615Z"
            fill="white"
          ></path>
        </svg>
      </button>
    </div>
  );
};

// export const meta: MetaFunction = () => {
//   return { title: "Chat Input" };
// };

export default ChatInput;
