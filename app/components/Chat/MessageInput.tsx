import { FaPaperPlane } from "react-icons/fa";

export default function MessageInput() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent!");
  };

  return (
    <footer className="p-4 bg-gray-50 dark:bg-gray-800 border-t dark:border-gray-700">
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="p-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
        >
          <FaPaperPlane />
        </button>
      </form>
    </footer>
  );
}
