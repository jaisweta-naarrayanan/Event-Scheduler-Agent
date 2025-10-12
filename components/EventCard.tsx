import React, { useState, useCallback } from 'react';
import { EventInfo } from '../types';
import { generateGoogleCalendarLink } from '../utils/calendar';
import { CalendarIcon, ExternalLinkIcon, LocationMarkerIcon, XIcon, ArrowTopRightOnSquareIcon } from './icons';
import { ConfirmationModal } from './ConfirmationModal';

interface EventCardProps {
  event: EventInfo;
  onDismiss: (id: string) => void;
  isSuggested?: boolean;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onDismiss, isSuggested = false }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddToCalendarClick = () => {
        setIsModalOpen(true);
    };

    const handleConfirmAddToCalendar = useCallback(() => {
        const link = generateGoogleCalendarLink(event);
        window.open(link, '_blank', 'noopener,noreferrer');
        setIsModalOpen(false);
    }, [event]);

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className={`bg-white rounded-lg shadow-md border border-slate-200 flex flex-col transition-transform transform hover:-translate-y-1 ${isSuggested ? 'border-blue-300 shadow-blue-100' : ''}`}>
                {event.imageUrl && (
                    <img 
                        src={event.imageUrl} 
                        alt={`Promotional image for ${event.name}`}
                        className="w-full h-40 object-cover rounded-t-lg"
                    />
                )}
                <div className="p-6 flex-grow">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-slate-800 pr-2">{event.name}</h3>
                        <button
                            onClick={() => onDismiss(event.id)}
                            className="text-slate-400 hover:text-slate-600 transition-colors flex-shrink-0"
                            aria-label={isSuggested ? "Ignore suggestion" : "Dismiss event"}
                        >
                            <XIcon className="h-6 w-6" />
                        </button>
                    </div>

                    {isSuggested && (
                         <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mb-3 px-2.5 py-0.5 rounded-full">
                            Suggested
                        </span>
                    )}

                    <p className="text-slate-600 mb-4">{event.description}</p>
                    
                    <div className="space-y-3 text-sm text-slate-700">
                        <div className="flex items-center gap-3">
                            <CalendarIcon className="h-5 w-5 text-slate-500 flex-shrink-0" />
                            <span>{event.date} at {event.time}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <LocationMarkerIcon className="h-5 w-5 text-slate-500 flex-shrink-0" />
                            <span>{event.location}</span>
                        </div>
                        {event.host && (
                            <div className="flex items-center gap-3">
                               <span className="font-semibold text-slate-500 w-5 text-center">By</span>
                                <span>{event.host}</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-b-lg border-t border-slate-200 flex items-center justify-between flex-wrap gap-4">
                    <button
                        onClick={handleAddToCalendarClick}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                    >
                        <CalendarIcon className="h-5 w-5" />
                        Add to Calendar
                    </button>
                    
                    <div className="flex items-center gap-4">
                        {event.link && (
                            <a
                                href={event.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-800 transition-colors"
                            >
                                More Info
                               <ExternalLinkIcon className="h-5 w-5" />
                            </a>
                        )}
                        {event.sourceLink && (
                            <a
                                href={event.sourceLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="View Source Post"
                                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-800 transition-colors"
                            >
                                Source
                               <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                            </a>
                        )}
                    </div>
                </div>
            </div>
            
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmAddToCalendar}
                event={event}
            />
        </>
    );
};
