import { FaTimes } from "react-icons/fa";
import { Link } from "@remix-run/react";

interface Chat {
  id: string;
  title: string;
}

export default function Sidebar({
  isOpen,
  toggleSidebar,
  chatHistory,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
  chatHistory: Chat[]; // Array of chat objects
}) {
  return (
    <aside
      className={`${
        isOpen ? "block" : "hidden"
      } lg:block w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700`}
    >
      {/* Header */}
      <div className="p-4 border-b dark:border-gray-700 flex items-center justify-between lg:justify-center">
        <h2 className="text-2xl font-bold">Athena Chat</h2>
        <button
          className="lg:hidden text-gray-700 dark:text-gray-200"
          onClick={toggleSidebar}
        >
          <FaTimes />
        </button>
      </div>

      {/* Chat History */}
      <div className="p-4 space-y-4">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
          Chat History
        </h3>
        <ul className="space-y-2">
          {chatHistory.map((chat) => (
            <li key={chat.id}>
              <Link
                to={`/chat/${chat.id}`}
                className="block px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                {chat.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
