import { MutableRefObject } from "react";

interface ServerResponse {
  success: boolean;
  data?: string;
  message?: string;
}

export function handleSocketEvents(
  socket: MutableRefObject<any>,
  {
    setStreamData,
    saveResponse,
    handleStreamComplete,
  }: {
    setStreamData: React.Dispatch<React.SetStateAction<string[]>>;
    saveResponse: (chunk: string) => Promise<void>;
    handleStreamComplete: () => Promise<void>;
  }
) {
  let streamStarted = false;
  let isStreamingActive = false;

  // Handle streaming response
  const handleResponse = (data: ServerResponse) => {
    if (data.success && data.data) {
      // Accumulate streaming response
      isStreamingActive = true;
      streamStarted = true; // Valid data received
      setStreamData((prev) => [...prev, data.data as string]);
    }

    if (data.message === "[STREAM COMPLETED]") {
      // Stream completed
      handleStreamComplete();
      isStreamingActive = false;
    }
  };

  // Handle disconnection
  const handleDisconnect = () => {
    console.warn("Socket disconnected.");
    isStreamingActive = false;
    if (!streamStarted) {
      // Stream never started, save fallback message
      const fallbackMessage =
        "Sorry for the inconvenience. How can I help you?";
      setTimeout(() => {
        if (!isStreamingActive) {
          setStreamData([fallbackMessage]);
          saveResponse(fallbackMessage);
        }
      }, 2000);
    } else {
      // Ensure only accumulated response is saved
      handleStreamComplete();
    }
  };

  // Handle errors
  const handleError = (error: any) => {
    console.error("Socket error:", error);
    isStreamingActive = false;
    if (!streamStarted) {
      const fallbackMessage =
        "Sorry for the inconvenience. How can I help you?";
      setTimeout(() => {
        if (!isStreamingActive) {
          setStreamData([fallbackMessage]);
          saveResponse(fallbackMessage);
        }
      }, 2000);
    } else {
      handleStreamComplete();
    }
  };

  // Attach socket listeners
  socket.current.on("response", handleResponse);
  socket.current.on("disconnect", handleDisconnect);
  socket.current.on("error", handleError);

  // Return a cleanup function
  return () => {
    socket.current.off("response", handleResponse);
    socket.current.off("disconnect", handleDisconnect);
    socket.current.off("error", handleError);
  };
}
