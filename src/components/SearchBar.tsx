import { Search } from 'lucide-react';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
    return (
        <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
                type="text"
                placeholder="Search moves..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-full border-0 focus:ring-2 focus:ring-[#4E2A84] focus:bg-white transition-colors"
            />
        </div>
    );
};

export default SearchBar;