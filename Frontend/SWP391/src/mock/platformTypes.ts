import type { CollectorTaskStatus } from '../types/collector';

// --- Domain types (E2E flow) ---
export type WasteCategory =
  | 'plastic'
  | 'construction'
  | 'furniture'
  | 'hazardous'
  | 'organic'
  | 'other';

export type CitizenReportStatus =
  | 'pending'
  | 'accepted'
  | 'rejected'
  | 'assigned'
  | 'collected';

export interface CitizenReport {
  id: string;
  title: string;
  description: string;
  category: WasteCategory;
  location: { address: string; lat: number; lng: number };
  images: string[];
  createdAt: string;
  updatedAt: string;
  citizenId: string;
  status: CitizenReportStatus;

  enterpriseDecisionAt?: string;
  enterpriseNotes?: string;

  assignedCollectorId?: string;
  assignedAt?: string;

  collectorStatus?: CollectorTaskStatus;
  collectorConfirmedCategory?: WasteCategory;
  proofImages?: string[];
  proofNote?: string;
  collectedAt?: string;
}

export interface Collector {
  id: string;
  name: string;
  availability: 'Available' | 'Busy' | 'Offline';
}

export interface RewardRules {
  basePoints: number;
  categoryMultiplier: Record<WasteCategory, number>;
  matchingBonus: number;
}

export interface RewardTransaction {
  id: string;
  citizenId: string;
  reportId: string;
  points: number;
  reason: string;
  createdAt: string;
}

export interface PlatformState {
  citizens: Record<string, { id: string; name: string; email: string; points: number }>;
  collectors: Collector[];
  reports: CitizenReport[];
  rewardRules: RewardRules;
  rewardTransactions: RewardTransaction[];
}

