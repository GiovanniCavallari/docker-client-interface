import create from 'zustand';

const useVolumeMessageStore = create((set) => ({
  type: 'error',
  message: null,
  setMessage: (message, type = 'error') => set({ message, type }),
  clearMessage: () => set({ message: null }),
}));

export default useVolumeMessageStore;
