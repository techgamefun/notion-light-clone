import { createContext, useState, React, useContext, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const [editorContent, setEditorContent] = useState(() => {
    const storedContent = localStorage.getItem("html");
    return storedContent || "";
  });

  useEffect(() => {
    if (editorContent !== localStorage.getItem("html")) {
      localStorage.setItem("html", editorContent);
    }
  }, [editorContent]);

  const [noteId, setNoteId] = useState(() => {
    const storedNoteId = Number(localStorage.getItem("noteId"));
    if (isNaN(storedNoteId)) {
      return null; // Return null if storedUser is not a number
    }
    return storedNoteId;
  });

  useEffect(() => {
    localStorage.setItem("noteId", noteId);
  }, [noteId]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        editorContent,
        setEditorContent,
        noteId,
        setNoteId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
