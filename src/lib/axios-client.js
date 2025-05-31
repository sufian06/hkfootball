import axios from "axios";

export const apiClient = {
  createPlayerWithImage: async (formData) => {
    return axios.post("/api/players", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
