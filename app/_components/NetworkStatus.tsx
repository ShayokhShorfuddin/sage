'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';

export default function NetworkStatus() {
  useEffect(() => {
    const onlineSonner = () =>
      toast.success('Back online', { id: 'network-status', duration: 4000 });

    const offlineSonner = () =>
      toast.warning("You're offline", {
        id: 'network-status',
        duration: Infinity,
      });

    window.addEventListener('online', onlineSonner);
    window.addEventListener('offline', offlineSonner);

    return () => {
      window.removeEventListener('online', onlineSonner);
      window.removeEventListener('offline', offlineSonner);
    };
  }, []);

  return null;
}
