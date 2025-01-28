import { useEffect, useState } from "react";
import { useParams } from "@remix-run/react";

const ChatPage = () => {
  const { chatId } = useParams();
  const [response, setResponse] = useState<string | null>(null);
  const [typedResponse, setTypedResponse] = useState<string>("");

  useEffect(() => {
    // Retrieve response data from sessionStorage
    const storedResponse = sessionStorage.getItem("response");
    if (storedResponse) {
      setResponse(JSON.parse(storedResponse));
    }
  }, []);

  useEffect(() => {
    if (response) {
      let currentIndex = 0;
      const interval = setInterval(() => {
        setTypedResponse((prev) => prev + response[currentIndex]);
        currentIndex++;

        if (currentIndex >= response.length) {
          clearInterval(interval);
        }
      }, 50); // Adjust typing speed (50ms per character)
    }
  }, [response]);

  return (
    <div className="chat-page">
      <h1>Chat ID: {chatId}</h1>
      <div className="response">
        <p>{typedResponse}</p>
      </div>
    </div>
  );
};

export default ChatPage;
