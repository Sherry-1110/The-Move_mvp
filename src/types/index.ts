export interface Comment {
    user: string;
    text: string;
}

export interface Move {
    id: string;
    title: string;
    category: 'Sports' | 'Study' | 'Social' | 'Food';
    timeRange: string;
    status: 'Live Now' | 'Upcoming' | 'Past';
    participants: number;
    maxParticipants?: number; // Optional: undefined means unlimited
    notes?: string; // Optional notes field
    isJoined: boolean;
    isSaved: boolean;
    isHost: boolean; // Whether the current user is hosting this event
    location: string;
    exactMeetingSpot: string;
    comments: Comment[];
}

export type SortOption = 'newest' | 'popular';
export type FilterOption = 'all' | 'live-now' | 'upcoming' | 'past' | 'sports' | 'study' | 'social' | 'food';
export type SelectedFilters = FilterOption[];