import { ChevronDown } from 'lucide-react';
import type { SortOption } from '../types';

interface SortDropdownProps {
    value: SortOption;
    onChange: (value: SortOption) => void;
}

const SortDropdown = ({ value, onChange }: SortDropdownProps) => {
    const options: { value: SortOption; label: string }[] = [
        { value: 'newest', label: 'Newest' },
        { value: 'popular', label: 'Popular' },
    ];

    return (
        <div className="relative">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value as SortOption)}
                className="w-full appearance-none bg-gray-100 border-0 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-[#4E2A84] focus:bg-white transition-colors"
            >
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        Sort by: {option.label}
                    </option>
                ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
        </div>
    );
};

export default SortDropdown;