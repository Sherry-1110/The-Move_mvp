import { ChevronDown, X, Clock, CheckCircle, Calendar, Trophy, BookOpen, Users, Utensils } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import type { FilterOption, SelectedFilters } from '../types';

interface FilterDropdownProps {
    value: SelectedFilters;
    onChange: (value: SelectedFilters) => void;
}

const FilterDropdown = ({ value, onChange }: FilterDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const options = [
        { value: 'live-now' as FilterOption, label: 'Live Now', group: 'Status', icon: Clock },
        { value: 'upcoming' as FilterOption, label: 'Upcoming', group: 'Status', icon: Calendar },
        { value: 'past' as FilterOption, label: 'Past', group: 'Status', icon: CheckCircle },
        { value: 'sports' as FilterOption, label: 'Sports', group: 'Category', icon: Trophy },
        { value: 'study' as FilterOption, label: 'Study', group: 'Category', icon: BookOpen },
        { value: 'social' as FilterOption, label: 'Social', group: 'Category', icon: Users },
        { value: 'food' as FilterOption, label: 'Food', group: 'Category', icon: Utensils },
    ];

    const getDisplayLabel = () => {
        if (value.length === 0 || value.includes('all')) return 'Filter by...';
        const selectedLabels = options
            .filter(option => value.includes(option.value))
            .map(option => option.label);
        return selectedLabels.length > 2 ? `${selectedLabels.length} selected` : selectedLabels.join(', ');
    };

    const handleOptionToggle = (optionValue: FilterOption) => {
        let newValue: SelectedFilters;
        if (optionValue === 'all') {
            newValue = ['all'];
        } else {
            if (value.includes(optionValue)) {
                newValue = value.filter(v => v !== optionValue && v !== 'all');
            } else {
                newValue = [...value.filter(v => v !== 'all'), optionValue];
            }
        }
        onChange(newValue);
    };

    const clearFilters = () => {
        onChange(['all']);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-gray-100 border-0 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-[#4E2A84] focus:bg-white transition-colors text-left flex items-center justify-between"
            >
                <span className={value.length === 0 || value.includes('all') ? 'text-gray-500' : 'text-gray-900'}>
                    {getDisplayLabel()}
                </span>
                <ChevronDown className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} size={16} />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto">
                    <div className="p-2">
                        {/* All option */}
                        <label className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                            <input
                                type="checkbox"
                                checked={value.includes('all')}
                                onChange={() => handleOptionToggle('all')}
                                className="rounded border-gray-300 text-[#4E2A84] focus:ring-[#4E2A84]"
                            />
                            <Users size={16} className="text-gray-500" />
                            <span className="text-sm text-black">All</span>
                        </label>

                        {/* Status options */}
                        <div className="mt-2 mb-1">
                            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide px-2">Status</div>
                            {options.filter(opt => opt.group === 'Status').map(option => {
                                const IconComponent = option.icon;
                                return (
                                    <label key={option.value} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={value.includes(option.value)}
                                            onChange={() => handleOptionToggle(option.value)}
                                            className="rounded border-gray-300 text-[#4E2A84] focus:ring-[#4E2A84]"
                                        />
                                        <IconComponent size={16} className="text-gray-500" />
                                        <span className="text-sm text-black">{option.label}</span>
                                    </label>
                                );
                            })}
                        </div>

                        {/* Category options */}
                        <div className="mt-2 mb-1">
                            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide px-2">Category</div>
                            {options.filter(opt => opt.group === 'Category').map(option => {
                                const IconComponent = option.icon;
                                return (
                                    <label key={option.value} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={value.includes(option.value)}
                                            onChange={() => handleOptionToggle(option.value)}
                                            className="rounded border-gray-300 text-[#4E2A84] focus:ring-[#4E2A84]"
                                        />
                                        <IconComponent size={16} className="text-gray-500" />
                                        <span className="text-sm text-black">{option.label}</span>
                                    </label>
                                );
                            })}
                        </div>

                        {/* Clear button */}
                        {value.length > 0 && !value.includes('all') && (
                            <button
                                onClick={clearFilters}
                                className="w-full mt-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded flex items-center justify-center gap-1"
                            >
                                <X size={14} />
                                Clear filters
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterDropdown;