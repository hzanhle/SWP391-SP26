// User types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  points: number;
}

// Waste Report types
export interface WasteReport {
  id: string;
  title: string;
  description: string;
  location: {
    address: string;
    lat: number;
    lng: number;
  };
  status: 'pending' | 'in-progress' | 'completed' | 'rejected';
  category: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  reportedBy: string;
}

// Status timeline type
export interface StatusTimelineItem {
  status: WasteReport['status'];
  date: string;
  description: string;
}

// Reward types
export interface Reward {
  id: string;
  title: string;
  description: string;
  pointsRequired: number;
  icon: string;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  userName: string;
  avatar?: string;
  points: number;
}

// Re-export all types for easier importing
export type {
  User,
  WasteReport,
  StatusTimelineItem,
  Reward,
  LeaderboardEntry,
};

