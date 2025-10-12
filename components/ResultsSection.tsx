import React from 'react';
import { EventInfo } from '../types';
import { EventCard } from './EventCard';

interface ResultsSectionProps {
  events: EventInfo[];
  onIgnore: (id: string) => void;
  filterApplied: boolean;
}

export const ResultsSection: React.FC<ResultsSectionProps> = ({ events, onIgnore, filterApplied }) => {
    
    if (!filterApplied) {
        return null; // Don't show this section until a filter has been applied
    }

    const renderContent = () => {
        if (events.length === 0) {
            return (
                <div className="text-center p-8 border-2 border-dashed border-slate-300 rounded-lg">
                    <h3 className="text-lg font-semibold text-slate-700">No relevant events found.</h3>
                    <p className="text-slate-500 mt-2">Try broadening your interests or clearing the filters.</p>
                </div>
            );
        }

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                    <EventCard key={event.id} event={event} onDismiss={onIgnore} isSuggested={true} />
                ))}
            </div>
        );
    };

    return (
        <div className="mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Suggested Events</h2>
            {renderContent()}
        </div>
    );
};
