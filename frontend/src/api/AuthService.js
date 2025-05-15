import API from "./axios";

export const SendLoginData = async (data) => {
  try {
    const response = await API.post("/auth/login", data);
    if (response.data.token) {
      return response;
    }
  } catch (error) {
    console.error("Error during login:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};

export const register = async (data) => {
  try {
    const response = await API.post("/auth/register", data);
    if (response.data.token) return response;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error; // Rethrow the error to handle it in the calling function
  } finally {
    console.log("Registration attempt finished.");
  }
};
