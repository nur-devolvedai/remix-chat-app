import { create } from "zustand";

interface StreamingState {
  streams: Record<
    string,
    { data: string[]; isStreaming: boolean; llmName: string }
  >;
  addStream: (sessionId: string, llmName: string) => void;
  updateStreamData: (sessionId: string, data: string) => void;
  completeStream: (sessionId: string) => void;
  getStream: (sessionId: string) => {
    data: string[];
    isStreaming: boolean;
    llmName: string;
  } | null;
}

export const useStreamingStore = create<StreamingState>((set, get) => ({
  streams: {},
  addStream: (sessionId, llmName) =>
    set((state) => ({
      streams: {
        ...state.streams,
        [sessionId]: { data: [], isStreaming: true, llmName },
      },
    })),
  updateStreamData: (sessionId, data) =>
    set((state) => {
      const stream = state.streams[sessionId];
      if (stream) {
        return {
          streams: {
            ...state.streams,
            [sessionId]: {
              ...stream,
              data: [...stream.data, data],
            },
          },
        };
      }
      return state;
    }),
  completeStream: (sessionId) =>
    set((state) => {
      const stream = state.streams[sessionId];
      if (stream) {
        return {
          streams: {
            ...state.streams,
            [sessionId]: { ...stream, isStreaming: false },
          },
        };
      }
      return state;
    }),
  getStream: (sessionId) => get().streams[sessionId] || null,
}));
