import { io, Socket } from "socket.io-client";

class SocketManager {
  private static instance: SocketManager;
  private sockets: Record<string, Socket> = {};

  private constructor() {}

  public static getInstance(): SocketManager {
    if (!SocketManager.instance) {
      SocketManager.instance = new SocketManager();
    }
    return SocketManager.instance;
  }

  public getSocket(sessionId: string, url: string): Socket {
    if (!this.sockets[sessionId]) {
      this.sockets[sessionId] = io(url);
      console.log(`[SocketManager] Initialized socket for session ID: ${sessionId}`);
    }
    return this.sockets[sessionId];
  }

  public disconnectSocket(sessionId: string): void {
    if (this.sockets[sessionId]) {
      this.sockets[sessionId].disconnect();
      delete this.sockets[sessionId];
      console.log(`[SocketManager] Disconnected socket for session ID: ${sessionId}`);
    }
  }
}

export const socketManager = SocketManager.getInstance();
