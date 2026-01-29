import { useContext } from 'react';
import { PlatformContext } from './platformStoreContext';

export const usePlatform = () => {
  const ctx = useContext(PlatformContext);
  if (!ctx) throw new Error('usePlatform must be used within PlatformProvider');
  return ctx;
};

