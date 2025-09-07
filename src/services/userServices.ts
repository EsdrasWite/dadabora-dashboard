import axios from "axios";

const api = axios.create({
  baseURL: "https://chatbot-6ld7.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional centralized error handler
const handleApiError = (error:any) => {
  if (error.response) {
    // Server responded with a status outside 2xx
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

// GET /api/users
export const getAllUsers = async () => {
  try {
    const response = await axios.get("https://chatbot-6ld7.onrender.com/api/users");
    return response.data;
  } catch (error) {
    console.log(error);
    handleApiError(error);
  }
};

// GETONE /api/users/:id
export const getUserById = async (userId:number) => {
  try {
    const response = await api.get(`/${userId}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
