import { X, MapPin, Clock, Users, Trophy, BookOpen, Users as UsersIcon, UtensilsCrossed } from 'lucide-react';
import type { Move } from '../types';

interface EventDetailModalProps {
  move: Move;
  onClose: () => void;
}

const EventDetailModal = ({ move, onClose }: EventDetailModalProps) => {
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
        return <Trophy size={20} className="text-orange-500" />;
      case 'Study':
        return <BookOpen size={20} className="text-blue-500" />;
      case 'Social':
        return <UsersIcon size={20} className="text-purple-500" />;
      case 'Food':
        return <UtensilsCrossed size={20} className="text-red-500" />;
      default:
        return <UsersIcon size={20} className="text-gray-500" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Event Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Title and Status */}
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              {getCategoryIcon(move.category)}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900">{move.title}</h3>
              <span className={`inline-block mt-1 text-sm px-3 py-1 rounded-full ${getStatusColor(move.status)}`}>
                {move.status}
              </span>
            </div>
          </div>

          {/* Category */}
          <div>
            <span className="text-sm font-medium text-gray-500">Category:</span>
            <span className="ml-2 text-sm text-gray-900">{move.category}</span>
          </div>

          {/* Time */}
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-gray-400" />
            <span className="text-sm text-gray-900">{move.timeRange}</span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-gray-400" />
            <span className="text-sm text-gray-900">{move.location}</span>
          </div>

          {/* Participants */}
          <div className="flex items-center gap-2">
            <Users size={16} className="text-gray-400" />
            <span className="text-sm text-gray-900">
              {move.maxParticipants ? `${move.participants}/${move.maxParticipants} participants` : `${move.participants} participants`}
            </span>
          </div>

          {/* Notes */}
          {move.notes && (
            <div>
              <span className="text-sm font-medium text-gray-500">Notes:</span>
              <p className="mt-1 text-sm text-gray-900">{move.notes}</p>
            </div>
          )}

          {/* Exact Meeting Spot - Only show when joined */}
          {move.isJoined && (
            <div>
              <span className="text-sm font-medium text-gray-500">Exact Meeting Spot:</span>
              <p className="mt-1 text-sm text-gray-900">{move.exactMeetingSpot}</p>
            </div>
          )}

          {/* Comments */}
          {move.comments.length > 0 && (
            <div>
              <span className="text-sm font-medium text-gray-500">Comments ({move.comments.length}):</span>
              <div className="mt-2 space-y-2">
                {move.comments.map((comment, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm font-medium text-gray-900">{comment.user}</div>
                    <div className="text-sm text-gray-700">{comment.text}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetailModal;