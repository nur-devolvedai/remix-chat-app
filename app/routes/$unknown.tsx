import { Link } from "@remix-run/react";
import { useEffect } from "react";
import { FaSadTear } from "react-icons/fa"; // Import an icon

export default function NotFound() {
  useEffect(() => {
    // Force the browser to do a full page reload when this component loads
    window.location.reload();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Icon */}
      <div className="p-4 bg-red-500 text-white rounded-full shadow-lg">
        <FaSadTear size={40} />
      </div>

      {/* Title */}
      <h1 className="mt-6 text-5xl font-extrabold tracking-tight text-center">
        Oops! Page Not Found
      </h1>

      {/* Subtitle */}
      <p className="mt-4 text-lg text-center text-gray-600 dark:text-gray-400">
        We can&apos;t seem to find the page you&apos;re looking for.
      </p>
      <p className="mt-2 text-center text-gray-600 dark:text-gray-400">
        Error Code: <span className="font-bold text-red-500">404</span>
      </p>

      {/* Button */}
      <Link
        to="/"
        className="mt-8 px-6 py-3 bg-black text-white rounded-lg shadow-md hover:bg-gray-800 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
