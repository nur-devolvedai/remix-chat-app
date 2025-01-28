import { FaBars, FaUserCircle, FaEdit } from "react-icons/fa";

export default function Header({ toggleSidebar }: { toggleSidebar: () => void }) {
  return (
    <header className="flex items-center justify-between p-4 border-b dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="flex items-center justify-between gap-4">
        <button className="text-2xl lg:hidden" onClick={toggleSidebar}>
          <FaBars />
        </button>
        <button className="text-2xl lg:hidden">
          <FaEdit />
        </button>
      </div>
      <h1 className="text-xl font-semibold">Chat Room</h1>
      <FaUserCircle size={28} />
    </header>
  );
}
