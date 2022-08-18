import create from 'zustand';

const useVolumeMessageStore = create((set) => ({
  type: 'error',
  message: null,
  setMessage: (message, type = 'error') => set({ message, type }),
}));

export default useVolumeMessageStore;
