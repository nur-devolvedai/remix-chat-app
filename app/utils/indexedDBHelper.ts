import { openDB } from "idb";
import type { Chat } from "~/types/chat";

const DB_NAME = "ChatDB";
const STORE_NAME = "chats";

export async function getChatHistory(): Promise<Chat[]> {
  const db = await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    },
  });

  return db.getAll(STORE_NAME) as Promise<Chat[]>;
}

export async function saveChat(chat: Chat): Promise<void> {
  const db = await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    },
  });

  await db.put(STORE_NAME, chat);
}
