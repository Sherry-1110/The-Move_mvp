import { Heart, MapPin, Clock, Users, Trophy, BookOpen, Users as UsersIcon, UtensilsCrossed, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import type { Move } from '../types';
import CommentSection from './CommentSection';

interface MoveCardProps {
    move: Move;
    onJoin: () => void;
    onSave: () => void;
    onAddComment: (comment: string) => void;
    onTitleClick: () => void;
}

const MoveCard = ({ move, onJoin, onSave, onAddComment, onTitleClick }: MoveCardProps) => {
    const [showComments, setShowComments] = useState(false);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Live Now':
                return 'bg-green-100 text-green-800';
            case 'Upcoming':
                return 'bg-blue-100 text-blue-800';
            case 'Past':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'Sports':
                return <Trophy size={16} className="text-orange-500" />;
            case 'Study':
                return <BookOpen size={16} className="text-blue-500" />;
            case 'Social':
                return <UsersIcon size={16} className="text-purple-500" />;
            case 'Food':
                return <UtensilsCrossed size={16} className="text-red-500" />;
            default:
                return <UsersIcon size={16} className="text-gray-500" />;
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4 overflow-hidden">
            <div className="p-4">
                <div className="flex items-start gap-3 mb-3">
                    {/* Category Icon - Small with Circular Background */}
                    <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        {getCategoryIcon(move.category)}
                    </div>

                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                            <h3
                                className="font-semibold text-lg text-gray-900 cursor-pointer hover:text-[#4E2A84] transition-colors"
                                onClick={onTitleClick}
                            >
                                {move.title}
                            </h3>
                            <div className="flex items-center gap-2">
                                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(move.status)}`}>
                                    {move.status}
                                </span>
                                <button
                                    onClick={onSave}
                                    className={`p-1 rounded-full transition-colors ${move.isSaved ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                                        }`}
                                >
                                    <Heart size={20} fill={move.isSaved ? 'currentColor' : 'none'} />
                                </button>
                            </div>
                        </div>

                        {/* Notes */}
                        {move.notes && (
                            <div className="text-sm text-gray-600 mt-1">
                                {move.notes}
                            </div>
                        )}
                    </div>
                </div>

                {/* Bottom info - NOT indented, aligns with card left edge */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        <span>{move.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{move.timeRange}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Users size={14} />
                        <span>{move.maxParticipants ? `${move.participants}/${move.maxParticipants}` : `${move.participants}/-`}</span>
                    </div>
                </div>

                {/* Join/Unjoin Buttons */}
                {!move.isJoined ? (
                    <button
                        onClick={onJoin}
                        className="w-full bg-[#4E2A84] text-white py-2 rounded-lg font-medium hover:bg-[#3d1f6b] transition-colors"
                    >
                        JOIN
                    </button>
                ) : (
                    <div className="flex gap-3">
                        <button
                            className="flex-1 bg-green-600 text-white py-2 rounded-lg font-medium cursor-default"
                            disabled
                        >
                            JOINED
                        </button>
                        <button
                            onClick={onJoin}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors text-sm"
                        >
                            Unjoin
                        </button>
                    </div>
                )}

                {/* Discussion Toggle Button */}
                <button
                    onClick={() => setShowComments(!showComments)}
                    className="flex items-center gap-2 text-[#4E2A84] font-medium text-sm mt-4 hover:text-[#3d1f6b] transition-colors"
                >
                    <span>Discussion ({move.comments.length})</span>
                    {showComments ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                {/* Comments Section - Toggle visibility */}
                {showComments && (
                    <div className="mt-3">
                        <CommentSection
                            comments={move.comments}
                            onAddComment={onAddComment}
                        />
                    </div>
                )}

                {/* Exact Meeting Spot - Only show when joined */}
                {move.isJoined && (
                    <div className="bg-gray-50 p-3 rounded-lg mt-3">
                        <h4 className="font-medium text-sm text-gray-700 mb-1">Exact Meeting Spot</h4>
                        <p className="text-sm text-gray-600">{move.exactMeetingSpot}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MoveCard;