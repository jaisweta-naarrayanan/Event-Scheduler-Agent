import React from 'react';
import { EventInfo } from '../types';
import { CalendarIcon, LocationMarkerIcon } from './icons';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  event: EventInfo;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, event }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="bg-white rounded-lg shadow-xl p-8 m-4 max-w-lg w-full"
        onClick={e => e.stopPropagation()} // Prevent clicks inside modal from closing it
      >
        <h2 id="modal-title" className="text-2xl font-bold text-slate-900 mb-4">Add to Calendar?</h2>
        <p className="text-slate-600 mb-6">You are about to be redirected to Google Calendar to create the following event:</p>
        
        <div className="bg-slate-50 p-4 rounded-md border border-slate-200 space-y-3 mb-8">
            <h3 className="font-bold text-lg text-slate-800">{event.name}</h3>
            <div className="flex items-center gap-2 text-slate-700">
                <CalendarIcon className="h-5 w-5 text-slate-500 flex-shrink-0" />
                <span>{event.date} at {event.time}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
                <LocationMarkerIcon className="h-5 w-5 text-slate-500 flex-shrink-0" />
                <span>{event.location}</span>
            </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 text-slate-800 font-semibold rounded-md hover:bg-slate-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
          >
            Proceed to Calendar
          </button>
        </div>
      </div>
    </div>
  );
};
