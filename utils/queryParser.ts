// A set of common words to ignore when extracting keywords from a query.
const STOP_WORDS = new Set([
    'a', 'an', 'the', 'in', 'on', 'for', 'at', 'is', 'are', 'of', 'with', 
    'this', 'next', 'week', 'month', 'day', 'today', 'tomorrow', 'events', 
    'event', 'conference', 'conferences', 'workshop', 'workshops', 'talk', 
    'talks', 'mixer', 'meetup', 'summit', 'summits', 'chat', 'chats', 'find', 'me', 'any'
]);

/**
 * Extracts meaningful keywords from a natural language query.
 * @param query The user's search query.
 * @returns An array of lowercase keywords.
 */
export function parseKeywords(query: string): string[] {
  return query
    .toLowerCase()
    .split(/[^a-zA-Z0-9]+/) // Split on non-alphanumeric characters
    .filter(word => word && word.length > 1 && !STOP_WORDS.has(word));
}

/**
 * Parses a natural language query to find a date range.
 * @param query The user's search query.
 * @returns An object with `start` and `end` Date objects, or nulls if no range is found.
 */
export function parseDateQuery(query: string): { start: Date | null, end: Date | null } {
    const lowerQuery = query.toLowerCase();
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Start of today for consistent comparisons

    if (lowerQuery.includes('today')) {
        const end = new Date(now);
        end.setHours(23, 59, 59, 999); // End of today
        return { start: now, end: end };
    }

    if (lowerQuery.includes('tomorrow')) {
        const start = new Date(now);
        start.setDate(now.getDate() + 1);
        const end = new Date(start);
        end.setHours(23, 59, 59, 999);
        return { start, end };
    }

    if (lowerQuery.includes('this week')) {
        const dayOfWeek = now.getDay(); // 0 (Sun) - 6 (Sat)
        const start = new Date(now);
        start.setDate(now.getDate() - dayOfWeek + (dayOfWeek === 0 ? 0 : 1)); // Start of week (Monday, or Sunday if today is Sunday)
        const end = new Date(start);
        end.setDate(start.getDate() + 6);
        end.setHours(23, 59, 59, 999); // End of the week (Sunday)
        return { start, end };
    }

    if (lowerQuery.includes('next week')) {
        const dayOfWeek = now.getDay();
        const start = new Date(now);
        start.setDate(now.getDate() - dayOfWeek + 8); // Start of next week (Monday)
        const end = new Date(start);
        end.setDate(start.getDate() + 6);
        end.setHours(23, 59, 59, 999);
        return { start, end };
    }
    
    if (lowerQuery.includes('this month')) {
        const start = new Date(now.getFullYear(), now.getMonth(), 1);
        const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        end.setHours(23, 59, 59, 999);
        return { start, end };
    }

    return { start: null, end: null };
}
