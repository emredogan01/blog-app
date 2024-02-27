import { create } from "zustand";
import axios from "axios";

const initialState = {
  isUpdating: false,
};

export const updatePostStore = create((set) => ({
  ...initialState,
  updatePost: async (postId, updatedData) => {
    set({ isUpdating: true });

    try {
      await axios.patch(`http://localhost:2000/posts/${postId}`, updatedData);

      set({ isUpdating: false });
    } catch (error) {
      set({ isUpdating: false });
      console.error("Update error:", error);
    }
  },
}));
