import React, { useEffect, useState } from "react";
import { useNavigate } from "@remix-run/react";
import { json } from "@remix-run/node";
import Cookies from "js-cookie";
import ChatInput from "~/components/chatInput";
import { clearDatabase, saveChatEntry, createIndexDb, fetchAndSaveChatData } from "~/utils/chatDbUtils";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
import { chatCreateHistory, savePromptAnswer } from "var";

export const loader = async () => {
  await clearDatabase();
  await createIndexDb();
  await fetchAndSaveChatData();
  return json({});
};

const Chat: React.FC = () => {
  const navigate = useNavigate();
  const [isChatInputDisabled, setIsChatInputDisabled] = useState(false);

  useEffect(() => {
    Swal.fire({
      title: `<h2 class="text-blue-600 font-bold text-xl">Welcome to Athena 2 Beta</h2>`,
      html: `
        <div class="p-4">
          <p class="text-lg font-semibold text-gray-800 mb-4">Thank you for testing Athena in beta!</p>
          <ul class="text-left space-y-2">
            <li class="text-gray-700">
              <strong class="text-blue-600">Report Issues:</strong> Send bugs or feedback to 
              <a href="mailto:bugs@devolvedai.com" class="text-blue-500 underline hover:text-blue-700">bugs@devolvedai.com</a>.
            </li>
            <li class="text-gray-700">
              <strong class="text-red-600">Important:</strong> Do not share sensitive or personal information while using the chat during this beta phase.
            </li>
          </ul>
          <p class="mt-6 text-gray-700 text-sm">
            By clicking <span class="font-bold">Okay</span>, you agree to these terms.
          </p>
        </div>
      `,
      icon: "info",
      confirmButtonText: "Okay",
      allowOutsideClick: false,
    });
  }, []);

  const generateChatHistoryId = (): string => {
    const uuidSegments = uuidv4().split("-");
    const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, "");
    return `${uuidSegments[0]}-${uuidSegments[1]}-${uuidSegments[2]}-${uuidSegments[3]}-${timestamp}`;
  };

  const createChatHistoryApiCall = async (sessionId: string, title: string) => {
    const token = Cookies.get("token");
    const response = await fetch(chatCreateHistory, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ sessionId, title }),
    });
    if (!response.ok) throw new Error("Failed to create chat history");
  };

  const saveChatEntryToAPI = async (sessionId: string, text: string, type: string) => {
    const token = Cookies.get("token");
    await fetch(savePromptAnswer, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ sessionId, text, type }),
    });
  };

  const onSendMessage = async (message: string) => {
    if (!message.trim()) {
      Swal.fire("Invalid Message", "Please enter a valid message.", "warning");
      return;
    }
    setIsChatInputDisabled(true);
    const chatHistoryId = generateChatHistoryId();
    Cookies.set("c_id", chatHistoryId);
    Cookies.set("_prompt", message);
    sessionStorage.setItem("chat_history_id", chatHistoryId);
    navigate(`/chat/${chatHistoryId}`);
    await Promise.all([
      saveChatEntry(chatHistoryId, message, "prompt"),
      saveChatEntryToAPI(chatHistoryId, message, "prompt"),
      createChatHistoryApiCall(chatHistoryId, message),
    ]);
  };

  return (
    <section className="text-center bg-[#fff]">
      <div className="flex flex-col justify-end mt-auto text-gray-800 flex-grow" style={{ height: "calc(100vh - 125px)" }}>
        <div className="flex flex-col items-center justify-center mt-8">
          <img src="/logo-v2.png" alt="Athena Logo" width={100} height={100} />
        </div>
        <div className="flex flex-col justify-center mb-10">
          <p className="text-lg md:text-2xl font-bold">Welcome to Athena 2.0</p>
          <p className="text-sm md:text-base">AI, for the people, by the people.</p>
        </div>
        <ChatInput onSendMessage={onSendMessage} disabledEnter={isChatInputDisabled} />
      </div>
    </section>
  );
};

export default Chat;
