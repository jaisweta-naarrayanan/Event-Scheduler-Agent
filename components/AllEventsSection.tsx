import React from 'react';
import { EventInfo } from '../types';
import { EventCard } from './EventCard';

interface AllEventsSectionProps {
  events: EventInfo[];
  onDismiss: (id: string) => void;
}

export const AllEventsSection: React.FC<AllEventsSectionProps> = ({ events, onDismiss }) => {
    return (
        <div className="mt-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">All Available Events</h2>
            {events.length > 0 ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map((event) => (
                        <EventCard key={event.id} event={event} onDismiss={onDismiss} />
                    ))}
                </div>
            ) : (
                <div className="text-center p-8 border-2 border-dashed border-slate-300 rounded-lg">
                    <h3 className="text-lg font-semibold text-slate-700">No events found.</h3>
                    <p className="text-slate-500 mt-2">Try adjusting your date filter or check back later!</p>
                </div>
            )}
        </div>
    );
};
