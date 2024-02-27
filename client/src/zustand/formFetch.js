import { create } from "zustand";
import axios from "axios";

const initialState = {
  data: null,
  error: null,
  isLoading: true,
};

const useStoreFetch = create((set) => ({
  ...initialState,
  fetchData: async () => {
    set({ error: null });
    try {
      const response = await axios.get("http://localhost:2000/posts");
      const data = response.data;
      set({ data, isLoading: false });
    } catch (error) {
      set({
        error: "Veri çekme işlemi sırasında bir hata oluştu",
        isLoading: false,
      });
    }
  },
}));

export default useStoreFetch;
