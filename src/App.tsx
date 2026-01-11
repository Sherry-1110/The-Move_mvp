import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import type { Move, SortOption, SelectedFilters } from './types';
import { mockMoves } from './utilities/mockData';
import MoveCard from './components/MoveCard';
import SearchBar from './components/SearchBar';
import SortDropdown from './components/SortDropdown';
import FilterDropdown from './components/FilterDropdown';
import EventDetailModal from './components/EventDetailModal';
import CreateMoveForm from './components/CreateMoveForm';

const App = () => {
    const [moves, setMoves] = useState<Move[]>(mockMoves);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState<SortOption>('newest');
    const [filterOption, setFilterOption] = useState<SelectedFilters>(['all']);
    const [currentTab, setCurrentTab] = useState<'explore' | 'saved' | 'my-moves'>('explore');
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [selectedMove, setSelectedMove] = useState<Move | null>(null);

    const filteredMoves = moves
        .filter(move => {
            // Search filter
            const matchesSearch = move.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                move.location.toLowerCase().includes(searchTerm.toLowerCase());

            // Status and Category filter
            let matchesFilter = true;
            if (filterOption.includes('all') || filterOption.length === 0) {
                matchesFilter = true;
            } else {
                const hasStatusFilter = filterOption.some(f => ['live-now', 'upcoming', 'past'].includes(f));
                const hasCategoryFilter = filterOption.some(f => ['sports', 'study', 'social', 'food'].includes(f));

                const statusMatch = !hasStatusFilter ||
                    (filterOption.includes('live-now') && move.status === 'Live Now') ||
                    (filterOption.includes('upcoming') && move.status === 'Upcoming') ||
                    (filterOption.includes('past') && move.status === 'Past');

                const categoryMatch = !hasCategoryFilter ||
                    (filterOption.includes('sports') && move.category === 'Sports') ||
                    (filterOption.includes('study') && move.category === 'Study') ||
                    (filterOption.includes('social') && move.category === 'Social') ||
                    (filterOption.includes('food') && move.category === 'Food');

                matchesFilter = statusMatch && categoryMatch;
            }

            return matchesSearch && matchesFilter;
        })
        .sort((a, b) => {
            switch (sortOption) {
                case 'newest':
                    // For simplicity, sort by ID (newer IDs first)
                    return b.id.localeCompare(a.id);
                case 'popular':
                    return b.participants - a.participants;
                default:
                    return 0;
            }
        });

    const displayedMoves = (() => {
        switch (currentTab) {
            case 'explore':
                return filteredMoves;
            case 'saved':
                return filteredMoves.filter(move => move.isSaved);
            case 'my-moves':
                return filteredMoves.filter(move => move.isJoined);
            default:
                return filteredMoves;
        }
    })();

    const handleJoinMove = (moveId: string) => {
        setMoves(moves.map(move =>
            move.id === moveId
                ? {
                    ...move,
                    isJoined: !move.isJoined,
                    participants: move.isJoined ? move.participants - 1 : move.participants + 1
                }
                : move
        ));
    };

    const handleSaveMove = (moveId: string) => {
        setMoves(moves.map(move =>
            move.id === moveId ? { ...move, isSaved: !move.isSaved } : move
        ));
    };

    const handleAddComment = (moveId: string, commentText: string) => {
        const newComment = {
            user: 'You',
            text: commentText,
        };
        setMoves(moves.map(move =>
            move.id === moveId ? { ...move, comments: [...move.comments, newComment] } : move
        ));
    };

    const handleCreateMove = (newMove: Omit<Move, 'id' | 'participants' | 'isJoined' | 'isSaved'>) => {
        const move: Move = {
            ...newMove,
            id: `m${Date.now()}`,
            participants: 1,
            isJoined: true,
            isSaved: false,
        };
        setMoves([...moves, move]);
        setShowCreateForm(false);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-md mx-auto bg-white min-h-screen shadow-lg">
                {/* Header */}
                <div className="bg-[#4E2A84] text-white p-4">
                    <h1 className="text-xl font-bold">The Move</h1>
                    <p className="text-sm opacity-90">Find spontaneous hangouts</p>
                </div>

                {/* Top Navigation Tabs */}
                <div className="flex border-b bg-white">
                    <button
                        onClick={() => setCurrentTab('explore')}
                        className={`flex-1 py-3 text-center font-medium ${currentTab === 'explore' ? 'text-[#4E2A84] border-b-2 border-[#4E2A84]' : 'text-gray-500'
                            }`}
                    >
                        Explore
                    </button>
                    <button
                        onClick={() => setCurrentTab('saved')}
                        className={`flex-1 py-3 text-center font-medium ${currentTab === 'saved' ? 'text-[#4E2A84] border-b-2 border-[#4E2A84]' : 'text-gray-500'
                            }`}
                    >
                        Saved
                    </button>
                    <button
                        onClick={() => setCurrentTab('my-moves')}
                        className={`flex-1 py-3 text-center font-medium ${currentTab === 'my-moves' ? 'text-[#4E2A84] border-b-2 border-[#4E2A84]' : 'text-gray-500'
                            }`}
                    >
                        My Moves
                    </button>
                </div>

                {/* Search and Filters - Only show on Explore tab */}
                {currentTab === 'explore' && (
                    <div className="p-4 space-y-3">
                        {/* Control Row with Search Toggle and Filters */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setShowSearch(!showSearch)}
                                className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                            >
                                <Search size={20} className="text-gray-600" />
                            </button>
                            <div className="flex-1">
                                <SortDropdown value={sortOption} onChange={setSortOption} />
                            </div>
                            <div className="flex-1">
                                <FilterDropdown value={filterOption} onChange={setFilterOption} />
                            </div>
                        </div>

                        {/* Search Input - Only show when toggled */}
                        {showSearch && (
                            <SearchBar value={searchTerm} onChange={setSearchTerm} />
                        )}
                    </div>
                )}

                {/* Moves List */}
                <div className="px-4 pb-20">
                    {displayedMoves.map(move => (
                        <MoveCard
                            key={move.id}
                            move={move}
                            onJoin={() => handleJoinMove(move.id)}
                            onSave={() => handleSaveMove(move.id)}
                            onAddComment={(comment) => handleAddComment(move.id, comment)}
                            onTitleClick={() => setSelectedMove(move)}
                        />
                    ))}
                </div>

                {/* Bottom Dock */}
                <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 max-w-md w-full bg-gray-200 h-10 flex items-center justify-center z-50">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setShowCreateForm(true);
                        }}
                        className="bg-[#4E2A84] text-white p-3 rounded-full shadow-lg hover:bg-[#3d1f6b] transition-colors z-50 cursor-pointer"
                    >
                        <Plus size={24} />
                    </button>
                </div>

                {/* Create Move Modal */}
                {showCreateForm && (
                    <CreateMoveForm
                        onSubmit={handleCreateMove}
                        onCancel={() => setShowCreateForm(false)}
                    />
                )}

                {/* Event Detail Modal */}
                {selectedMove && (
                    <EventDetailModal
                        move={selectedMove}
                        onClose={() => setSelectedMove(null)}
                    />
                )}
            </div>
        </div>
    );
};

export default App;