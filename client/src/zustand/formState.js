import { create } from "zustand";

const initialState = {
  isOpen: false,
};

export const useStore = create((set, get) => ({
  ...initialState,
  openForm: () => {
    set({ ...initialState, isOpen: true });
  },
  closeForm: () => {
    set({ ...initialState, isOpen: false });
  },
}));
