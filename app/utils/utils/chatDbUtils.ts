import Dexie from "dexie";
import { v4 as uuidv4 } from "uuid";
import { savePromptAnswer, getUserChatHistoryAndChats } from "@/app/var";
import Cookies from "js-cookie";

// Initialize Dexie database
const db = new Dexie("ChatDatabase");
db.version(2).stores({
  chatHistories: "++id, sessionId",
});
db.version(2).stores({
  sideNav: "++id, sessionId",
});

export interface ChatEntry {
  id: string;
  text: string;
  type: "prompt" | "answer" | "blank"; // New field
}

export interface ChatHistory {
  id?: number;
  sessionId: string;
  chatEntries: ChatEntry[];
}

// Function to ensure the Dexie database is created
export const createIndexDb = async (): Promise<void> => {
  try {
    // Check if the database exists
    const dbExists = await Dexie.exists("ChatDatabase");

    if (!dbExists) {
      // Database doesn't exist, initialize it
      console.log("[createIndexDb] Database not found. Creating 'ChatDatabase'...");
      const db = new Dexie("ChatDatabase");
      db.version(2).stores({
        chatHistories: "++id, sessionId",
      });
      db.version(2).stores({
        sideNav: "++id, sessionId",
      });
      await db.open(); // Open the newly created database
      console.log("[createIndexDb] 'ChatDatabase' created successfully.");
    } else {
      console.log("[createIndexDb] 'ChatDatabase' already exists.");
    }
  } catch (error) {
    console.error(
      "[createIndexDb] Error ensuring 'ChatDatabase' exists:",
      (error as Error)?.message ?? String(error)
    );
  }
};

// Function to retrieve sideNav data from IndexedDB
export const loadSideNavData = async (): Promise<
  { sessionId: string; title: string; createdAt: string }[]
> => {
  try {
    // Fetch all entries from the sideNav table
    const sideNavData = await db.table("sideNav").toArray();

    // Map the data to include only the required fields
    const formattedData = sideNavData.map((entry) => ({
      sessionId: entry.sessionId,
      title: entry.title,
      createdAt: entry.createdAt || new Date().toISOString(), // Ensure createdAt is always present
    }));

    console.log("[loadSideNavData] Retrieved sideNav data:", formattedData);
    return formattedData;
  } catch (error) {
    console.error(
      "[loadSideNavData] Error retrieving sideNav data:",
      (error as Error)?.message ?? String(error)
    );
    return [];
  }
};


// Function to load data from API and save to Dexie if database is empty
export const fetchAndSaveChatData = async (): Promise<void> => {
  try {
    const token = Cookies.get("token");
    if (!token) {
      console.error("[fetchAndSaveChatData] Token is missing from cookies.");
      return;
    }

    const response = await fetch(getUserChatHistoryAndChats, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error(`[fetchAndSaveChatData] API response not OK:`, response.status, await response.text());
      return;
    }

    const apiResponse = await response.json();
    if (!apiResponse.success || !apiResponse.data) {
      console.error("[fetchAndSaveChatData] API response indicates failure:", apiResponse.message);
      return;
    }

    const chatData = apiResponse.data;

    for (const item of chatData) {
      // Check if the sessionId already exists in the database
      const existingSession = await db.table("chatHistories").where("sessionId").equals(item.sessionId).first();
      if (!existingSession) {
        // Save to chatHistories
        await db.table("chatHistories").add({
          sessionId: item.sessionId,
          chatEntries: item.chats.map((chat: any) => ({
            id: uuidv4(),
            text: chat.text,
            type: chat.type,
          })),
        });
      }

      // Save to sideNav
      const existingSideNav = await db.table("sideNav").where("sessionId").equals(item.sessionId).first();
      if (!existingSideNav) {
        await db.table("sideNav").add({
          sessionId: item.sessionId,
          title: item.title,
          createdAt: item.createdAt,
        });
      }
    }

    console.log("[fetchAndSaveChatData] Data successfully saved to Dexie.");
  } catch (error) {
    console.error("[fetchAndSaveChatData] Error:", error);
  }
};


