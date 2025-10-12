
import { GoogleGenAI, Type } from "@google/genai";
import { EventInfo } from '../types';

if (!process.env.API_KEY) {
  // This is a placeholder check. In a real environment, the API key must be set.
  // For this example, we proceed, but a real app would throw an error or handle this state.
  console.warn("API_KEY environment variable not set. The application will not be able to contact the Gemini API.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const eventSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      name: {
        type: Type.STRING,
        description: "The official name of the event.",
      },
      date: {
        type: Type.STRING,
        description: "The date of the event in YYYY-MM-DD format. If a range, use the start date.",
      },
      time: {
        type: Type.STRING,
        description: "The start time of the event, including AM/PM or in 24-hour format (e.g., '7:00 PM' or '19:00').",
      },
      location: {
        type: Type.STRING,
        description: "The physical address or a virtual platform like 'Zoom' or 'Online'.",
      },
      link: {
        type: Type.STRING,
        description: "A URL for registration or more information. If none, return an empty string.",
      },
      description: {
        type: Type.STRING,
        description: "A brief one-sentence summary of the event.",
      },
    },
    required: ["name", "date", "time", "location", "description"],
  },
};

export async function extractEventsFromText(postText: string): Promise<Omit<EventInfo, 'id'>[]> {
  try {
    const prompt = `
      Extract all distinct event details from the following social media post.
      If no event is found, return an empty array.
      Focus on identifying a clear name, date, time, location (physical or virtual), a registration/info link, and a brief description for each event.
      Ensure the date is in YYYY-MM-DD format.

      Post:
      ---
      ${postText}
      ---
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: eventSchema,
      },
    });

    const jsonString = response.text.trim();
    if (!jsonString) {
        return [];
    }
    
    const events = JSON.parse(jsonString);
    
    if (Array.isArray(events)) {
      return events;
    }

    console.warn("Gemini did not return a valid array. Response:", jsonString);
    return [];

  } catch (error) {
    console.error("Error extracting events from text:", error);
    throw new Error("Failed to analyze text with AI. Please check your API key and the console for details.");
  }
}
