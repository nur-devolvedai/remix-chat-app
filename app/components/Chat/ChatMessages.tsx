export default function ChatMessages() {
    return (
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {/* Received Message */}
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-10 h-10 bg-gray-300 rounded-full"></div>
            <div className="bg-gray-200 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm">Hello! How can I assist you today?</p>
            </div>
          </div>
  
          {/* Sent Message */}
          <div className="flex items-end justify-end space-x-3">
            <div className="bg-indigo-500 text-white p-4 rounded-lg">
              <p className="text-sm">Can you help me with my project?</p>
            </div>
            <div className="flex-shrink-0 w-10 h-10 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }
  