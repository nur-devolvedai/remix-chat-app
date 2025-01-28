

export interface ParsedSegment {
  type: string;
  content: string;
  language?: string; // Optional, only applicable for code segments
}

interface ParsedCode {
  language: string;
  code: string;
}

interface ParsedText extends ParsedCode {
  originalData: string;
}

export const parseMessage = (data: string): ParsedSegment[] => {
  return [{ type: "raw", content: data }];
};

export const formatText = (input: string): string => {
  let formattedText = input;

  // Add line breaks for headers and lists
  formattedText = formattedText.replace(/### /g, "\n### "); // Ensure line breaks before ### headers
  formattedText = formattedText.replace(/#### /g, "\n#### "); // Ensure line breaks before #### headers
  formattedText = formattedText.replace(/;/g, ";\n"); // Ensure line breaks before #### headers
  formattedText = formattedText.replace(/}/g, "\n}"); // Ensure line breaks before #### headers

  formattedText = formattedText.replace(/- /g, "\n- "); // Ensure line breaks before bullet points
  formattedText = formattedText.replace(/(\d+\.)/g, "\n$1"); // Ensure line breaks before numbered lists

  // Ensure code blocks have proper new lines
  formattedText = formattedText.replace(/```(\w+)/g, "\n```$1\n").replace(/```\n/g, "\n```\n");

  return formattedText.trim();
};







/**
 * Parses a string to extract the first code block and its language.
 * @param data - The input string containing a code block.
 * @returns An object with language and code if found, otherwise null.
 */
export const parseCode = (data: string): ParsedCode | null => {
  // console.log("[parseCode] Parsing for code block:", data);
  const regex = /```(\w+)\s([\s\S]*?)```/;
  const match = data.match(regex);

  if (match) {
    const codeSegment = {
      language: match[1],
      code: match[2],
    };
    // console.log("[parseCode] Code block found:", codeSegment);
    return codeSegment;
  } else {
    // console.log("[parseCode] No code block found.");
    return null;
  }
};

/**
 * Parses a string to extract the first code block and the remaining text.
 * @param data - The input string containing a code block.
 * @returns An object with language, code, and originalData if found, otherwise null.
 */
export const parseText = (data: string): ParsedText | null => {
  // console.log("[parseText] Parsing for code block and remaining text:", data);
  const regex = /```(\w+)\s([\s\S]*?)```/;
  const match = data.match(regex);

  if (match) {
    const textSegment = {
      language: match[1],
      code: match[2],
      originalData: data.replace(match[0], "").trim(),
    };
    // console.log("[parseText] Parsed text segment:", textSegment);
    return textSegment;
  } else {
    // console.log("[parseText] No code block found.");
    return null;
  }
};
