// app/types/chat.ts
export interface Chat {
    id: string;
    title: string;
  }
  
  export interface LoaderData {
    chatHistory: Chat[];
    error?: string;
  }
  