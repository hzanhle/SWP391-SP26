import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import type { CollectorTaskStatus } from '../types/collector';
import type { CitizenReport, PlatformState, RewardTransaction } from './platformTypes';
import { PlatformContext, type PlatformActions } from './platformStoreContext';

const STORAGE_KEY = 'swp391.platformState.v1';

const nowIso = () => new Date().toISOString();
const id = (prefix: string) => `${prefix}-${Math.random().toString(16).slice(2, 10)}`;

const defaultState: PlatformState = {
  citizens: {
    user1: { id: 'user1', name: 'John Doe', email: 'john.doe@example.com', points: 450 },
  },
  collectors: [
    { id: 'collector1', name: 'Team Alpha', availability: 'Available' },
    { id: 'collector2', name: 'Team Bravo', availability: 'Busy' },
    { id: 'collector3', name: 'Team Green', availability: 'Available' },
  ],
  reports: [
    {
      id: 'AR-1023',
      title: 'Illegal dumping on Main Street',
      description: 'Large pile of construction waste.',
      category: 'construction',
      location: { address: '123 Main St', lat: 10.8231, lng: 106.6297 },
      images: [],
      createdAt: nowIso(),
      updatedAt: nowIso(),
      citizenId: 'user1',
      status: 'pending',
    },
    {
      id: 'AR-1021',
      title: 'Plastic bottles in park',
      description: 'Multiple bottles scattered near the lake.',
      category: 'plastic',
      location: { address: 'Central Park', lat: 10.8298, lng: 106.6356 },
      images: [],
      createdAt: nowIso(),
      updatedAt: nowIso(),
      citizenId: 'user1',
      status: 'accepted',
      enterpriseDecisionAt: nowIso(),
    },
  ],
  rewardRules: {
    basePoints: 10,
    categoryMultiplier: {
      organic: 1.0,
      plastic: 1.1,
      construction: 1.2,
      furniture: 1.1,
      hazardous: 1.5,
      other: 1.0,
    },
    matchingBonus: 5,
  },
  rewardTransactions: [],
};

const loadState = (): PlatformState => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    return JSON.parse(raw) as PlatformState;
  } catch {
    return defaultState;
  }
};

const saveState = (state: PlatformState) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

type CreateReportInput = Omit<CitizenReport, 'id' | 'createdAt' | 'updatedAt' | 'status'>;

export const PlatformProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<PlatformState>(() => loadState());

  useEffect(() => {
    saveState(state);
  }, [state]);

  const resetMock = useCallback(() => setState(defaultState), []);

  const createReport: PlatformActions['createReport'] = useCallback((input: CreateReportInput) => {
    setState((prev) => {
      const report: CitizenReport = {
        ...input,
        id: id('AR'),
        createdAt: nowIso(),
        updatedAt: nowIso(),
        status: 'pending',
      };
      return { ...prev, reports: [report, ...prev.reports] };
    });
  }, []);

  const acceptReport = useCallback((reportId: string) => {
    setState((prev) => ({
      ...prev,
      reports: prev.reports.map((r) =>
        r.id === reportId
          ? { ...r, status: 'accepted', enterpriseDecisionAt: nowIso(), updatedAt: nowIso() }
          : r,
      ),
    }));
  }, []);

  const rejectReport = useCallback((reportId: string, note?: string) => {
    setState((prev) => ({
      ...prev,
      reports: prev.reports.map((r) =>
        r.id === reportId
          ? {
              ...r,
              status: 'rejected',
              enterpriseDecisionAt: nowIso(),
              enterpriseNotes: note,
              updatedAt: nowIso(),
            }
          : r,
      ),
    }));
  }, []);

  const assignCollector = useCallback((reportId: string, collectorId: string) => {
    setState((prev) => ({
      ...prev,
      reports: prev.reports.map((r) =>
        r.id === reportId
          ? {
              ...r,
              status: 'assigned',
              assignedCollectorId: collectorId,
              assignedAt: nowIso(),
              collectorStatus: 'assigned',
              updatedAt: nowIso(),
            }
          : r,
      ),
    }));
  }, []);

  const setCollectorStatus = useCallback((reportId: string, status: CollectorTaskStatus) => {
    setState((prev) => ({
      ...prev,
      reports: prev.reports.map((r) =>
        r.id === reportId
          ? { ...r, collectorStatus: status, updatedAt: nowIso() }
          : r,
      ),
    }));
  }, []);

  const submitProof: PlatformActions['submitProof'] = useCallback(
    ({ reportId, collectorConfirmedCategory, proofNote, proofImages }) => {
      setState((prev) => {
        const report = prev.reports.find((r) => r.id === reportId);
        if (!report) return prev;

        const rules = prev.rewardRules;
        const multiplier = rules.categoryMultiplier[report.category] ?? 1;
        const matched = collectorConfirmedCategory === report.category;

        const points =
          Math.round(rules.basePoints * multiplier) + (matched ? rules.matchingBonus : 0);

        const tx: RewardTransaction = {
          id: id('TX'),
          citizenId: report.citizenId,
          reportId: report.id,
          points,
          reason: matched
            ? 'Collected and classification matched'
            : 'Collected (classification mismatch)',
          createdAt: nowIso(),
        };

        return {
          ...prev,
          citizens: {
            ...prev.citizens,
            [report.citizenId]: {
              ...prev.citizens[report.citizenId],
              points: prev.citizens[report.citizenId].points + points,
            },
          },
          rewardTransactions: [tx, ...prev.rewardTransactions],
          reports: prev.reports.map((r) =>
            r.id === reportId
              ? {
                  ...r,
                  status: 'collected',
                  collectorStatus: 'collected',
                  collectorConfirmedCategory,
                  proofNote,
                  proofImages: proofImages ?? [],
                  collectedAt: nowIso(),
                  updatedAt: nowIso(),
                }
              : r,
          ),
        };
      });
    },
    [],
  );

  const actions: PlatformActions = useMemo(
    () => ({
      resetMock,
      createReport,
      acceptReport,
      rejectReport,
      assignCollector,
      setCollectorStatus,
      submitProof,
    }),
    [acceptReport, assignCollector, createReport, rejectReport, resetMock, setCollectorStatus, submitProof],
  );

  return <PlatformContext.Provider value={{ state, actions }}>{children}</PlatformContext.Provider>;
};

