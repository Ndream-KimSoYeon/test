import create from 'zustand';

interface SnackBarState {
  isSnackBarOpen: boolean;
  message?: string;
  vertical: 'top' | 'bottom';
  setSnackBarVertical: (vertical: 'top' | 'bottom') => void;
  setSnackBarMessage: (message: string) => void;
  setIsSnackBarOpen: (by: boolean) => void;
}

const useSnackBarStore = create<SnackBarState>((set) => ({
  isSnackBarOpen: false,
  message: '',
  vertical: 'bottom',
  setIsSnackBarOpen: () =>
    set((state) => ({ isSnackBarOpen: !state.isSnackBarOpen })),
  setSnackBarMessage: (message: string) => set(() => ({ message: message })),
  setSnackBarVertical: () => set(() => ({ vertical: 'top' }))
}));

export default useSnackBarStore;
