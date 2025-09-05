import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface BoothNotificationState {
  isBoothNotificationClosed: boolean;
  closeBoothNotification: () => void;
  resetBoothNotification: () => void;
}

export const useBoothNotificationStore = create<BoothNotificationState>()(
  persist(
    (set) => ({
      isBoothNotificationClosed: false,
      closeBoothNotification: () => set({ isBoothNotificationClosed: true }),
      resetBoothNotification: () => set({ isBoothNotificationClosed: false }),
    }),
    {
      name: 'booth-notification-storage',
    },
  ),
);