// Load chat histories from IndexedDB
export const loadChatHistories = async (
  sessionId: string
): Promise<ChatHistory[]> => {
  console.log("[loadChatHistories] Fetching chat histories from IndexedDB...");

  if (!sessionId) {
    console.error("[loadChatHistories] sessionId is missing.");
    return [];
  }

  try {
    const chatHistories = await db
      .table("chatHistories")
      .where("sessionId")
      .equals(sessionId) // Filter by sessionId
      .toArray();
    console.log("[loadChatHistories] Fetched chat histories:", chatHistories);

    const normalizedHistories = chatHistories.map((history) => ({
      ...history,
      chatEntries: history.chatEntries || [], // Ensure chatEntries is always an array
    }));

    console.log("[loadChatHistories] Normalized chat histories:", normalizedHistories);

    return normalizedHistories;
  } catch (error) {
    console.error(
      "[loadChatHistories] Error loading chat histories:",
      (error as Error).message
    );
    return [];
  }
};

// Save a new chat entry
export const saveChatEntry = async (
  sessionId: string,
  text: string,
  type: "prompt" | "answer" | "blank",
  answerId?: string // Optional ID to track and update the same entry
): Promise<string | void> => {
  console.log(`[saveChatEntry] Attempting to save chat entry. sessionId: ${sessionId}, text: ${text}, type: ${type}`);

  if (!sessionId || typeof sessionId !== "string") {
    console.error("[saveChatEntry] Invalid sessionId provided.");
    return;
  }

  // Generate a unique ID for new entries unless updating an existing one
  const id = answerId || uuidv4();
  console.log(`[saveChatEntry] Using ID: ${id}`);

  try {
    console.log(`[saveChatEntry] Checking for existing history with sessionId: ${sessionId}`);
    const existingHistory = await db
      .table("chatHistories")
      .where({ sessionId })
      .first();

    if (existingHistory) {
      console.log(`[saveChatEntry] Found existing history. Checking for answer entry.`);

      existingHistory.chatEntries = existingHistory.chatEntries || [];

      // If updating an existing answer, find and update it
      if (type === "answer" && answerId) {
        const answerEntry = existingHistory.chatEntries.find((entry: { id: string; }) => entry.id === answerId);
        if (answerEntry) {
          console.log(`[saveChatEntry] Updating existing answer entry with ID: ${answerId}`);
          answerEntry.text = text; // Update the text of the answer entry
        }
      } else {
        // Add a new entry for "prompt" or "blank"
        console.log(`[saveChatEntry] Adding new entry of type: ${type}`);
        existingHistory.chatEntries.push({ id, text, type });
      }

      // Update the chat history
      console.log(`[saveChatEntry] Updated chat entries:`, existingHistory.chatEntries);
      await db.table("chatHistories").update(existingHistory.id!, {
        chatEntries: existingHistory.chatEntries,
      });

      console.log(`[saveChatEntry] Successfully updated existing chat history.`);
    } else {
      // Create a new history if none exists
      console.log(`[saveChatEntry] No existing history found. Creating new chat history.`);
      await db.table("chatHistories").add({
        sessionId,
        chatEntries: [{ id, text, type }],
      });

      console.log(`[saveChatEntry] Successfully added new chat history.`);
    }

    return id; // Return the ID of the saved or updated entry
  } catch (error: unknown) {
    console.error(
      `[saveChatEntry] Error saving chat entry for sessionId "${sessionId}":`,
      (error as Error)?.message ?? String(error)
    );
  }
};


// Function to clear the Dexie database
export const clearDatabase = async (): Promise<void> => {
  try {
    // Clear 'chatHistories' table
    const chatHistoriesTable = db.table("chatHistories");
    if (chatHistoriesTable) {
      await chatHistoriesTable.clear();
      console.log("[clearDatabase] 'chatHistories' table cleared successfully.");
    } else {
      console.error("[clearDatabase] 'chatHistories' table not found in database.");
    }

    // Clear 'sideNav' table
    const sideNavTable = db.table("sideNav");
    if (sideNavTable) {
      await sideNavTable.clear();
      console.log("[clearDatabase] 'sideNav' table cleared successfully.");
    } else {
      console.error("[clearDatabase] 'sideNav' table not found in database.");
    }
  } catch (error) {
    console.error(
      "[clearDatabase] Error clearing database tables:",
      (error as Error)?.message ?? String(error)
    );
  }
};