import { create } from "zustand";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  data: null,
};

const useStorePost = create((set) => ({
  ...initialState,

  postData: async (postData) => {
    set({ loading: true, error: null });

    try {
      const response = await axios.post(
        "http://localhost:2000/posts",
        postData
      );
      set({ loading: false, data: response.data });
    } catch (error) {
      set({ loading: false, error: error.message || "Bir hata oluştu." });
    }
  },
}));

export default useStorePost;
