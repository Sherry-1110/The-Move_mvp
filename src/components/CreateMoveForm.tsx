import { useState } from 'react';
import { X } from 'lucide-react';
import type { Move } from '../types';

interface CreateMoveFormProps {
  onSubmit: (move: Omit<Move, 'id' | 'participants' | 'isJoined' | 'isSaved'>) => void;
  onCancel: () => void;
}

const CreateMoveForm = ({ onSubmit, onCancel }: CreateMoveFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Social' as Move['category'],
    timeRange: '',
    status: 'Upcoming' as Move['status'],
    location: '',
    exactMeetingSpot: '',
    maxParticipants: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.timeRange && formData.location && formData.exactMeetingSpot) {
      const maxParticipants = formData.maxParticipants ? parseInt(formData.maxParticipants) : undefined;
      onSubmit({
        ...formData,
        maxParticipants,
        notes: formData.notes || undefined,
        comments: [],
      });
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Create a Move</h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4E2A84] focus:border-transparent"
              placeholder="e.g., Lakefill Frisbee"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4E2A84] focus:border-transparent"
            >
              <option value="Sports">Sports</option>
              <option value="Study">Study</option>
              <option value="Social">Social</option>
              <option value="Food">Food</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time Range *
            </label>
            <input
              type="text"
              value={formData.timeRange}
              onChange={(e) => handleChange('timeRange', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4E2A84] focus:border-transparent"
              placeholder="e.g., 18:00 - 20:00"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => handleChange('status', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4E2A84] focus:border-transparent"
            >
              <option value="Live Now">Live Now</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Past">Past</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location *
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4E2A84] focus:border-transparent"
              placeholder="e.g., Lakefill"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Exact Meeting Spot *
            </label>
            <input
              type="text"
              value={formData.exactMeetingSpot}
              onChange={(e) => handleChange('exactMeetingSpot', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4E2A84] focus:border-transparent"
              placeholder="e.g., Near the sailing center rocks"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Max Participants
            </label>
            <input
              type="number"
              value={formData.maxParticipants}
              onChange={(e) => handleChange('maxParticipants', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4E2A84] focus:border-transparent"
              placeholder="Leave empty for unlimited"
              min="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <input
              type="text"
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4E2A84] focus:border-transparent"
              placeholder="e.g. Free / Bring rackets"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 px-4 bg-[#4E2A84] text-white rounded-lg hover:bg-[#3d1f6b] transition-colors"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMoveForm;