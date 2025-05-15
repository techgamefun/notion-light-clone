import API from "./axios";

export const createNote = async ({ html, isprivate, user }) => {
  try {
    const token = user.data.token;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const data = {
      note: html,
      userId: user.data.user.id,
      isprivate,
    };
    const response = await API.post("/api/notes", data, config);

    return response;
  } catch (error) {
    console.error("Error creating note:", error);
    throw error;
  }
};

export const getNotes = async (user) => {
  try {
    const id = user.data.user.id;
    const token = user.data.token;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const response = await API.get(`/api/get/${id}`, config);

    return response.data;
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw error;
  }
};

export const updateNote = async ({ html, isPrivate, noteId, user }) => {
  try {
    const token = user.data.token;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const data = {
      note: html,
      userId: user.data.user.id,
      isPrivate,
    };
    const response = await API.put(`/api/notes/${noteId}`, data, config);

    return response;
  } catch (error) {
    console.error("Error updateing note:", error);
    throw error;
  }
};

export const deleteNote = async (id, user) => {
  try {
    const token = user.data.token;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await API.delete(`/api/notes/${id}`, config);

    return response;
  } catch (error) {
    console.error("Error deleting note:", error);
    throw error;
  }
};
