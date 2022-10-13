import create from 'zustand';

interface WebViewAccessState {
  isWebViewAccess: boolean;
  setIsWebViewAccess: (isWebViewAccess: boolean) => void;
}

export const useWebViewAccess = create<WebViewAccessState>((set) => ({
  isWebViewAccess: false,
  setIsWebViewAccess: (isWebViewAccess) => set({ isWebViewAccess })
}));
