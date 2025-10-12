import React from 'react';
import { SparklesIcon } from './icons';

interface InputSectionProps {
    interests: string;
    setInterests: (text: string) => void;
    onFilter: () => void;
    filterDate: string;
    setFilterDate: (date: string) => void;
    sortOption: string;
    setSortOption: (option: string) => void;
}

export const InputSection: React.FC<InputSectionProps> = ({
    interests,
    setInterests,
    onFilter,
    filterDate,
    setFilterDate,
    sortOption,
    setSortOption
}) => {
    return (
        <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200 mb-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Find Your Events</h2>
            <p className="text-slate-500 mb-6">
                Use natural language to find events, then use the filters and sorters to refine your suggestions.
            </p>
            
            <div className="space-y-6">
                <div>
                    <label htmlFor="interests" className="block text-sm font-medium text-slate-700 mb-1">
                        What are you looking for?
                    </label>
                    <input
                        type="text"
                        id="interests"
                        className="w-full p-3 bg-slate-100 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition"
                        placeholder="e.g., AI workshops next week"
                        value={interests}
                        onChange={(e) => setInterests(e.target.value)}
                    />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                        <label htmlFor="filterDate" className="block text-sm font-medium text-slate-700 mb-1">
                            Filter suggested events on or after
                        </label>
                        <input
                            type="date"
                            id="filterDate"
                            value={filterDate}
                            onChange={(e) => setFilterDate(e.target.value)}
                            className="w-full p-3 bg-slate-100 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                    </div>
                     <div>
                        <label htmlFor="sortOption" className="block text-sm font-medium text-slate-700 mb-1">
                            Sort suggested events by
                        </label>
                        <select
                            id="sortOption"
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                            className="w-full p-3 bg-slate-100 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition"
                        >
                            <option value="date-asc">Date (Oldest First)</option>
                            <option value="date-desc">Date (Newest First)</option>
                            <option value="name-asc">Name (A-Z)</option>
                            <option value="name-desc">Name (Z-A)</option>
                            <option value="host-asc">Host (A-Z)</option>
                            <option value="host-desc">Host (Z-A)</option>
                        </select>
                    </div>
                </div>

                <button
                    onClick={onFilter}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    <SparklesIcon className="h-5 w-5" />
                    Find Suggested Events
                </button>
            </div>
        </div>
    );
};