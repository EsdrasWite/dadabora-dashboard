import axios from "axios";


  const URL = "https://chatbot-6ld7.onrender.com/api";

const api = axios.create({
  baseURL: "https://chatbot-6ld7.onrender.com/api/contexts",
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional centralized error handler
const handleApiError = (error:any) => {
  if (error.response) {
    // Server responded with a status outside 2xx
    console.log(error.response);
    console.error("API Error:", error.response.data.message || error.message);
    throw new Error(error.response.data.message || "Something went wrong");
  } else if (error.request) {
    // Request was made but no response received
    console.error("No response from server");
    throw new Error("No response from server");
  } else {
    // Something happened in setting up the request
    console.error("Request error:", error.message);
    throw new Error(error.message);
  }
};

type contexteType={
  id?: number;
  title: string;
  description: string;
  created_at?: string;
  updated_at?: string;
}

// GET /api/context/:id
export const getContexteById = async (contexteId:number) => {
  try {
    const response = await api.get(`/${contexteId}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// PUT /api/contexte/:id
export const updateContexte = async (contexteId:number, data:contexteType) => {
  try {
    const response = await api.put(`/${contexteId}`, data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// GET /api/contexte
export const getAllContexts = async () => {
  try {
    const response = await api.get(URL + "/contexts");
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// DELETE /api/contextes/:id
export const deleteContext = async (contexteId:number) => {
  try {
    const response = await api.delete(`/${contexteId}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// POST /api/contextes
export const createContext = async (contexteData:contexteType) => {
  try {
    const response = await api.post("/", contexteData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
