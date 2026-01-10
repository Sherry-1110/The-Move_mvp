import { useState } from 'react';
import { Send } from 'lucide-react';
import type { Comment } from '../types';

interface CommentSectionProps {
  comments: Comment[];
  onAddComment: (comment: string) => void;
}

const CommentSection = ({ comments, onAddComment }: CommentSectionProps) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment.trim());
      setNewComment('');
    }
  };

  return (
    <div className="border-t border-gray-200 pt-3">
      <div className="space-y-3 mb-3 max-h-48 overflow-y-auto">
        {comments.map((comment, index) => (
          <div key={index} className="flex gap-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs font-medium text-gray-600 flex-shrink-0">
              {comment.user.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <div className="bg-gray-100 rounded-lg px-3 py-2">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm text-gray-900">{comment.user}</span>
                </div>
                <p className="text-sm text-gray-700">{comment.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4E2A84] focus:border-transparent"
        />
        <button
          type="submit"
          disabled={!newComment.trim()}
          className="bg-[#4E2A84] text-white p-2 rounded-lg hover:bg-[#3d1f6b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
};

export default CommentSection;