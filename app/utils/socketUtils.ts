import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";

let socket: Socket<DefaultEventsMap, DefaultEventsMap> | null = null;

/**
 * Initializes the Socket.IO connection.
 * @param url - The server URL to connect to.
 * @returns The initialized socket instance.
 */
export const initializeSocket = (url: string): Socket => {
  if (!socket) {
    socket = io(url, {
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
    });

    // Add default connection and disconnection event listeners
    setupConnectionListeners();
  }
  return socket;
};

/**
 * Disconnects the socket connection if it exists.
 */
export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    // console.log("Socket disconnected.");
    socket = null;
  }
};

/**
 * Sets up event listeners for connection, disconnection, and errors.
 */
const setupConnectionListeners = (): void => {
  if (!socket) return;

  socket.on("connect", () => {
    // console.log(`Socket connected with id: ${socket?.id}`);
  });

  socket.on("disconnect", (reason: string) => {
    console.warn(`Socket disconnected. Reason: ${reason}`);
  });

  socket.on("connect_error", (error) => {
    console.error(`Socket connection error: ${error.message}`);
  });

  socket.on("reconnect_attempt", () => {
    // console.log("Attempting to reconnect...");
  });

  socket.on("reconnect", (attemptNumber: number) => {
    // console.log(`Reconnected successfully after ${attemptNumber} attempt(s).`);
  });

  socket.on("reconnect_failed", () => {
    console.error("Reconnection failed after maximum attempts.");
  });
};
