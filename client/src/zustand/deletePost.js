import { create } from "zustand";
import axios from "axios";

export const deletePostStore = create((set) => ({
  deletePost: async (id) => {
    try {
      await axios.delete(`http://localhost:2000/posts/${id}`);

      set((state) => {
        return state;
      });
    } catch (error) {
      console.log(error, "Post silme başarısız oldu.");
    }
  },
}));
