
import { EventInfo } from '../types';

// Helper to format date into YYYYMMDDTHHMMSSZ format for Google Calendar URL
function toGoogleCalendarISO(date: Date): string {
    return date.toISOString().replace(/[-:.]/g, '').slice(0, -4) + 'Z';
}

export function generateGoogleCalendarLink(event: EventInfo): string {
    const { name, date, time, location, description, link } = event;

    let startTime: Date;
    try {
        // Attempt to combine date and time. `new Date('2024-10-25 7:00 PM')` works in most modern JS engines.
        const combinedDateTimeString = `${date} ${time}`;
        startTime = new Date(combinedDateTimeString);

        if (isNaN(startTime.getTime())) {
            // Fallback for just date if time parsing fails, assuming noon in the local timezone.
            const dateOnly = new Date(date);
            dateOnly.setHours(12, 0, 0, 0);
            startTime = dateOnly;
        }
    } catch (e) {
        // Fallback on any error, assuming noon.
        const dateOnly = new Date(date);
        dateOnly.setHours(12, 0, 0, 0);
        startTime = dateOnly;
    }

    // Assume event is 2 hours long.
    const endTime = new Date(startTime.getTime() + 2 * 60 * 60 * 1000);

    const dates = `${toGoogleCalendarISO(startTime)}/${toGoogleCalendarISO(endTime)}`;

    const details = `${description}\n\nMore Info: ${link || 'N/A'}`;

    const params = new URLSearchParams({
        action: 'TEMPLATE',
        text: name,
        dates: dates,
        details: details,
        location: location,
    });

    return `https://www.google.com/calendar/render?${params.toString()}`;
}
