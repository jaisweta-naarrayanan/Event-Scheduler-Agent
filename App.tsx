import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { EventInfo } from './types';
import { mockEvents } from './data/mockEvents';
import { InputSection } from './components/InputSection';
import { ResultsSection } from './components/ResultsSection';
import { AllEventsSection } from './components/AllEventsSection';
import { parseDateQuery, parseKeywords } from './utils/queryParser';


const App: React.FC = () => {
    // User preferences are loaded from localStorage or default.
    const [interests, setInterests] = useState<string>(
        () => localStorage.getItem('userInterests') || 'AI, Machine Learning, Tech Talk'
    );
    const [allEvents, setAllEvents] = useState<EventInfo[]>([]);
    const [suggestedEvents, setSuggestedEvents] = useState<EventInfo[]>([]);
    const [filterApplied, setFilterApplied] = useState<boolean>(false);
    const [dismissedEvents, setDismissedEvents] = useState<Set<string>>(new Set());

    // State for filtering and sorting suggested events
    const [filterDate, setFilterDate] = useState<string>('');
    const [sortOption, setSortOption] = useState<string>('date-asc');


    useEffect(() => {
        const eventsWithIds = mockEvents.map(event => ({
            ...event,
            id: crypto.randomUUID(),
        }));
        setAllEvents(eventsWithIds);
    }, []);

    // Persist interests to localStorage whenever they change.
    useEffect(() => {
        try {
            localStorage.setItem('userInterests', interests);
        } catch (error) {
            console.error("Could not save interests to localStorage:", error);
        }
    }, [interests]);

    const handleFilter = useCallback(() => {
        setFilterApplied(true);
        
        const keywords = parseKeywords(interests);
        const dateRange = parseDateQuery(interests);

        let relevantEvents = allEvents;

        // 1. Filter by date range from the natural language query
        if (dateRange.start && dateRange.end) {
            const startTime = dateRange.start.getTime();
            const endTime = dateRange.end.getTime();
            relevantEvents = relevantEvents.filter(event => {
                const eventTime = new Date(event.date).getTime();
                return eventTime >= startTime && eventTime <= endTime;
            });
        }

        // 2. Filter by keywords from the natural language query
        if (keywords.length > 0) {
            relevantEvents = relevantEvents.filter(event => {
                const eventText = `${event.name} ${event.description} ${event.host || ''}`.toLowerCase();
                return keywords.some(keyword => eventText.includes(keyword));
            });
        } else if (!dateRange.start) {
             // If no keywords and no date range from the query, result is empty.
             setSuggestedEvents([]);
             return;
        }

        setSuggestedEvents(relevantEvents);
    }, [interests, allEvents]);

    const handleIgnoreSuggestedEvent = (id: string) => {
        setSuggestedEvents(prevEvents => prevEvents.filter(event => event.id !== id));
    };

    const handleDismissAllEvent = (id: string) => {
        setDismissedEvents(prevDismissed => new Set(prevDismissed).add(id));
        setSuggestedEvents(prevEvents => prevEvents.filter(event => event.id !== id));
    };

    const processedSuggestedEvents = useMemo(() => {
        let events = [...suggestedEvents];

        // Date filtering for suggested events (secondary filter)
        if (filterDate) {
            const filterDateTime = new Date(filterDate).getTime();
            events = events.filter(event => new Date(event.date).getTime() >= filterDateTime);
        }

        // Sorting for suggested events
        events.sort((a, b) => {
            const [sortKey, sortOrder] = sortOption.split('-');
            const order = sortOrder === 'asc' ? 1 : -1;

            switch (sortKey) {
                case 'date':
                    return (new Date(a.date).getTime() - new Date(b.date).getTime()) * order;
                case 'name':
                    return a.name.localeCompare(b.name) * order;
                case 'host':
                    return (a.host || '').localeCompare(b.host || '') * order;
                default:
                    return 0;
            }
        });

        return events;
    }, [suggestedEvents, filterDate, sortOption]);

    const processedAllEvents = useMemo(() => {
        // Only filter out dismissed events for the main list
        return allEvents.filter(event => !dismissedEvents.has(event.id));
    }, [allEvents, dismissedEvents]);
    
    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                        AI Event Finder
                    </h1>
                     <p className="mt-2 text-lg text-slate-600">
                        Find, filter, and sort relevant events from our curated list.
                    </p>
                </div>
            </header>
            <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
               <InputSection
                   interests={interests}
                   setInterests={setInterests}
                   onFilter={handleFilter}
                   filterDate={filterDate}
                   setFilterDate={setFilterDate}
                   sortOption={sortOption}
                   setSortOption={setSortOption}
                />
                <ResultsSection
                    events={processedSuggestedEvents}
                    onIgnore={handleIgnoreSuggestedEvent}
                    filterApplied={filterApplied}
                />
                <AllEventsSection events={processedAllEvents} onDismiss={handleDismissAllEvent} />
            </main>
            <footer className="text-center py-6 text-slate-500 text-sm">
                <p>An event discovery tool. Built for personal productivity.</p>
            </footer>
        </div>
    );
};

export default App;