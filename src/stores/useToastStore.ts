import { create } from 'zustand';

interface ToastState {
  message: string;
  show: boolean;
  timeoutId?: number;
  showToast: (message: string) => void;
}

export const useToastStore = create<ToastState>((set, get) => ({
  message: '',
  show: false,
  timeoutId: undefined,
  showToast: (message: string) => {
    // If a toast is already showing, clear its hide timeout
    if (get().timeoutId) {
      clearTimeout(get().timeoutId);
    }

    // Set the new message and show the toast
    set({ message, show: true });

    // Set a new timeout to hide the toast
    const newTimeoutId = window.setTimeout(() => {
      set({ show: false, timeoutId: undefined });
    }, 3000); // 3-second duration

    // Store the new timeout ID
    set({ timeoutId: newTimeoutId });
  },
}));
