import axios from "axios";
import { create } from "zustand";

const initialState = {
  isError: false,
  isLoading: false,
  post: null,
};

export const singlePostStore = create((set) => ({
  ...initialState,

  getSingleData: async (id) => {
    set({ isLoading: true, isError: false });
    try {
      const res = await axios.get(`http://localhost:2000/posts/${id}`);
      const post = res.data;
      set({ post, isLoading: false });
      return post;
    } catch (error) {
      set({
        isError: true,
        isLoading: false,
        error: "Bir hata oluştu lütfen terkrar deneyin!",
      });
    }
  },
}));
