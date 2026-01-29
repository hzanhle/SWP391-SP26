import { createContext } from 'react';
import type { PlatformState } from './platformTypes';

export interface PlatformActions {
  resetMock(): void;
  createReport(input: {
    title: string;
    description: string;
    category: import('./platformTypes').WasteCategory;
    location: { address: string; lat: number; lng: number };
    images: string[];
    citizenId: string;
  }): void;
  acceptReport(reportId: string): void;
  rejectReport(reportId: string, note?: string): void;
  assignCollector(reportId: string, collectorId: string): void;
  setCollectorStatus(reportId: string, status: import('../types/collector').CollectorTaskStatus): void;
  submitProof(input: {
    reportId: string;
    collectorConfirmedCategory: import('./platformTypes').WasteCategory;
    proofNote?: string;
    proofImages?: string[];
  }): void;
}

export const PlatformContext = createContext<{ state: PlatformState; actions: PlatformActions } | null>(
  null,
);

