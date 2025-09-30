import axios from "axios";

const URL = "https://chatbot-6ld7.onrender.com/api";
const api = axios.create({
  baseURL: "https://chatbot-6ld7.onrender.com/api/messages",
  headers: {
    "Content-Type": "application/json",
  },
});

const api2 = axios.create({
  baseURL: "https://chatbot-6ld7.onrender.com/api/users",
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional centralized error handler
const handleApiError = (error: any) => {
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

// GET /api/:id/messages
export const getMessagesByUserId = async (userId:number) => {
  try {
    const response = await api2.get(`/${userId}/messages`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// GET /api/messages
export const getAllMessages = async () => {
  try {
    const response = await api.get(URL + "/messages");
    console.log("--------")
    console.log(response.data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
